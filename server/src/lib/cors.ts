import corsMiddleware from "cors";

export function cors() {
  return corsMiddleware({
    origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    credentials: true,
  });
}
