import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetProducts(pageNumber) {
  const limit = 20;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `https://dummyjson.com/products?limit=${limit}&skip=${
        pageNumber * limit
      }`
    })
      .then((response) => {
        setProducts((prevProducts) => {
          return [...new Set([...prevProducts, ...response.data.products])];
        });
        setHasMore(response.data.skip < response.data.total);
        setLoading(false);
        console.log(pageNumber, response.data.products);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, products, hasMore };
}
