import { Navbar, Footer } from "../../import/import-router";

const Blog = () => {
  return (
    <>
      <Navbar />

      <div className="big-container">
        <div className="product-container">
          <div className="image-container">
            <img src="product1.jpg" alt="Product 1" />
          </div>
          <div className="details-container">
            <div className="title">Product 1</div>
            <div className="content">This is the description of Product 1.</div>
            <div className="footer">
              <span className="icon-like">Like</span>
              <span className="icon-eye">Views</span>
              <span className="date-created">Date Created</span>
            </div>
          </div>
        </div>

        <div className="product-container">
          <div className="image-container">
            <img src="product2.jpg" alt="Product 2" />
          </div>
          <div className="details-container">
            <div className="title">Product 2</div>
            <div className="content">This is the description of Product 2.</div>
            <div className="footer">
              <span className="icon-like">Like</span>
              <span className="icon-eye">Views</span>
              <span className="date-created">Date Created</span>
            </div>
          </div>
        </div>

        <div className="product-container">
          <div className="image-container">
            <img src="product3.jpg" alt="Product 3" />
          </div>
          <div className="details-container">
            <div className="title">Product 3</div>
            <div className="content">This is the description of Product 3.</div>
            <div className="footer">
              <span className="icon-like">Like</span>
              <span className="icon-eye">Views</span>
              <span className="date-created">Date Created</span>
            </div>
          </div>
        </div>

        {/* Add more product containers as needed */}
      </div>

      <Footer />
    </>
  );
};

export default Blog;
