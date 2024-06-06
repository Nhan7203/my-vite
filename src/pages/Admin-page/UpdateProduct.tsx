//import { toast } from "react-toastify";
import "./Admin.css";
import { useState, useEffect } from "react";
import "./Admin.css";
import { useAllProduct } from "../../context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { ImageProduct } from "../../context/ShopContext";
import * as brandd from "../../apiServices/getBrand";

export interface Brand {
  brandId: number;
  name: string;
  imageBrandUrl: string;
}

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { allProduct } = useAllProduct();
  const { state } = useLocation();
  const { productId } = state;
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [ageId, setAgeId] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [imageProducts, setImageProducts] = useState<ImageProduct[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

  const [brandList, setBrandList] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await brandd.getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);


  const product = allProduct.find((e) => e.productId === parseInt(productId));

  const ageOptions = [
    { id: 1, name: "0 - 6 Month" },
    { id: 2, name: "6 - 12 Month" },
    { id: 3, name: "0 - 1 Year" },
    { id: 4, name: "1 - 2 year" },
    { id: 5, name: "+2 year" },
  ];

  const categoryOptions = [
    { id: 1, name: "Powdered milk" },
    { id: 2, name: "Nut milk" },
    { id: 3, name: "Nutritional drinks" },
    { id: 4, name: "Fresh milk, Yogurt" },
 
  ];

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrandId(product.brandId);
      setCategoryId(product.categoryId);
      setAgeId(product.forAgeId);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImageProducts(product.imageProducts);

      const initialImageUrls: { [key: number]: string } = {};
      product.imageProducts.forEach((image) => {
        initialImageUrls[image.imageId] = image.imageUrl;
      });
      setImageUrls(initialImageUrls);
    }
  }, [product]);

  const handleImageUrlChange = (
    imageId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageUrls((prevImageUrls) => ({
      ...prevImageUrls,
      [imageId]: event.target.value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const payload = {
      productId: productId,
      name: name,
      description: description,
      forAgeId: ageId,
      brandId: brandId,
      categoryId: categoryId,
      price: price,
      stock: stock,
      imageProducts: imageProducts.map((image) => ({
        imageId: image.imageId,
        productId: productId,
        imageUrl: imageUrls[image.imageId] || image.imageUrl,
      })),

      isActive: true,
    };

    console.log(payload);

    try {
      const response = await fetch(
        `https://localhost:7030/api/Products/Update?id=${parseInt(productId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 200) {
        swal("Success", "Product information updated successfully!", "success");
        // window.location.reload();
      } else {
        swal("Error", "Failed to update product information.", "error");
      }
    } catch (error) {
      console.log(error);
      swal(
        "Error",
        "Error occurred during updating product information.",
        "error"
      );
    }
  };

  const handleCancel = () => {
    navigate("/manage-product");
  };
  return (
    <>
      <body>
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h2>
              <span className="lab la-accusoft"></span> <span>M&B</span>
            </h2>
          </div>

          <div className="sidebar-menu">
            <ul>
              <li>
                <a href="/admin" className="active">
                  <span className="las la-igloo"></span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/customer">
                  <span className="las la-users"></span>
                  <span>Customers</span>
                </a>
              </li>
              <li>
                <a href="/manage-product">
                  <span className="las la-clipboard-list"></span>
                  <span>Products</span>
                </a>
              </li>
              <li>
                <a href="/order">
                  <span className="las la-shopping-bag"></span>
                  <span>Orders</span>
                </a>
              </li>

              <li>
                <a href="/account">
                  <span className="las la-user-circle"></span>
                  <span>Accounts</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="las la-clipboard-list"></span>
                  <span>Tasks</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <div className="header-main">
            <h2>
              <label htmlFor="nav-toggle">
                <span className="las la-bars"></span>
              </label>
              Dashboard
            </h2>

            <div className="search-wrapper">
              <span className="las la-search"></span>
              <input type="search" placeholder="Search here" />
            </div>

            <div className="user-wrapper">
              <img
                src="/src/assets/anya-cute.jpg"
                width="40px"
                height="40px"
                alt=""
              />
              <div>
                <h4>Datnt nt</h4>
                <small>Super admin</small>
              </div>
            </div>
          </div>

          <main>
            <form onSubmit={handleSubmit} id="boder-form">
              <form className="form-add ">
                <div>
                <h4>ProductId: {productId}</h4>

                <h4>Image</h4>
                  {product?.imageProducts.map((image) => (
                    <div key={image.imageId}>
                      <label>Image ID: {image.imageId}</label>
                      <input
                        type="text"
                        value={imageUrls[image.imageId]}
                        onChange={(event) =>
                          handleImageUrlChange(image.imageId, event)
                        }
                      />
                    </div>
                  ))}
                  <h4>For age</h4>
                  <select
                    value={ageId}
                    onChange={(e) => setAgeId(Number(e.target.value))}
                  >
                    {ageOptions.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                        selected={option.id === ageId}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <h4>Category</h4>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                  >
                    {categoryOptions.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                        selected={option.id === categoryId}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                  
                  <h4>Brand</h4>
                  <select
                    value={brandId}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                  >
                    {brandList.map((option) => (
                      <option
                        key={option.brandId}
                        value={option.brandId}
                        selected={option.brandId === brandId}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                  
                  <h4>price</h4>
                  <input
                    type="number"
                    name="txtprice"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <h4>stock</h4>
                  <input
                    type="number"
                    name="txtstock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />
                  <h4>Name</h4>
                  <input
                    type="text"
                    name="txtName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <h4>Description</h4>
                  <input
                    type="text"
                    name="txtDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </form>
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
      </body>
    </>
  );
};

export default UpdateProduct;
