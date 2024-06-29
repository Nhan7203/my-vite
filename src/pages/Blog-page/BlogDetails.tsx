import { useAllProduct, useEffect, useState } from "../../import/import-another";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HandleAddToCart } from "../Cart-page/HandleAddToCart";
import { aProduct, aBlog } from "../../interfaces";
import { Navbar, Footer } from "../../import/import-components";
import { getBlogId } from "../../apiServices/BlogServices/blogServices";
import { BsCart3 } from "../../import/import-libary";
import view from "../../assets/view.png";
import "./Blog.css";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { blogId } = useParams<{ blogId: string }>();
  const [blogDetails, setBlogDetails] = useState<aBlog | null>(null);
  const { allProduct } = useAllProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!blogId) {
        navigate("/blog");
        return;
      }
      try {
        const result = await getBlogId(blogId);
        setBlogDetails(result);
      } catch (error) {
        console.error(error);
        navigate("/blog");
      }
    };
    fetchProducts();
  }, [blogId, navigate]);

  const product = blogDetails?.productId
    ? allProduct.find((e) => e.productId === blogDetails.productId)
    : null;
//--------------------------------------------------------------------------------------------

const { handleAddToCart } = HandleAddToCart();

  const HandleAddToCartClick = (product: aProduct) => {
    handleAddToCart(product);
  };
//-----------------------------------------------------------------------------------------------------


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
                    <div style={{ transform: "translateY(3px)" }}>{blogDetails.view}</div>
                  </div>
                </div>
                <div className="content-blogdeatails">{blogDetails.content}</div>
                <div className="author">{blogDetails.author}</div>
                <div className="img-blogdetails">
                  <img src={blogDetails.imageUrl} alt="" />
                </div>
              </div>
            )}
          </div>
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
                      onClick={() => HandleAddToCartClick(product)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/blog"></Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
