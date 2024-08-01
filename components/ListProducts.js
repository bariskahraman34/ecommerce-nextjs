"use client"

import Ratings from "@/components/Ratings";
import Image from "next/image";
import Link from "next/link";
import { useState,useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import formFilter from "@/actions/filterProducts";

export default function ListProducts({products}){
  const searchParams = useSearchParams();
  const [selectedCategoryProducts , setSelectedCategoryProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') ? searchParams.get('category') : "");
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ? searchParams.get('search') : "");
  const [minPrice, setMinPrice] = useState(searchParams.get('price_min') ? searchParams.get('price_min') : "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get('price_max') ? searchParams.get('price_max') : "");
  const [isLoaded, setIsLoaded] = useState(false);
  const productsRef = useRef();

  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryCount)

  function categoryRegEx(text) {
    return text.replace(/(?:^|\s)\S+/g, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    }).replace(/[-_](\w)/g, function(match, p1) {
        return " " + p1.toUpperCase();
    });
  }

  useEffect(() => {

    const category = searchParams.get('category');
    const min = searchParams.get('price_min');
    const max = searchParams.get('price_max');
    const search = searchParams.get('search');

    // if(category){
    //   setSelectedCategory(category)
    //   setSelectedCategoryProducts(products.filter(product => product.category === selectedCategory))
    // }else{
    //   setSelectedCategory('');
    //   setSelectedCategoryProducts(products)
    // }

    // if(min){
    //   setMinPrice(min)
    //   setSelectedCategoryProducts(selectedCategory.filter(product => Number(product.price) > Number(minPrice)))
    // }else{
    //   setMinPrice('')
    // }

    // if(max){
    //   setMaxPrice((max))
    //   setSelectedCategoryProducts(selectedCategory.filter(product => Number(product.price) < Number(maxPrice)))
    // }else{
    //   setMaxPrice('')
    // }

    // if(search){
    //   setSearchTerm(search)
    //   setSelectedCategoryProducts(
    //     selectedCategoryProducts.filter(
    //       (product) => product.title && searchTerm.trim() === '' || product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //   )
    // }else{
    //   setSearchTerm('')
    // }
    setIsLoaded(true)

    if(isLoaded){
      productsRef?.current?.classList.add('products-removed');
      setTimeout(() => {
        setSelectedCategory(category || '');
        setSelectedCategoryProducts(
          products.filter(product => 
            (!category || product.category === category) &&
            (!min || Number(product.price) >= Number(min)) &&
            (!max || Number(product.price) <= Number(max)) &&
            (!search || product.title.toLowerCase().includes(search.toLowerCase()))
          )
        );
      },300)
      setTimeout(() => {
        productsRef?.current?.classList.remove('products-removed');
        productsRef?.current?.classList.add('products-loaded');
        },300)
        setTimeout(() => {
          productsRef?.current?.classList.remove('products-loaded')
        },600)
    }


  },[searchParams,products])

  return (
    <>
        <div className="products-page-container">
          <div className="form-container">
            <form action={formFilter}>
              <div>
                <span>Search by name</span>
                <div className="search-container">
                  <input type="text" placeholder="Search" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="price-container">
                <span>Price</span>
                <div className="input-container">
                  <input type="text" placeholder="min $" name="price_min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  <em>-</em>
                  <input type="text" placeholder="max $" name="price_max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
              </div>
              <div>
                <span>Category</span>
                <div className="category-container">
                  <select name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value=''>All</option>
                    {
                      categories.map((category,index) => (
                        <option value={category} key={index}>{categoryRegEx(category)}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="product-page" ref={productsRef}>
            {selectedCategoryProducts.map((product) => (
              <div key={product.id} className="product-col-3">
                <Link href={`products/${product.id}`} className="product">
                    <div className="image-container">
                        {product.discountPercentage > 0 && <b className="badge-sale">SALE</b>}
                        <Image src={product.thumbnail} width="200" height="200" alt="" />
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
        </div>
    </>
  )
}