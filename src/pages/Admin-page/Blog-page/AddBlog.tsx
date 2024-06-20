import { useLocation, useNavigate } from "react-router-dom";
import { useState, swal } from "../../../import/import-another";
import Sidebar from "../components/Sidebar";
import HeaderMain from "../components/Header-main";

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTile] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [productId, setProductId] = useState<number>(0);
  const uploadDate = new Date().toISOString();
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { state } = useLocation();
  const { blogId } = state;
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    author: "",
    productId: "",
    imageUrl: "",
  });
  //-----------------------------------------------------------------------

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageUrl(imageUrl);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl("");
      setImageFile(null);
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
      imageUrl: "",
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
      error.author = "Author is Required!";
      error.check = true;
    }

    if (productId === 0) {
      error.productId = "ProductId must be greater than 0.";
      error.check = true;
    }

    if(imageFile == null || imageUrl == "") {
      error.imageUrl = "image is required!";
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
    const checkImageFile = imageFile;
    if(checkImageFile) {
      formData.append("imageFile", checkImageFile);
    }
    
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
        navigate("/blogs");
      } else {
        swal("Error", `Failed to create blog information.${response.status}`, "error");
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
                  {errors.imageUrl && <p style={{ color: "red" }}>{errors.imageUrl}</p>}
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={`Image blog`}
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
                  {errors.productId && (
                    <p style={{ color: "red" }}>{errors.productId}</p>
                  )}

                </div>
              </div>
              <div className="both-button">
                <button type="submit" className="bt-add" onClick={handleSubmit}>
                  Add
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
