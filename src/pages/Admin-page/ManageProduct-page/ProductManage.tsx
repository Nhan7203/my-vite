import { useEffect, useState, swal, useNavigate } from "../../../import/import-another";
import { aProduct, ageOptions, categoryOptions } from "../../../interfaces";
import { deleteProducts, search } from "../../../apiServices/ProductServices/productServices";
import { useAllProduct } from "../../../context/ShopContext";
import { getBrand } from "../../../apiServices/BrandServices/brandServices";
import { Brand } from "../../Product-page/Product";
import HeaderMain from "../components/Header-main";
import Sidebar from "../components/Sidebar";
import "../Admin.css";
export interface ImageProduct {
  imageId: number;
  productId: number;
  imageUrl: string;
}

const ProductManage = () => {
  const { allProduct } = useAllProduct();
  const [products, setProducts] = useState<aProduct[]>(allProduct);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [forAgeId, setForAgeId] = useState<number>(0);
  const [brandId, setBrandId] = useState<number>(0);
  const [orderBy, setOrderBy] = useState("");
  const [activeOrder, setActiveOrder] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setProducts(allProduct);
  }, [allProduct]);

  const handleClickView = () => {
    setActiveTab("view-product");
    setActiveOrder("view-product");
    window.location.reload();
  };

  const handleClickAdd = (products: aProduct[]) => {
    navigate("/addproduct", { state: { productList: products } });
  };

  const handleUpdate = (product: aProduct) => {
    navigate("/updateproduct", { state: { productId: product.productId } });
  };

  const handleOrderChange = (value: string) => {
    if (value === "price") {
      setOrderBy("price");
      setActiveOrder("price");
    } else if (value === "priceDesc") {
      setOrderBy("priceDesc");
      setActiveOrder("priceDesc");
    } else if (value === "view-product") {
      setActiveOrder("view-product");
      setActiveTab("view-product");
    } else {
      setOrderBy("");
      setActiveOrder("");
      setActiveTab("");
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      swal({
        title: "Are you sure you want to delete this product?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteProducts(productId);

          if (response) {
            swal("Success!", "Product was deleted!", "success");
            setProducts(
              products.filter((product) => product.productId !== productId)
            );
          } else {
            throw new Error("Failed to delete product");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    const fetchProductsByFilter = async () => {
      const queryParams = new URLSearchParams();

      if (categoryId !== 0) {
        queryParams.append("categoryId", categoryId.toString());
      }

      if (forAgeId !== 0) {
        queryParams.append("forAgeId", forAgeId.toString());
      }

      if (brandId !== 0) {
        queryParams.append("brandId", brandId.toString());
      }

      if (orderBy === "price") {
        queryParams.append("orderBy", "price");
      } else if (orderBy === "priceDesc") {
        queryParams.append("orderBy", "priceDesc");
      }

      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }

      const response = await search(queryParams);
      setProducts(response);
    };
    fetchProductsByFilter();
  }, [brandId, categoryId, forAgeId, orderBy, searchQuery]);

  const getAgeOptionName = (ageId: number) => {
    const ageOption = ageOptions.find((option) => option.id === ageId);
    return ageOption ? ageOption.name : "";
  };

  const getCategoryOptionName = (categoryId: number) => {
    const categoryOption = categoryOptions.find(
      (option) => option.id === categoryId
    );
    return categoryOption ? categoryOption.name : "";
  };

  const getBrandOptionName = (brandId: number) => {
    const brandOption = brandList.find((option) => option.brandId === brandId);
    return brandOption ? brandOption.name : "";
  };

  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />

        <div className="main-content">
          <HeaderMain
            displayed={["search"]}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <main>
            <div>
              <div className="head-table">
                <ul>
                  <li
                    className={activeTab === "view-product" ? "active" : ""}
                    onClick={handleClickView}
                  >
                    View All
                  </li>

                  <li
                    className={activeOrder === "price" ? "active" : ""}
                    onClick={() => handleOrderChange("price")}
                  >
                    Price Low - High
                  </li>

                  <li
                    className={activeOrder === "priceDesc" ? "active" : ""}
                    onClick={() => handleOrderChange("priceDesc")}
                  >
                    Price High - Low
                  </li>
                  <li className="select-age">
                    <select
                      defaultValue={forAgeId}
                      onChange={(e) => setForAgeId(Number(e.target.value))}
                    >
                      <option value="">Select for Age</option>
                      {ageOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="select-category">
                    <select
                      defaultValue={categoryId}
                      onChange={(e) => setCategoryId(Number(e.target.value))}
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="select-brand">
                    <select
                      defaultValue={brandId}
                      onChange={(e) => setBrandId(Number(e.target.value))}
                    >
                      <option value="">Select Brand</option>
                      {brandList.map((option) => (
                        <option key={option.brandId} value={option.brandId}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li
                    className="add-product"
                    onClick={() => handleClickAdd(products)}
                  >
                    Add Product
                  </li>
                </ul>
              </div>
              <table className="table-custome">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Image</th>
                    <th>ProductId</th>
                    <th>Age</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Name</th>
                    <th>Description</th>

                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="img-table">
                          <img
                            className="img-pro"
                            src={product.imageProducts[0].imageUrl}
                            alt=""
                          />
                        </div>
                      </td>
                      <td>{product.productId}</td>
                      <td>{getAgeOptionName(product.forAgeId)}</td>
                      <td>{getBrandOptionName(product.brandId)}</td>
                      <td>{getCategoryOptionName(product.categoryId)}</td>
                      <td>{product.stock}</td>
                      <td>₫{product.price.toLocaleString()}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>

                      <td>
                        <button
                          className="Edit"
                          onClick={() => handleUpdate(product)}
                        >
                          Update
                        </button>
                      </td>

                      <td>
                        <button
                          className="Delete-product"
                          onClick={() => deleteProduct(product.productId)}
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

export default ProductManage;
