import "./Admin.css";
import { useState, useEffect } from "react";
import "./Admin.css";
import { useLocation, useNavigate } from "react-router-dom";
import * as brandd from "../../apiServices/getBrand";
import swal from "sweetalert";

import {
  ImageProduct,
  aProduct,
  useAllProduct,
} from "../../context/ShopContext";

export interface Brand {
  brandId: number;
  name: string;
  imageBrandUrl: string;
}

const AddProduct = () => {
  const navigate = useNavigate();
  const { allProduct } = useAllProduct();
  const { state } = useLocation();
  const { productList } = state;
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [ageId, setAgeId] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [imageProducts, setImageProducts] = useState<ImageProduct[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [products] = useState<aProduct[]>(productList);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    stock: '',
    price: '',
    imageUrls: '',
  });
  console.log(imageUrls)
  const maxProductId = Math.max(
    ...products.map((product) => product.productId)
  );
  const product = allProduct.find((e) => e.productId === maxProductId);

  let maxImageId: number | undefined;
  if (product) {
    maxImageId = Math.max(...product.imageProducts.map((i) => i.imageId));
    
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await brandd.getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);

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

  

  const handleImageUpload = (imageId: number,  event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    
    if (file) {
      const imageUrl = `/images/products/${file.name}`;
      setImageUrls((prevImageUrls) => ({
        ...prevImageUrls,
        [imageId]: imageUrl,
      }));
      setImageProducts((prevImageProducts) => [
          ...prevImageProducts,
          {
            imageId,
            productId: imageId,
        imageUrl:  imageUrl ,
          },          
        ]);
    } 
  }
  // const handleAddImageProduct = (imageId: number, imageUrl:  string ) => {
  //   setImageProducts((prevImageProducts) => [
  //     ...prevImageProducts,
  //     {
  //       imageId,
  //       productId: maxProductId + 1,
  //       imageUrl: imageUrl ,
  //     },
      
  //   ]);
  //   console.log(imageUrl)
  // };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const error = {
      name: '',
      description: '',
      stock: '',
      price: '',
      imageUrls: '',
      check: false
    };
    // const name_parttern = /^[^\d!@#$%^&*(),.?":{}|<>]+$/u

    if (name === "") {
      error.name = "Name is Required!"
      error.check = true
    // } else if (!name_parttern.test(name.trim())) {
    //   error.name = "The name should not have special characters"
    //   error.check = true
     }
     if (description === "") {
      error.description = "Description is Required!"
      error.check = true
     }

     if (stock === 0) {
      error.stock = "Stock != 0 "
      error.check = true
    }

    if (price === 0) {
      error.price = "Price != 0 "
      error.check = true
    }

    if (imageUrls ) {
      error.imageUrls = "imageUrl is Required!"
      error.check = true
     }
    
    setErrors(error)
    if (error.check) {
      return
    }
    const payload = {
      name: name,
      description: description,
      forAgeId: ageId,
      brandId: brandId,
      categoryId: categoryId,
      price: price,
      stock: stock,
      imageProducts: imageProducts,
      isActive: true,
    };

    console.log(payload);

    try {
      const response = await fetch(
        `https://localhost:7030/api/Products/Create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store cart data");
        
      }
      if (response.status === 200) {
        swal("Success", "Product information created successfully!", "success");
        console.log(payload);    
        
      } else {
        swal("Error", "Failed to create product information.", "error");
      }
      const data = await response.json();

      console.log("Product data stored:", data);
    } catch (error) {
      console.error("Error storing product data:", error);
      swal(
        "Error",
        "Error occurred during create product information.",
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
                  <h4>ProductId: {products.length + 1}</h4>

                  <h4>Image</h4>
                  {/* {product?.imageProducts.map((image, index) => (
                    <div key={index}>
                      <label>Image ID: {maxImageId ? maxImageId + index + 1 : 0}</label>
                      <input
                        type="text"
                        value={imageUrls }
                        onChange={(event) => handleAddImageProduct(maxImageId ? maxImageId + index + 1 : 0, event.target.value)}
                      />
                    </div>
                  ))} */}


                {product?.imageProducts.map((image, index) => (
                  <div key={index}>
                    <label>Image ID: {maxImageId ? maxImageId + index + 1 : 0}</label>
                    <input
                      type="file"
                      onChange={(event) => handleImageUpload(maxImageId ? maxImageId + index + 1 : 0, event)}
                    />
                      
                    {imageUrls[maxImageId ? maxImageId + index + 1 : 0] ?  (
                      <img
                        src={imageUrls[maxImageId ? maxImageId + index + 1 : 0] }
                        alt={`Image ${maxImageId ? maxImageId + index + 1 : 0}`}
                        style={{ maxWidth: '200px' }}
                      />
                    ) : (
                      <div >{errors.imageUrls && <p style={{ color: "red" }}>{errors.imageUrls}</p>}</div>
                    )}
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
                  {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
                  <h4>stock</h4>
                  <input
                    type="number"
                    name="txtstock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />
                  {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
                  <h4>Name</h4>
                  <input
                    type="text"
                    name="txtName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                   {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                  <h4>Description</h4>
                  <input
                    type="text"
                    name="txtDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                   {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
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

export default AddProduct;
