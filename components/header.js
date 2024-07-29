import NavList from "./NavList";

export default async function Header(){
  const getData = await fetch("https://dummyjson.com/products?limit=100");
  const response = await getData.json();
  const products = response.products;

  return <NavList products={products} />
}