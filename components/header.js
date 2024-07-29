import Link from "next/link";
import Image from "next/image";

export default async function Header(){

  const getData = await fetch("https://dummyjson.com/products?limit=100");
  const response = await getData.json();
  const products = response.products;

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
  
  return (
    <header className="top-header">
      <div className="header-left-side">
        <Link href="/">
            <Image width="130" height="30" src="/img/prodhot.png" alt="" />
        </Link>
        <nav className="nav">
          <ul className="nav-elements-container">
            <li><Link href="/products" className="nav-element">Products</Link></li>
            {sortedCategories.reverse().slice(0,4).map((category,index) => (
              <li key={index}><Link href={category[0]} className="nav-element">{categoryRegEx(category[0])}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="header-right-side">
        <button className="basket-btn">
          <span className="basket-quantity">0</span>
          <Image src="/icons/basket.svg" width="20" height="20" alt="basket" className="basket" />
        </button>
        <div className="basket-result">

        </div>
        <button>
            <Image src="/img/user-image.png" width="40" height="40" alt="user image" className="user-profile-img" />
        </button>
      </div>
    </header>
  )
}