import {
  increaseLike,
  cancelLike,
  getAllBlogs,
  increaseView,
  getLikedBlogsByUser,
} from "../../apiServices/BlogServices/blogServices";
import { useState, useEffect } from "react";
import { getUserIdFromToken } from "../../utils/jwtHelper";
import { Navbar, Footer } from "../../import/import-components";
import { FaHeart } from "react-icons/fa";
import { aBlog } from "../../interfaces";
import view from "../../assets/view.png";
import { useNavigate } from "react-router-dom";
// import "./Blog.css";

const getGridColumn = (index: number) => {
  const gridColumnMap = ["1 / 4", "5 / 8", "9 / 12"];
  return gridColumnMap[index % gridColumnMap.length];
};

const Blog = () => {
  const [blogList, setBlogList] = useState<aBlog[]>([]);
  const navigate = useNavigate();

  // Get the userId from the token
  const token = localStorage.getItem("token");
  const userIdFromToken = token ? getUserIdFromToken(token) : null;
  const userId = userIdFromToken;

  const handleLikeClick = async (blogId: number) => {
    const likedBlog = blogList.find((blog) => blog.blogId === blogId);

    if (!likedBlog) {
      console.error("Blog not found");
      return;
    }

    const liked = likedBlog.like;

    try {
      if (!liked) {
        const response = await increaseLike(userId, blogId);
        console.log(response);
        if (response) {
          setBlogList((prevBlogList) =>
            prevBlogList.map((blog) =>
              blog.blogId === blogId
                ? { ...blog, like: blog.like + 1, liked: true }
                : blog
            )
          );
        }
      } else {
        const response = await cancelLike(userId, blogId);
        if (response) {
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
        const allBlogsResponse = await getAllBlogs();
        if (userId) {
          const likedResponse = await getLikedBlogsByUser(userId);
          const likedBlogs = likedResponse.map((blogId: number) => blogId);
          const updatedBlogList = allBlogsResponse.map((blog: aBlog) => ({
            ...blog,
            liked: likedBlogs.includes(blog.blogId),
          }));
          setBlogList(updatedBlogList);
        } else {
          setBlogList(allBlogsResponse);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, [userId]);

  const increaseViewCount = async (userId: string | null, blogId: number) => {
    try {
      await increaseView(userId, blogId);
      setBlogList((prevBlogList) =>
        prevBlogList.map((blog) =>
          blog.blogId === blogId
            ? { ...blog, view: blog.view + 1 }
            : blog
        )
      );
      navigate(`/blogdetails/${blogId}`);
    } catch (error) {
      console.error("Error increasing view count:", error);
    }
  };

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
                <div onClick={() => increaseViewCount(userId, blog.blogId)}>
                  <div className="box-img-blog">
                    <img src={blog.imageUrl} className="img-blog" alt="" />
                  </div>
                  <div className="box-title">{blog.title}</div>
                  <div className="box-content">{blog.content}</div>
                </div>
                <div className="box-footer-blog">
                  <div className="icon-blog">
                    <img src={view} className="view" alt="view" />
                    <div>{blog.view}</div>
                    <FaHeart
                      fontSize="1.3em"
                      className="my-icon"
                      style={{
                        cursor: "pointer",
                        color: blog.like ? "red" : "inherit",
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