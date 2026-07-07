import React from 'react'

const ProductCard = ({data}) => {
  return (
    <div className='prod-card'>
        <div className="prod-img">
            <img src={data.thumbnail} alt={data.title} />
        </div>
        <div className="prod-content">
            <div className="prod-title">
                <h4>{data.title}</h4>
                <h4>{data.id}</h4>
            </div>
            <div className="price-part">
                <span className='prod-price'>Rs.{data.price}</span>
            </div>
            <div className="footer-part">
                {data.tags.map((tag) => (
                    <span>{tag}</span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProductCard