import { Navbar, Footer } from "../../import/import-router";
import { useState, useEffect } from "react";
import axios from "axios";
import view from "../../assets/view.png";
import "./Blog.css";
import { Link } from "../../import/import-libary";
import { jwtDecode } from "jwt-decode";
import { FaHeart } from "react-icons/fa";

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

  const handleLikeClick = async (blogId: number) => {
    const likedBlog = blogList.find((blog) => blog.blogId === blogId);

    if (!likedBlog) {
      console.error("Blog not found");
      return;
    }

    const liked = likedBlog.like;

    try {
      if (!liked) {
        const response = await axios.post(
          `https://localhost:7030/api/Blog/IncreaseLike?userId=${parseInt(
            userId
          )}&blogId=${blogId}`
        );
        if (response.status === 200) {
          setBlogList((prevBlogList) =>
            prevBlogList.map((blog) =>
              blog.blogId === blogId
                ? { ...blog, like: blog.like + 1, liked: true }
                : blog
            )
          );
        }
      } else {
        const response = await axios.post(
          `https://localhost:7030/api/Blog/CancelLike?userId=${parseInt(
            userId
          )}&blogId=${blogId}`
        );
        if (response.status === 200) {
          setBlogList((prevBlogList) =>
            prevBlogList.map((blog) =>
              blog.blogId === blogId
                ? { ...blog, like: blog.like - 1, liked: false }
                : blog
            )
          );
        }
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  // Get API blog
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/Blog/getAllBlogs`
        );
        const updatedBlogList = response.data.map((blog: Blog) => ({
          ...blog,
          liked: false,
        }));
        setBlogList(updatedBlogList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  const increaseViewCount = async (userId: string, blogId: number) => {
    try {
      await fetch(
        `https://localhost:7030/api/Blog/IncreaseView?userId=${parseInt(
          userId
        )}&blogId=${blogId}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error("Error increasing view count:", error);
    }
  };

  // Get the userId from the token
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found");
    return null;
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
          {blogList.map((blog, index) => (
            <div
              key={blog.blogId}
              className="box-blog"
              style={{
                gridColumn: getGridColumn(index),
              }}
            >
              <div className="element-blog">
                <Link
                  to={`/blogdetails/${blog.blogId}`}
                  onClick={() => increaseViewCount(userId, blog.blogId)}
                >
                  <div className="box-img-blog">
                    <img src={blog.imageUrl} className="img-blog" alt="" />
                  </div>
                  <div className="box-title">{blog.title}</div>
                  <div className="box-content">{blog.content}</div>
                </Link>
                <div className="box-footer-blog">
                  <div className="icon-blog">
                    <img src={view} className="view" alt="view" />
                    <div>{blog.view}</div>
                    <FaHeart
                      size={24}
                      style={{
                        cursor: "pointer",
                        color: blog.like ? "pink" : "inherit",
                      }}
                      onClick={() => handleLikeClick(blog.blogId)}
                    />
                    <div>{blog.like}</div>
                  </div>
                  <div className="date-blog">
                    {new Date(blog.uploadDate).toLocaleDateString()}
                  </div>
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