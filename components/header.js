import Link from "next/link";
import Image from "next/image";

export default function Header(){
  return (
    <header className="top-header">
      <div className="header-left-side">
        <Link href="/">
            <Image width="130" height="30" src="/img/prodhot.png" alt="" />
        </Link>
        <nav className="nav">
          <ul className="nav-elements-container">
            <li><a href="#" className="nav-element">Koleksiyon</a></li>
            <li><a href="#" className="nav-element">Erkek</a></li>
            <li><a href="#" className="nav-element">Kadın</a></li>
            <li><a href="#" className="nav-element">Hakkında</a></li>
            <li><a href="#" className="nav-element">İletişim</a></li>
            <li><a href="user-product-page.html" className="nav-element">Kullanıcı Sayfası</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-right-side">
        <button className="basket-btn">
          <span className="basket-quantity"></span>
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