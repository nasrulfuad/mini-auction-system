export function toMoney(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "usd",
  });
}
