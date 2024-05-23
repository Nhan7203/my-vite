import React, { useState } from 'react';
import axios from 'axios';


export interface Product {
  name: string
  productId: number
}
const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7030/api/Products?search=${query}`);
      setProducts(response.data);
      console.log('this ís: ', response.data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div> 
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {products.map(product => (
          <div key={product.productId}>
            <h4>{product.name}</h4>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;