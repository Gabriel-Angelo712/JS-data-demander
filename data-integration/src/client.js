/*
    *data processing*

    1. Read data from database
    2. Go to a second API to get more detailed information
    3. Submit data to othr API
*/

const myDB = async () =>
  Array.from(
    {
      length: 100000,
    },
    (value, index) => `${index}-laptop`,
  );

const PRODUCTS_API = "http://localhost:3000/products";
const CART_API = "http://localhost:4000/cart";

async function proccessDBData() {
  const products = await myDB();
  const responses = [];

  for (const product of products) {
    const productInfo = await (
      await fetch(`${PRODUCTS_API}?name=${product}`)
    ).text();
    const cartInfo = await (
      await fetch(`${CART_API}?name=${product}`, {
        method: "POST",
        body: productInfo,
      })
    ).text();
    responses.push(productInfo);
  }

  return responses;
}

// console.table(await proccessDBData());

async function* proccessDBDataGen() {
  const products = await myDB();

  for (const product of products) {
    const productInfo = await (
      await fetch(`${PRODUCTS_API}?name=${product}`)
    ).text();
    const cartInfo = await (
      await fetch(`${CART_API}?name=${product}`, {
        method: "POST",
        body: productInfo,
      })
    ).text();
    yield cartInfo;
  }
}
for await (const data of proccessDBDataGen()) {
  console.table(data);
  console.count();
}
