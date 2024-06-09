import { useEffect, useState } from "react";
import { aProduct } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { useAllProduct } from "../../context/ShopContext";
import * as brandd from "../../apiServices/getBrand";
import "./Admin.css";
import { Brand } from "../Product-page/Product";
import * as searchServices from "../../apiServices/searchServices";
import swal from "sweetalert";

export interface ImageProduct {
  imageId: number;
  productId: number;
  imageUrl: string;
}

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await brandd.getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setProducts(allProduct);
  }, [allProduct]);

  const handleClickView = () => {
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
    } else {
      setOrderBy("");
      setActiveOrder("");
    }
  };

  const deleteProduct = async (productId: number) => {
    console.log(productId);
    try {
      swal({
        title: "Are you sure you want to delete this product?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await fetch(
            `https://localhost:7030/api/Products/Delete?id=${productId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
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

      const response = await searchServices.search(queryParams);
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
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
            <div>
              <div className="head-table">
                <ul>
                  <li className="view-product" onClick={handleClickView}>
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
                  <li>
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
                  <li>
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
                  <li>
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
                      <td>${product.price.toLocaleString()}</td>
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
