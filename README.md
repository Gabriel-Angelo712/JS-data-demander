# Data Integration - On-Demand Processing

This project demonstrates a simple on-demand processing flow using two local APIs and a client that reads data from a simulated database, queries a product API, and sends results to a cart API.

## Overview

The main focus is on on-demand processing:

- `server1.js` exposes a product API that returns details based on the product name.
- `server2.js` exposes a cart API that receives product data via `POST` and processes the submission.
- `client.js` simulates reading data from a database, fetches details for each product, and forwards the information to the cart API.

## Project Structure

- `src/server1.js` - Product API at `http://localhost:3000/products`
- `src/server2.js` - Cart API at `http://localhost:4000/cart`
- `src/client.js` - On-demand processing workflow that integrates both services

## How to Run

1. Start the product service:

```bash
npm run start:server1
```

2. Start the cart service:

```bash
npm run start:server2
```

3. In another terminal, run the client to start on-demand processing:

```bash
npm run start:client
```

## Processing Flow

1. The client simulates reading data from the database with `myDB()`.
2. For each item, it queries `server1` at `http://localhost:3000/products?name=<product>`.
3. Then it sends the received data to `server2` at `http://localhost:4000/cart`.
4. The result is processed immediately and the response is returned by the cart endpoint.

## Notes

- The current client makes sequential requests for each product. This is useful for illustrating the logic, but it can be optimized with parallel processing or batching for better scale.
- The project focus is to demonstrate on-demand processing between services, not real data persistence.
- The cart server uses `request.on('data')` via `node:events` to read the payload sent by the client.
