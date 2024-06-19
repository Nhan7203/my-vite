import { useEffect, useState, swal } from "../../../import/import-another";
import { aBlog } from "../../../interfaces";
import { getAllBlogs } from "../../../apiServices/BlogServices/blogServices";

const UserBlogData = () => {
  const [blogData, setBlogData] = useState<aBlog[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          await swal({
            title: "Oops!",
            text: "You haven't logged in yet! Redirecting to Login Page...",
            icon: "warning",
            buttons: {
              ok: {
                text: "OK",
                value: true,
                className: "swal-ok-button",
              },
            },
          });
          window.location.href = "/login";
          return;
        }

        const response = await getAllBlogs();

        if (response) {
            setBlogData(response);
        } else {
          console.error("Failed to retrieve blogs data:", response);
        }
      } catch (error) {
        console.error("Failed to retrieve blogs data:", error);
      }
    };

    fetchBlogData();
  }, []);

  return { blogData, setBlogData };
};

export default UserBlogData;
