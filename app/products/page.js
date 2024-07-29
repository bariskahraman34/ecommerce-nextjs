import Ratings from "@/components/Ratings";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ListProducts(){

  const request = await fetch("https://dummyjson.com/products?limit=100");
  const response = await request.json();
  const products = response.products;

  if(request.ok){
    return (
      <div className="product-page">
        {products.map((product) => (
          <div key={product.id} className="product-col-3">
            <Link href={`products/${product.id}`} className="product">
                <div className="image-container">
                    {product.discountPercentage > 0 && <b className="badge-sale">SALE</b>}
                    <Image src={product.thumbnail} width="300" height="500" alt="" />
                </div>
                <div className="product-info-area">
                    <div className="product-brand-description">
                        <span className="brand">{product.brand}</span>
                        <span className="name">{product.title}</span>
                    </div>
                    <div className="rating-container">
                        <div className="rating-score">{product.rating ? product.rating : "0"}</div>
                        <div className="ratings">
                          <Ratings rating={product.rating} />
                        </div>
                    </div>
                    <div className="price-wrapper">
                        {product.discountPercentage &&
                        <b className="badge-old-price">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</b>
                        }
                        <b className="badge-new-price">${product.price}</b>
                    </div>
                </div>
            </Link>
          </div>
        ))}
      </div>
    )
  }else{
    return notFound
  }

}
