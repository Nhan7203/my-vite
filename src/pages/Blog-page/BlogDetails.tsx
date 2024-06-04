import { Navbar, Footer } from "../../import/import-router";
import view from "../../assets/view.png";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as searchBlogDetails from "../../apiServices/getBlogId";
import * as searchProduct from "../../apiServices/getProductId";
import "./Blog.css";
import { Blog } from "./Blog";
<<<<<<< nhanh-30
import { useAllProduct } from "../../context/ShopContext";
import { BsCart3 } from "../../import/import-libary";
import { useCart } from "../Cart-page/CartContext";

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId?: string }>();
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const { addToCart } = useCart();
=======
import { aProduct } from "../../context/ShopContext";

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId?: string }>();
  console.error("blogIddddd:", blogId);
  const [blogDetails, setBlogDetails] = useState<Blog>({});
  const [products, setProducts] = useState<aProduct[]>([]);
>>>>>>> master
  const navigate = useNavigate();
  const { allProduct } = useAllProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!blogId) {
        navigate("/blog");
        return;
      }

      const result = await searchBlogDetails.getBlogId(blogId);
      setBlogDetails(result);
    };
    fetchProducts();
  }, [blogDetails, blogId, navigate]);

<<<<<<< nhanh-30
  const product = blogDetails?.productId ? allProduct.find((e) => e.productId === blogDetails.productId) : null;
=======
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const queryParams = new URLSearchParams();

  //     if (blogDetails.productId != null) {
  //       queryParams.append("", blogDetails.productId.toString());
  //     }
  //     const result = await searchProduct.getProductId(queryParams);
  //     setProducts(result);
  //     console.error("cc", result);
  //   };
  //   fetchProducts();
  // }, [blogDetails]);
>>>>>>> master

  return (
    <div>
      <Navbar />
      <div className="body-blogdetails">
        <div>
          <div className="box-left-blogdetails">
          {blogDetails && (
            <div key={blogDetails.blogId}>
              <div className="box-title-blogdetails">{blogDetails.title}</div>
              <div className="box-time-view">
              <div>{new Date(blogDetails.uploadDate).toLocaleDateString()}</div>
                <div className="icon-blog">
                  <img src={view} className="view" alt="view" />
                  <div style={{ transform: "translateY(3px)" }}>0</div>
                </div>
              </div>
              <div className="content-blogdeatails">{blogDetails.content}</div>
              <div className="author">{blogDetails.author}</div>
              <div className="img-blogdetails">
                <img src={blogDetails.imageUrl} alt="Mô tả ảnh" />
              </div>
            </div>
            )}
          </div>
<<<<<<< nhanh-30
          {product ? (
            <div className="box-right-blogdetails">
              <div key={product.productId} className="product-card">
                <Link to={`/productDetails/${product.productId}`}>
                  <div className="img-product-blog">
                    <img
                      src={product.imageProducts[0].imageUrl}
                      alt={product.name}
                    />
                  </div>
                </Link>
                <div className="name-product-blog">
                  <p>{product.name}</p>
                </div>

                <div className="price-product-blog">
                  <p>${product.price.toLocaleString()}</p>
                </div>
                <div>
                  <div className="icon-product-blog">
                    <BsCart3
                      className="icon-shopping"
                      fontSize="1.5em"
                      onClick={() => addToCart(product)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/blog"></Link>
          )}
=======
          {/* <div className="box-right-blogdetails">
            {products.map((product) => (
              <div key={product.productId} className="product-card">
                <img src={product.imageProducts[0]} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Giá: {product.price}</p>
              </div>
            ))}
          </div> */}
>>>>>>> master
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
