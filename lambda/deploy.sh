#!/bin/bash
# Script de despliegue AWS: DynamoDB + IAM + Lambda + API Gateway
# Ejecutar después de configurar credenciales con: aws configure
# Requiere: AWS CLI v2, permisos IAM suficientes

set -e

REGION="us-east-1"
TABLE_NAME="ai-video-guide-mentoria"
FUNCTION_NAME="ai-video-guide-mentoria-handler"
ROLE_NAME="ai-video-guide-lambda-role"
API_NAME="ai-video-guide-api"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "=== 1. Creando tabla DynamoDB ==="
aws dynamodb create-table \
  --table-name "$TABLE_NAME" \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region "$REGION" 2>/dev/null && echo "Tabla creada" || echo "La tabla ya existe"

echo "=== 2. Creando rol IAM ==="
aws iam create-role \
  --role-name "$ROLE_NAME" \
  --assume-role-policy-document '{
    "Version":"2012-10-17",
    "Statement":[{
      "Effect":"Allow",
      "Principal":{"Service":"lambda.amazonaws.com"},
      "Action":"sts:AssumeRole"
    }]
  }' 2>/dev/null && echo "Rol creado" || echo "El rol ya existe"

aws iam attach-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null || true

aws iam put-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name "DynamoDBPutMentoria" \
  --policy-document "{
    \"Version\":\"2012-10-17\",
    \"Statement\":[{
      \"Effect\":\"Allow\",
      \"Action\":\"dynamodb:PutItem\",
      \"Resource\":\"arn:aws:dynamodb:${REGION}:${ACCOUNT_ID}:table/${TABLE_NAME}\"
    }]
  }"
echo "Políticas IAM configuradas"

echo "=== 3. Empaquetando Lambda ==="
cd "$(dirname "$0")"
npm init -y --quiet 2>/dev/null || true
npm install @aws-sdk/client-dynamodb --quiet 2>/dev/null || true
zip -r function.zip mentoria-handler.mjs node_modules/ --quiet

echo "=== 4. Esperando propagación del rol IAM (10s) ==="
sleep 10

ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

echo "=== 5. Creando función Lambda ==="
aws lambda create-function \
  --function-name "$FUNCTION_NAME" \
  --runtime nodejs20.x \
  --handler mentoria-handler.handler \
  --role "$ROLE_ARN" \
  --zip-file fileb://function.zip \
  --region "$REGION" 2>/dev/null && echo "Lambda creada" || {
    echo "Actualizando Lambda existente..."
    aws lambda update-function-code \
      --function-name "$FUNCTION_NAME" \
      --zip-file fileb://function.zip \
      --region "$REGION"
  }

echo "=== 6. Creando API Gateway HTTP API ==="
API_ID=$(aws apigatewayv2 create-api \
  --name "$API_NAME" \
  --protocol-type HTTP \
  --cors-configuration AllowOrigins='["*"]',AllowMethods='["POST","OPTIONS"]',AllowHeaders='["Content-Type"]' \
  --region "$REGION" \
  --query ApiId --output text 2>/dev/null || \
  aws apigatewayv2 get-apis --region "$REGION" --query "Items[?Name=='$API_NAME'].ApiId" --output text)

LAMBDA_ARN="arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME}"

INTEGRATION_ID=$(aws apigatewayv2 create-integration \
  --api-id "$API_ID" \
  --integration-type AWS_PROXY \
  --integration-uri "$LAMBDA_ARN" \
  --payload-format-version 2.0 \
  --region "$REGION" \
  --query IntegrationId --output text)

aws apigatewayv2 create-route \
  --api-id "$API_ID" \
  --route-key "POST /mentoria" \
  --target "integrations/$INTEGRATION_ID" \
  --region "$REGION" > /dev/null

aws apigatewayv2 create-stage \
  --api-id "$API_ID" \
  --stage-name '$default' \
  --auto-deploy \
  --region "$REGION" > /dev/null 2>&1 || true

aws lambda add-permission \
  --function-name "$FUNCTION_NAME" \
  --statement-id "apigw-invoke" \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:${API_ID}/*/*/mentoria" \
  --region "$REGION" 2>/dev/null || true

API_URL="https://${API_ID}.execute-api.${REGION}.amazonaws.com/mentoria"
echo ""
echo "=== DESPLIEGUE COMPLETO ==="
echo "URL del endpoint: $API_URL"
echo ""
echo "Agrega esta variable de entorno al proyecto React:"
echo "VITE_MENTORIA_API_URL=$API_URL"
echo ""
echo "Puedes probar el endpoint con:"
echo "curl -X POST $API_URL -H 'Content-Type: application/json' -d '{\"nombre\":\"Test\",\"email\":\"test@test.com\"}'"
