
export default function Ratings ({rating}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return(
    <div className="ratings">
      {[...Array(fullStars)].map((_, index) => (
        <div key={index} className="star-w">
          <div className="full" style={{width:"100%", maxWidth:"100%"}}>
            <div className="star"></div>
          </div>
        </div>
      ))}
      {hasHalfStar && (
        <div className="star-w">
          <div className="full" style={{ width: "50%" }}>
            <div className="star" ></div>
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <div key={index} className="star-w">
          <div className="empty">
            <div className="star"></div>
          </div>
        </div>
      ))}
    </div>
  )
}