import { createContext, useState, useContext, useEffect } from "react";
import { aProduct, ShopContextType } from "../interfaces";
import { getProduct } from "../apiServices/ProductServices/productServices";

// export const ShopContext = createContext<ShopContextType | undefined>(undefined);



export const ShopContext = createContext<ShopContextType>({
  allProduct: [],
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAllProduct = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allProduct, setAllProduct] = useState<aProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProduct();
      setAllProduct(result);
    };
    fetchData();
  }, []);

  return (
    <ShopContext.Provider value={{ allProduct }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
