import ListProducts from "@/components/ListProducts";


export default async function ProductsPage(){
  const request = await fetch("https://dummyjson.com/products?limit=100");
  const response = await request.json();
  const products = response.products;
  return <ListProducts products={products} />
}
