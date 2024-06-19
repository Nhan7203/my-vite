//import { toast } from "react-toastify";
import "./Admin.css";
import { useState, useEffect } from "react";
import "./Admin.css";
import { useAllProduct } from "../../context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { ImageProduct, ageOptions, categoryOptions } from "../../interfaces";

import { getBrand } from "../../apiServices/BrandServices/brandServices";
import HeaderMain from "./components/Header-main";
import Sidebar from "./components/Sidebar";

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
  const [imageData, setImageData] = useState<{
    [key: number]: {
      imageUrl: string;
      imageFile: File | null;
    };
  }>({});
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);

  const product = allProduct.find((e) => e.productId === parseInt(productId));

  

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

      const initialImageData: {
        [key: number]: {
          imageUrl: string;
          imageFile: File | null;
        };
      } = {};
      product.imageProducts.forEach((image) => {
        initialImageData[image.imageId] = {
          imageUrl: image.imageUrl,
          imageFile: null,
        };
      });
      setImageData(initialImageData);
    }
  }, [product]);

  const handleImageUpload = (
    imageId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageData((prevImageData) => ({
          ...prevImageData,
          [imageId]: {
            imageFile: file,
            imageUrl,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const error = {
      name: "",
      description: "",
      stock: "",
      price: "",
      check: false,
    };

    if (name === "") {
      error.name = "Name is Required!";
      error.check = true;
    }
    if (description === "") {
      error.description = "Description is Required!";
      error.check = true;
    }

    if (stock === 0) {
      error.stock = "Stock must be greater than 0.";
      error.check = true;
    }

    if (price === 0) {
      error.price = "Price must be greater than 0.";
      error.check = true;
    }

    setErrors(error);
    if (error.check) {
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId.toString());
    formData.append("name", name);
    formData.append("description", description);
    formData.append("forAgeId", ageId.toString());
    formData.append("brandId", brandId.toString());
    formData.append("categoryId", categoryId.toString());
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("isActive", "true");

    imageProducts.forEach((image, index) => {
      formData.append(
        `imageProducts[${index}].imageId`,
        image.imageId.toString()
      );
      formData.append(
        `imageProducts[${index}].productId`,
        productId.toString()
      );
      formData.append(
        `imageProducts[${index}].imageUrl`,
        imageData[image.imageId].imageUrl || image.imageUrl
      );
      const imageFile = imageData[image.imageId].imageFile;
      if (imageFile) {
        formData.append(`imageProducts[${index}].imageFile`, imageFile);
      }
      // if (imageData[image.imageId].imageFile) {
      //   formData.append(`imageProducts[${index}].imageFile`, imageData[image.imageId].imageFile);
      // }
    });

    try {
      const response = await fetch(
        `https://localhost:7030/api/Products/Update?id=${parseInt(productId)}`,
        {
          method: "PUT",
          body: formData,
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
                  <h4>ProductId: {productId}</h4>

                  <h4>Image</h4>
                  {product?.imageProducts.map((image) => (
                    <div key={image.imageId}>
                      <label>Image ID: {image.imageId}</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          handleImageUpload(image.imageId, event)
                        }
                      />
                      {imageData && (
                        <img
                          src={imageData[image.imageId]?.imageUrl}
                          alt={`Image ${image.imageId}`}
                          style={{ maxWidth: "200px" }}
                        />
                      )}
                    </div>
                  ))}
                  <h4>For age</h4>
                  <select
                    value={ageId}
                    onChange={(e) => setAgeId(Number(e.target.value))}
                  >
                    {ageOptions.map((option) => (
                      <option key={option.id} value={option.id}>
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
                      <option key={option.id} value={option.id}>
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
                      <option key={option.brandId} value={option.brandId}>
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
                  {errors.price && (
                    <p style={{ color: "red" }}>{errors.price}</p>
                  )}

                  <h4>stock</h4>
                  <input
                    type="number"
                    name="txtstock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />
                  {errors.stock && (
                    <p style={{ color: "red" }}>{errors.stock}</p>
                  )}

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
                  {errors.description && (
                    <p style={{ color: "red" }}>{errors.description}</p>
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

export default UpdateProduct;
