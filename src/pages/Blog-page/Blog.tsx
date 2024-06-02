import { Navbar, Footer } from "../../import/import-router";
import { useState, useEffect } from "react";
import axios from "axios";
import view from "../../assets/view.png";
import { CiHeart } from "react-icons/ci";
import "./Blog.css";

export interface Blog {
  title: string;
  content: string;
  author: string;
  productId: number;
  uploadDate: Date;
  updateDate: Date;
  view: number;
  like: number;
  imageUrl: string;
}

const getGridColumn = (index: number) => {
  const gridColumnMap = ["1 / 4", "5 / 8", "9 / 12"];
  return gridColumnMap[index % gridColumnMap.length];
};

const Blog = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);

  //Get API blog
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7030/api/Blog/getAllBlogs"
        );
        setBlogList(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="body-blog">
        <div>
          {blogList.map((blog, index) => (
            <div
              className="box-blog"
              style={{
                gridColumn: getGridColumn(index),
              }}
            >
              <div className="element-blog">
                <div className="box-img-blog">
                  <img src={blog.imageUrl} className="img-blog" alt="" />
                </div>
                <div className="box-title">{blog.title}</div>
                <div className="box-content">{blog.content}</div>
                <div className="box-footer-blog">
                  <div className="icon-blog">
                    
                      <img src={view} className="view" alt="view" />
                      <div>0</div>
                    
                    <CiHeart fontSize="1.5em" style={{cursor: "pointer"}}/>
                  </div>
                  <div className="date-blog">{blog.uploadDate}</div>
                </div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
