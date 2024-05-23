import { createContext, useState, useContext, useEffect } from 'react';
import { ImageProduct,  Product } from '../../context/ShopContext';

export interface iProduct {
  quantityInStock: number;
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

interface CartContextType {
  cart: iProduct[];
  totals: { [productId: number]: number };
  addToCart: (product: Product) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  removeItems: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<iProduct[]>([]);
  const [totals, setTotals] = useState<{ [productId: number]: number }>({});

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);



  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.productId === product.productId);
    if (!existingProduct) {

      const updatedCart = ([...cart, { ...product, quantityInStock: 1 }]);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setTotals(calculateTotals(updatedCart));


    } else {
      const updatedCart = cart.map((item) =>

        item.productId === product.productId ? { ...item, quantityInStock: item.quantityInStock + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setTotals(calculateTotals(updatedCart));
    }
  };

  const incrementQuantity = (productId: number) => {

    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantityInStock: item.quantityInStock + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setTotals(calculateTotals(updatedCart));
  };


  const decrementQuantity = (productId: number) => {

    const updatedCart = cart.map((item) =>

      item.productId === productId && item.quantityInStock > 1
        ? { ...item, quantityInStock: item.quantityInStock - 1 }
        : item
    )
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart))

    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct && existingProduct.quantityInStock > 1) {
      setTotals(calculateTotals(updatedCart));
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const calculateTotals = (cart: iProduct[]) => {
    const newTotals: { [productId: number]: number } = {};
    cart.forEach((item) => {
      newTotals[item.productId] = (newTotals[item.productId] || 0) + item.price * item.quantityInStock;
    });
    return newTotals;
  };

  useEffect(() => {
    const newTotals = calculateTotals(cart);
    setTotals(newTotals);
  }, [cart]);


  const removeItems = (productId: number) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, totals, removeItems, addToCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};