
import { createContext, useState, useContext, useEffect } from 'react';
import * as productitems from "../apiServices/productItems";

export interface aProduct {
  productId: number;
  forAgeId: number;
  categoryId: number;
  brandId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageProducts: ImageProduct[];
  isActive: boolean;
}

export interface ImageProduct {
  imageId: number
  productId: number
  imageUrl: string
  imageFile?: File | null
}

interface ShopContextType {
  allProduct: aProduct[];
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useAllProduct = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allProduct, setAllProduct] = useState<aProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await productitems.add();
      setAllProduct(result);
    };
    fetchData();
  }, []);


  return (
    <ShopContext.Provider value={{ allProduct }}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;