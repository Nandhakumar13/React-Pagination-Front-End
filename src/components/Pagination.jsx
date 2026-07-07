import React, { useState,useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';

const Pagination = () => {
 // state variables
 const[currPage,setCurrPage] = useState(0);
 const[products,setProducts] = useState([]);

 // js variables 
 const pageSize = 10;
 const noProdPage = Math.ceil(products.length / pageSize);
 const start = currPage * pageSize;
 const end = start+ pageSize;
 
 
 const fetchProducts = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=100");
    const res = await data.json();
    console.log("==prods", res.products);
    
    setProducts((prev) => [...prev, ...res.products]);

 }



 useEffect(()=>{
    fetchProducts();
 },[])


 //handler methods

 const pageNumberHandler = (n) => {
    setCurrPage(n);
    // console.log("==result",products.slice(start,end));
    
 }

 const  prevNextHandler = (target) => {
    if(target == 'prev'){
        if(currPage == 0) return false
        setCurrPage(currPage-1);
    }

    if(target == 'next'){
        if(currPage == noProdPage - 1) return false
        setCurrPage(currPage + 1)
    }
 }

  return (
    <>
    {
    !products.length ? <div>No Products</div> :(
        <>
            {/* pagination part */}
            <div className='pagination-container'>
                <button className={`${currPage ==0 ? 'nav-btn hide-btn' :'nav-btn'}`} onClick={()=>prevNextHandler('prev')}>Prev</button>
            {
                [...Array(noProdPage).keys()].map((n)=> (
                    <span key={n+1} className={`${currPage == n ?'page-num active-page' :'page-num'} `} onClick={()=>pageNumberHandler(n)}>{n+1}</span>
                ))
            }
            <button className={`${currPage == noProdPage -1 ? 'nav-btn hide-btn':'nav-btn'}`} disabled={currPage == noProdPage -1} onClick={()=>prevNextHandler('next')}>Next</button>
            </div>
             {/* product listing part  */}
            <div className='prod-container'>
                {products.slice(start,end).map((prod) => (
                    <ProductCard key={prod.id} data={prod} ></ProductCard>
                ))}
            </div>
        </>
    )
    
    }
    </>
  )
}

export default Pagination;