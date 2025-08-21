import Typesense from "typesense";

export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || "abc123.a1.typesense.net",
      port: 443, // Typesense Cloud uses HTTPS
      protocol: "https"
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY || "YOUR_TYPESENSE_KEY",
  connectionTimeoutSeconds: 5,
});
