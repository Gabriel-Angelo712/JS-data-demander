// curl "localhost:3000/products?name=Laptop"
import { createServer } from "node:http";
import { parse } from "node:url";
import { randomUUID } from "node:crypto";

const PORT = 3000;
const HOST = "localhost";

async function handler(request, response) {
  if (request.method === "GET" && request.url.includes("products")) {
    const {
      query: { name },
    } = parse(request.url, true);
    const item = {
      product: name,
      id: randomUUID(),
    };

    return response.end(JSON.stringify(item));

    // console.log(`${name}`);
  }

  response.end("hey!");
}

const server = createServer(handler)
  .listen(PORT, HOST)
  .on("listening", () => {
    console.log(`Products API is runing at ${PORT}`);
  });
