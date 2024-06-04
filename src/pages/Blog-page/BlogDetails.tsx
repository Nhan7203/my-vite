import { Navbar, Footer } from "../../import/import-router";
import view from "../../assets/view.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as searchBlogDetails from "../../apiServices/getBlogId";
import * as searchProduct from "../../apiServices/getProductId";
import "./Blog.css";
import { Blog } from "./Blog";
import { aProduct } from "../../context/ShopContext";

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId?: string }>();
  console.error("blogIddddd:", blogId);
  const [blogDetails, setBlogDetails] = useState<Blog>({});
  const [products, setProducts] = useState<aProduct[]>([]);
  const navigate = useNavigate();

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

  return (
    <div>
      <Navbar />
      <div className="body-blogdetails">
        <div>
          <div className="box-left-blogdetails">
            <div key={blogDetails.blogId}>
              <div className="box-title-blogdetails">{blogDetails.title}</div>
              <div className="box-time-view">
                <div>{blogDetails.uploadDate} </div>
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
          </div>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
