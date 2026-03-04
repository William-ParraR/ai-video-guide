import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
const TABLE_NAME = "ai-video-guide-mentoria";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "JSON inválido" }),
    };
  }

  const { nombre, email } = body;

  if (!nombre || typeof nombre !== "string" || nombre.trim().length < 2) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Nombre inválido (mínimo 2 caracteres)" }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Email inválido" }),
    };
  }

  const id = randomUUID();
  const fecha = new Date().toISOString();

  await client.send(
    new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        id: { S: id },
        nombre: { S: nombre.trim() },
        email: { S: email.toLowerCase().trim() },
        fecha: { S: fecha },
      },
    })
  );

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      message: "Solicitud de mentoría registrada exitosamente",
      id,
    }),
  };
};
