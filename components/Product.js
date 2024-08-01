"use client"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image"
import { useEffect, useRef, useState } from "react";

config.autoAddCss = false;

export default function Product({product}) {
  
  const [bigImage, setBigImage] = useState(product.images[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity , setQuantity] = useState(0);
  const dialogRef = useRef();
  const imageRef = useRef();

  const handleClick = e => {
    e.preventDefault();
  }

  useEffect(() => {
    imageRef.current.classList.add('current-dialog-image');
    setTimeout(() => {
      imageRef.current.classList.remove('current-dialog-image');
    },500)
  },[imageIndex])

  function toggleDialog() {
    if(!dialogRef.current) return;
    dialogRef.current.hasAttribute('open')
    ? (setTimeout(() => {(dialogRef.current.close(), dialogRef.current.classList.remove('dialog-closed'))},450), dialogRef.current.classList.remove('dialog-open'), dialogRef.current.classList.add('dialog-closed'))
    : (dialogRef.current.showModal(),dialogRef.current.classList.add('dialog-open'));
  }

  return(
    <div className="product-container">
      <div className="product-left-side-container">
          <div className="big-image-container">
              <Image onClick={toggleDialog} className="big-image" width={300} height={300} src={`${bigImage ? bigImage : product.thumbnail}`} alt="" />
          </div>
          <div className="small-image-container">
            {
              product.images.map((image,index) => (
                <Image onClick={() =>{ setBigImage(image); setImageIndex(index)}} key={index} width={88} height={88} className={`small-image ${bigImage == image && "current-image"}`} src={image} alt="" />
              ))
            }
          </div>
          <dialog ref={dialogRef}>
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className='slider-xmark' onClick={toggleDialog} />
              {
                imageIndex !== 0 && (
                  <FontAwesomeIcon 
                  icon={faChevronLeft} 
                  onClick={() => { if(imageIndex > 0 ) { setBigImage(product.images[imageIndex - 1]); setImageIndex(imageIndex - 1)} } } 
                  />
                )
              }
              <div className="big-image-container">
                  <Image className="big-image" ref={imageRef} width={300} height={300} src={`${bigImage ? bigImage : product.thumbnail}`} alt="" />
              </div>
              <div className="small-image-container">
                {
                  product.images.map((image,index) => (
                    <Image onClick={() =>{ setBigImage(image); setImageIndex(index)}} key={index} width={88} height={88} className={`small-image ${bigImage == image && "current-image"}`} src={image} alt="" />
                  ))
                }
              </div>
              {
                imageIndex !== product.images.length - 1 && (
                  <FontAwesomeIcon 
                  icon={faChevronRight} 
                  onClick={() => { if(imageIndex != product.images.length - 1 ) { setBigImage(product.images[imageIndex + 1]); setImageIndex(imageIndex + 1) } } } 
                  /> 
                )
              }
            
            </div>
          </dialog>
      </div>
      <div className="product-right-side-container">
          <span className="brand">{product.brand}</span>
          <span className="name">{product.title}</span>
          <p className="description">
              {product.description}
          </p>
          <div className="price-container">
              <div className="current-price-container">
                  <span className="badge-new-price">${product.price}</span>
                  <span className="discount-rate">{product.discountPercentage}%</span>
              </div>
              <span className="badge-old-price">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
          </div>
          <div className="add-card-container">
              <div className="quantity-container">
                  <a href="#" className={`quantity-btn quantity-down ${quantity === 0 && "quantity-btn-disabled"}`} onClick={(e) => (quantity > 0 && setQuantity(quantity - 1), handleClick(e))}>-</a>
                  <strong className="quantity-content">{quantity}</strong>
                  <a href="#" className={`quantity-btn quantity-up ${quantity === product.stock && "quantity-btn-disabled"}`} onClick={(e) => (quantity !== product.stock && setQuantity(quantity + 1), handleClick(e))}>+</a>
              </div>
              <button className="big-btn">
                  <Image width={20} height={20} src="/icons/basket-white.svg" alt="" />
                  Add To Cart
              </button>
          </div>
      </div>
    </div>
  )
}