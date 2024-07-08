import { useEffect, useState, swal, useNavigate } from "../../../import/import-another";
import { aProduct, ageOptions, categoryOptions } from "../../../interfaces";
import { useAllProduct } from "../../../context/ShopContext";
import { useLocation } from "react-router-dom";
import { getBrand } from "../../../apiServices/BrandServices/brandServices";
import HeaderMain from "../components/Header-main";
import Sidebar from "../components/Sidebar";
import { createProduct } from "../../../apiServices/ProductServices/productServices";


export interface Brand {
  brandId: number;
  name: string;
  imageBrandUrl: string;
}

export interface ImageProduct {
  imageUrl: string;
  imageFile: File | null;
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
  const [imageUrls, setImageUrls] = useState<{
    [key: number]: ImageProduct;
  }>({});
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [products] = useState<aProduct[]>(productList);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    imageUrls: "",
  });
  const maxProductId = Math.max(
    ...products.map((product) => product.productId)
  );
  const product = allProduct.find((e) => e.productId === maxProductId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);

  const handleImageUpload = (
    imageIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageUrls((prevImageData) => ({
          ...prevImageData,
          [imageIndex]: {
            imageFile: file,
            imageUrl,
          },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrls((prevImageData) => ({
        ...prevImageData,
        [imageIndex]: {
          imageFile: null,
          imageUrl: "",
        },
      }));
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const error = {
      name: "",
      description: "",
      stock: "",
      price: "",
      imageUrls: "",
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

    if (stock === undefined || stock === 0) {
      error.stock = "pls enter stock";
      error.check = true;
    }

    if (price === undefined || price === 0) {
      error.price = "pls enter price";
      error.check = true;
    }

    // Kiểm tra từng phần tử trong imageUrls
    if (Object.keys(imageUrls).length !== 4) {
      error.imageUrls = "all image is required!";
      error.check = true;
    } else {
      let isAnyImageUploaded = false;
      for (const key in imageUrls) {
        // Nếu giá trị ban đầu là một giá trị falsy (false, 0, "", null, undefined, hoặc NaN), thì kết quả của !! sẽ là false.
        if (
          !(
            !!imageUrls[key] &&
            (!!imageUrls[key].imageFile || !!imageUrls[key].imageUrl)
          )
        ) {
          isAnyImageUploaded = true;
          break;
        }
      }

      // Nếu không có bất kỳ hình ảnh nào được tải lên, đặt lỗi và kiểm tra thành true
      if (isAnyImageUploaded) {
        error.imageUrls = "all image is required!";
        error.check = true;
      }
    }

    setErrors(error);
    if (error.check) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("forAgeId", ageId.toString());
    formData.append("brandId", brandId.toString());
    formData.append("categoryId", categoryId.toString());
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());

    for (const key in imageUrls) {
      formData.append(
        `ImageProducts[${key}].ProductId`,
        (products.length + 1).toString()
      ); // Dummy ProductId since it's a new product
      const imageFile = imageUrls[key].imageFile;
      if (imageFile) {
        formData.append(`ImageProducts[${key}].ImageFile`, imageFile);
      }
    }
    try {
      const response = await createProduct(formData);

      if (response) {
        swal("Success", "Product information created successfully!", "success");
        navigate("/manage-product");
      } else {
        console.log(response);
        swal("Error", "Failed to create product information.", "error");
      }
    } catch (error) {
      swal(
        "Error",
        "Error occurred during creating product information.",
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
                  <h4>ProductId: {products.length + 1}</h4>

                  <h4>Image</h4>

                  {product?.imageProducts.slice(0, 4).map((_, index) => (
                    <div key={index}>
                      <label>Image {index + 1}: </label>
                      <input
                        type="file"
                        onChange={(event) => handleImageUpload(index, event)}
                      />

                      {imageUrls[index] ? (
                        <img
                          src={imageUrls[index].imageUrl}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth: "200px" }}
                        />
                      ) : null}
                    </div>
                  ))}
                  <div>
                    {errors.imageUrls && (
                      <p style={{ color: "red" }}>{errors.imageUrls}</p>
                    )}
                  </div>

                  <h4>For age</h4>
                  <select
                    defaultValue={ageId}
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
                    defaultValue={categoryId}
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
                    defaultValue={brandId}
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
                    min={0.0}
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
                    min={0}
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

export default AddProduct;
