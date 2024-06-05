import { Navbar, Footer } from "../../import/import-router";
import view from "../../assets/view.png";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as searchBlogDetails from "../../apiServices/getBlogId";
import * as searchProduct from "../../apiServices/getProductId";
import "./Blog.css";
import { Blog } from "./Blog";

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId?: string }>();
  console.error("blogIddddd:", blogId);
  const [blogDetails, setBlogDetails] = useState<Blog>({});
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
