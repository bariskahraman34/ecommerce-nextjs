"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NavList({products}){
  const [link, setLink] = useState("");
  const [isBasketOpen , setIsBasketOpen] = useState(false);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setLink(searchParams.get('category'))
  },[searchParams])

  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCount);

  const sortedCategories = categories.sort((a,b) => a[1]-b[1])

  function categoryRegEx(text) {
    return text.replace(/(?:^|\s)\S+/g, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    }).replace(/[-_](\w)/g, function(match, p1) {
        return " " + p1.toUpperCase();
    });
  }

  function toggleBasket(){
    setIsBasketOpen(() => !isBasketOpen)
  }

  return (
    <header className="top-header">
      <div className="header-left-side">
        <Link href="/">
            <Image width="130" height="30" src="/img/prodhot.png" alt="" />
        </Link>
        <nav className="nav">
          <ul className="nav-elements-container">
            <li><Link href="/products" className={`nav-element ${(!link && pathname == "/products") ? "active" : ""}`}>Products</Link></li>
            {sortedCategories.reverse().slice(0,4).map((category,index) => (
              <li key={index}><Link href={`/products/?category=${category[0]}`} className={`nav-element ${(searchParams.get('category') && category[0] == link) ? "active" : ""}`}>{categoryRegEx(category[0])}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="header-right-side">
        <button className="basket-btn" onClick={toggleBasket}>
          <span className="basket-quantity">0</span>
          <Image src="/icons/basket.svg" width="20" height="20" alt="basket" className="basket" />
        </button>
        <div className={`basket-result ${isBasketOpen && "show"}`}>
          {isBasketOpen && (
            <>
            <div className="cart-header">
              <button className="close-offcanvas-btn" onClick={toggleBasket}><FontAwesomeIcon size="xl" icon={faXmark} /></button>
              <h3>Cart</h3>
            </div>
            <div className="cart-body">
              <div className="cart-container">            
                  <Image src="/icons/del-icon.svg" width={50} height={50} alt="" />
                  <div className="cart-infos">
                      <div>
                          <span className="thin-text">basket.title</span>
                      </div>
                      <div> 
                          <span className="product-price thin-text">$basket.productPrice</span>
                          <span className="thin-text">x</span>
                          <span className="thin-text">basket.quantity</span>
                          <span className="bold-text">$basket.totalPrice</span>
                      </div>
                  </div>
              </div>
              <button className="delete-btn" ><Image className="del-icon" src="/icons/del-icon.svg" width={15} height={15} alt=""/></button>
            </div>
            </>
          )}
        </div>

        <button>
            <Image src="/img/user-image.png" width="40" height="40" alt="user image" className="user-profile-img" />
        </button>
      </div>
    </header>
  )
}