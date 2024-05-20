import { BsCart3 } from "react-icons/bs";
import { Product } from "./ProductData";
import { useCart } from '../../../pages/Cart-page/CartContext';
const getGridColumn = (index: number) => {
  const gridColumnMap = ["1 / 3", "4 / 6", "7 / 9", "10 / 12"];

  return gridColumnMap[index % gridColumnMap.length];
};
const ProductCard = ({product,index}: {product: Product;index: number;
}) => {

  const { addToCart } = useCart();

  return (
    <div
      className="card"
      style={{
        gridColumn: getGridColumn(index),
      }}
    >
      <div className="box-card">
        <div className="header-card">
          <img src={product.imageUrl} className="img-card" alt="" />
        </div>

        <div className="body-card">
          <p>{product.name}</p>
        </div>

        <div className="footer-card">
          <h2 className="price">{product.price}</h2>
          <BsCart3 className="icon"fontSize="1.5em" onClick={() => addToCart(product)}  />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
