import { useState, useRef, useCallback } from "react";
import useGetProducts from "./api/GetProducts";
import ProductItem from "./components/ProductItem";
import "./styles.css";

export default function App() {
  const [pageNumber, setPageNumber] = useState(0);

  const { products, hasMore, loading, error } = useGetProducts(pageNumber);

  const observer = useRef();
  const lastProduct = useCallback(
    (item) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (item) {
        observer.current.observe(item);
      }
    },
    [loading, hasMore]
  );

  return (
    <main>
      <div className="product-result">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div className="result-item" ref={lastProduct} key={index}>
                <ProductItem product={product} />
              </div>
            );
          }
          return (
            <div key={index} className="result-item">
              <ProductItem product={product} />
            </div>
          );
        })}
        {loading && <div className="loading">Loading ...</div>}
        {error && <div className="error">Error ...</div>}
      </div>
    </main>
  );
}
