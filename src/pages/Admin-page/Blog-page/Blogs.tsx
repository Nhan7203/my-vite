import { swal, useNavigate } from "../../../import/import-another";
import { deleteBlog } from "../../../apiServices/BlogServices/blogServices";
import HeaderMain from "../components/Header-main";
import Sidebar from "../components/Sidebar";
import { aBlog } from "../../../interfaces";
import UserBlogData from "../components/userBlogData";

const Blogs = () => {

  const { blogData, setBlogData } = UserBlogData();
  const navigate = useNavigate();
  

  //------------------------------------------------------------------------------------

  const handleDelete = async (blogId: number) => {
    try {
      swal({
        title: "Are you sure you want to delete this blog?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteBlog(blogId)

          if (response) {
            swal("Success!", "Blog was deleted!", "success").then(() => {
              setBlogData(
                blogData.filter((blog) => blog.blogId !== blogId)
              );
            });
          } else {
            throw new Error("Failed to delete blog");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

//---------------------------------------------------------------------

const handleUpdate = (blog: aBlog) => {
  navigate("/updateblog", { state: { blogId: blog.blogId } });
};

const handleAdd = () => {
  const newBlogId = Math.max(...blogData.map((blog) => blog.blogId)) + 1;
  navigate("/addblog", { state: { blogId: newBlogId } });
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
            <div>
              <table className="table-custome">
                <thead>
                  <tr>
                    {/* <th>No</th> */}
                    <th>BlogId</th>                 
                    <th>Image</th>  
                    <th>ProductId</th>                 
                    <th>Title</th>
                    <th>Content</th>
                    <th>author</th>                  
                    <th>UploadDate</th>
                    <th>UpdateDate</th>
                    <th>view</th>
                    <th>Like</th>
                    <th>Add</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {blogData.map((blog, index: number) => (
                    <tr key={index}>
                      {/* <td>{index + 1}</td> */}

                      <td>{blog.blogId}</td>                      
                      <td>
                        <div className="img-table">
                          <img
                            className="img-pro"
                            src={blog.imageUrl}
                            alt=""
                          />
                        </div>
                      </td>
                      <td>{blog.productId}</td>
                      <td>{blog.title}</td>
                      <td className="td-content" style={{height: "145px"}}>{blog.content}</td>
                      <td>{blog.author}</td>
                      <td> {new Date(blog.uploadDate).toLocaleDateString()}</td>
                      <td> {new Date(blog.updateDate).toLocaleDateString()}</td>                
                      <td>{blog.view}</td>
                      <td>{blog.like}</td>

                      <td>
                        <button
                          className="Edit"
                          onClick={() => handleAdd()}
                        >
                          Add
                        </button>
                      </td>

                      <td>
                        <button
                          className="Edit"
                          onClick={() => handleUpdate(blog)}
                        >
                          Update
                        </button>
                      </td>

                      <td>
                        <button
                          className="Delete-Blog"
                          onClick={() => handleDelete(blog.blogId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Blogs;
