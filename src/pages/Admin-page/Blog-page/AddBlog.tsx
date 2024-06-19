import { useLocation, useNavigate } from "react-router-dom";
import UserBlogData from "../components/userBlogData";
import { useEffect, useState, swal } from "../../../import/import-another";
import { aBlog } from "../../../interfaces";
import Sidebar from "../components/Sidebar";
import HeaderMain from "../components/Header-main";

const AddBlog = () => {
  const navigate = useNavigate();
  const { blogData } = UserBlogData();
  const [blogs, setBlogs] = useState<aBlog>();
  const [title, setTile] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [productId, setProductId] = useState<number>(0);
  const [uploadDate, setUploadDate] = useState<string>(
    new Date().toISOString()
  );
  const [updateDate, setUpdateDate] = useState<string>(
    new Date().toISOString()
  );
  const [image, setImage] = useState("");
  const { state } = useLocation();
  const { blogId } = state;

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    author: "",
    productId: "",
    uploadDate: "",
    updateDate: "",
  });

  useEffect(() => {
    if (blogId) {
      const selectedBlog = blogData.find((e) => e.blogId === blogId);
      if (selectedBlog) {
        setBlogs(selectedBlog);
      }
    }
  }, [blogId, blogData]);
  //-----------------------------------------------------------------------

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  //--------------------------------------------------------------------------

  const handleCancel = () => {
    navigate("/manage-product");
  };

  //-----------------------------------------------------------------------------

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const error = {
      title: "",
      content: "",
      author: "",
      productId: "",
      uploadDate: "",
      updateDate: "",
      check: false,
    };

    if (title === "") {
      error.title = "Title is Required!";
      error.check = true;
    }

    if (content === "") {
      error.content = "Content is Required!";
      error.check = true;
    }

    if (author === "") {
      error.content = "Author is Required!";
      error.check = true;
    }

    if (productId === 0) {
      error.productId = "ProductId must be greater than 0.";
      error.check = true;
    }

    if (updateDate === "") {
      error.content = "UpdateDate is Required!";
      error.check = true;
    }

    if (uploadDate === "") {
      error.content = "uploadDate is Required!";
      error.check = true;
    }

    setErrors(error);
    if (error.check) {
      return;
    }

    const formData = new FormData();
    formData.append("blogId", blogId.toString());
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("productId", productId.toString());
    formData.append("uploadDate", uploadDate);//////////// error  date not string
    formData.append("updateDate", updateDate);//////////// error  date not string
    formData.append("imageUrl", image);

    try {
      const response = await fetch(
        `https://localhost:7030/api/Blog/Create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 200) {
        swal("Success", "Blog information created successfully!", "success");
        // window.location.reload();
      } else {
        swal("Error", "Failed to create blog information.", "error");
      }
    } catch (error) {
      console.log(error);
      swal(
        "Error",
        "Error occurred during creating blog information.",
        "error"
      );
    }
  };

  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />

        <div className="main-content">
          <HeaderMain
            searchQuery={""}
            displayed={[]}
            setSearchQuery={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          <main>
            <form onSubmit={handleSubmit} id="boder-form">
              <div className="form-add ">
                <div>
                  <h4>BlogId: {blogId}</h4>

                  <h4>Image</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event)}
                  />
                  {image && (
                    <img
                      src={blogs?.imageUrl}
                      alt={`Image ${blogs?.imageUrl}`}
                      style={{ maxWidth: "200px" }}
                    />
                  )}

                  <h4>Title</h4>
                  <input
                    type="text"
                    name="txtTile"
                    value={title}
                    onChange={(e) => setTile(e.target.value)}
                  />
                  {errors.title && (
                    <p style={{ color: "red" }}>{errors.title}</p>
                  )}

                  <h4>Content</h4>
                  <input
                    type="text"
                    name="txtContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  {errors.content && (
                    <p style={{ color: "red" }}>{errors.content}</p>
                  )}

                  <h4>Author</h4>
                  <input
                    type="text"
                    name="txtAuthor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  {errors.author && (
                    <p style={{ color: "red" }}>{errors.author}</p>
                  )}

                  <h4>ProductId</h4>
                  <input
                    type="number"
                    name="txtProductId"
                    min={0}
                    value={productId}
                    onChange={(e) => setProductId(Number(e.target.value))}
                  />
                  {errors.author && (
                    <p style={{ color: "red" }}>{errors.author}</p>
                  )}

                  <h4>UploadDate</h4>
                  <input
                    type="date"
                    name="txtUploadDate"
                    value={uploadDate}
                    onChange={(e) => setUploadDate(e.target.value)}
                  />
                  {errors.uploadDate && (
                    <p style={{ color: "red" }}>{errors.uploadDate}</p>
                  )}

                  <h4>UpdateDate</h4>
                  <input
                    type="date"
                    name="txtUpdatedDate"
                    value={updateDate}
                    onChange={(e) => setUpdateDate(e.target.value)}
                  />
                  {errors.updateDate && (
                    <p style={{ color: "red" }}>{errors.updateDate}</p>
                  )}
                </div>
              </div>
              <div className="both-button">
                <button type="submit" className="bt-add">
                  Update
                </button>
                <button className="bt-cancel" onClick={() => handleCancel()}>
                  Cancel
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
