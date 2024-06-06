import { Navbar, Footer } from "../../import/import-router";
import { useState, useEffect } from "react";
import axios from "axios";
import view from "../../assets/view.png";
import { CiHeart } from "react-icons/ci";
import "./Blog.css";
import { Link } from "../../import/import-libary";
import { jwtDecode } from "jwt-decode";

export interface Blog {
  blogId: number;
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
          `https://localhost:7030/api/Blog/getAllBlogs`
        );
        setBlogList(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  const increaseViewCount = async (userId: string, blogId: number) => {
    try {
      await fetch(
        `https://localhost:7030/api/Blog/IncreaseView?userId=${parseInt(userId)}&blogId=${blogId}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error("Error increasing view count:", error);
    }
  };

  //Get the userId from the token
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found");
    return;
  }

  const decodedToken: any = jwtDecode(token);

  const userIdIdentifier =
    decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  const userId = userIdIdentifier;


  return (
    <div>
      <Navbar />

      <div className="body-blog">
        <div>
          {blogList.map((blogs, index) => (
            <div
              className="box-blog"
              style={{
                gridColumn: getGridColumn(index),
              }}
            >
              <div className="element-blog">
                <Link to={`/blogdetails/${blogs.blogId}`} onClick={() => increaseViewCount(userId, blogs.blogId)}>
                  <div className="box-img-blog">
                    <img src={blogs.imageUrl} className="img-blog" alt="" />
                  </div>
                  <div className="box-title">{blogs.title}</div>
                  <div className="box-content">{blogs.content}</div>
                </Link>
                <div className="box-footer-blog">
                  <div className="icon-blog">

                    <img src={view} className="view" alt="view" />
                    <div>{blogs.view}</div>

                    <CiHeart fontSize="1.5em" style={{ cursor: "pointer" }} />

                  </div>
                  <div className="date-blog">{new Date(blogs.uploadDate).toLocaleDateString()}</div>
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
