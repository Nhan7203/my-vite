import { useAllProduct } from "../../context/ShopContext";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const {allProduct} = useAllProduct();
    const {productId} = useParams<{ productId?: string }>();

    let product;
    if (productId) {
        product = allProduct.find((e) => e.productId === parseInt(productId));
      }
  return (
    <div>
    {product ? (
      <>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}

export default ProductDetails