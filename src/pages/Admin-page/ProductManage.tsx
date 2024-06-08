import { useEffect, useState } from "react";
//import * as productitems from "../../apiServices/productItems";
import { aProduct } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { useAllProduct } from "../../context/ShopContext";
import * as brandd from "../../apiServices/getBrand";
import "./Admin.css";
import { Brand } from "../Product-page/Product";

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

  const handleClickAdd = (products: aProduct[]) => {
    navigate("/addproduct", { state: { productList: products } });
  };

  const handleUpdate = (product: aProduct) => {
    navigate("/updateproduct", { state: { productId: product.productId } });
  };

  const deleteProduct = async (productId: number) => {
    console.log(productId);
    try {
      await fetch(
        `https://localhost:7030/api/Products/Delete?id=${productId}`,
        {
          method: "DELETE",
        }
      );

      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getAgeOptionName = (ageId: number) => {
    const ageOption = ageOptions.find((option) => option.id === ageId);
    return ageOption ? ageOption.name : '';
  };

  const getCategoryOptionName = (categoryId: number) => {
    const categoryOption = categoryOptions.find((option) => option.id === categoryId);
    return categoryOption ? categoryOption.name : '';
  };
  
  const getBrandOptionName = (brandId: number) => {
    const brandOption = brandList.find((option) => option.brandId === brandId);
    return brandOption ? brandOption.name : '';
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
            <div>
              <div className="head-table">
                <ul>
                  <li className="view-product">View Product</li>
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
      </body>
    </>
  );
};

export default ProductManage;
