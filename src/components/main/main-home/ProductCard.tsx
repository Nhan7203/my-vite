import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom"
import { useCart } from '../../../pages/Cart-page/CartContext';
import { aProduct } from '../../../context/ShopContext';

const getGridColumn = (index: number) => {
  const gridColumnMap = ["1 / 3", "4 / 6", "7 / 9", "10 / 12"];
  return gridColumnMap[index % gridColumnMap.length];
};

const ProductCard = ({ product, index }: {
  product: aProduct;
  index: number;
}) => {
  const { addToCart } = useCart();

  // Extract the first image URL from the imageProducts array
  const imageUrl = product.imageProducts.length > 0
    ? product.imageProducts[0].imageUrl
    : '';

  return (
    <div
      className="card"
      style={{
        gridColumn: getGridColumn(index),
      }}
    >
      <div className="box-card">
        <div className="header-card">
          <Link to={`/productDetails/${product.productId}`}><img src={imageUrl} className="img-card" alt="" /></Link>
        </div>

        <div className="body-card">
          <p>{product.name}</p>
        </div>

        <div className="footer-card">
          <h2 className="price">{product.price}</h2>
          <BsCart3 className="icon" fontSize="1.5em" onClick={() => addToCart(product)} />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;