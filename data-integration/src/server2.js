// curl "localhost:3000/products?name=Laptop"
import { createServer } from "node:http";
import { once } from "node:events";

const PORT = 4000;
const HOST = "localhost";

async function handler(request, response) {
  if (request.method === "POST" && request.url.includes("cart")) {
    const data = await once(request, "data");
    const item = JSON.parse(data);
    console.log(`received ${item}`);

    return response.end(`Proccess succed for ${item.id}`);
  }
  response.end("hey!");
}

const server = createServer(handler)
  .listen(PORT, HOST)
  .on("listening", () => {
    console.log(`Cart API is runing at ${PORT}`);
  });
