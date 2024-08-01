import Product from "@/components/Product";
import { notFound } from "next/navigation";

export default async function listProduct ({ params }) {
  const { id } = params;
  const request = await fetch(`https://dummyjson.com/products/${id}`);
  const response = await request.json();
  const product = response;
  
  if(request.ok){
    return(
      <Product product={product} />
    )
  }else{
    notFound()
  }

}