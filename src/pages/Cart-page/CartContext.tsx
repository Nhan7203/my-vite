import { createContext, useState, useContext, useEffect } from "react";
import { getUserIdFromToken } from "../../utils/jwtHelper";
import { aProduct, iProduct } from "../../interfaces";
import { CartContextType } from "../../interfaces"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

interface CartData {
  [orderId: string]: iProduct[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

//--------------------------------------------------------------------------------------------------------
const token = localStorage.getItem("token");

const userIdFromToken = token ? getUserIdFromToken(token) : null;

  const userId = userIdFromToken;
//----------------------------------------------------------------------------------------------------------
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<iProduct[]>([]);
  const [totals, setTotals] = useState<{ [productId: number]: number }>({});

  //------------------------------------------------- localStorage orderData ------------------------------------------
  useEffect(() => {
    if (userId && cart.length > 0) {
      const cartData: CartData = {
        ...JSON.parse(localStorage.getItem("storedCart") || "{}"),
        [userId]: cart,
      };
      localStorage.setItem("storedCart", JSON.stringify(cartData));
    }
  }, [cart]);


  useEffect(() => {
    const cartData: CartData = JSON.parse(
      localStorage.getItem("storedCart") || "{}"
    );
    if (userId) {
      setCart(cartData[userId] || []);
    } else {
      setCart([]);
    }
  }, []);

  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cart");

  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);

  //----------------------------------------------------------------------------------------------------------------------

  const [isToastVisible, setIsToastVisible] = useState(false);

  const addToCart = (aProduct: aProduct) => {
    const existingProduct = cart.find(
      (item) => item.productId === aProduct.productId
    );

    if (!existingProduct) {
      const updatedCart = [
        ...cart,
        {
          productId: aProduct.productId,
          name: aProduct.name,
          imageProducts: aProduct.imageProducts,
          price: aProduct.price,
          quantity: 1,
          stock: aProduct.stock,
          isActive: aProduct.isActive,
        },
      ];

      setCart(updatedCart);
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      setTotals(calculateTotals(updatedCart));
      showToast(aProduct.name);
    } else {
      const updatedCart = cart.map((item) =>
        item.productId === aProduct.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      setTotals(calculateTotals(updatedCart));

      if (!isToastVisible) {
        showToast(aProduct.name);
      }
    }
  };

  const showToast = (productName: string) => {
    setIsToastVisible(true);
    toast.success(`${productName} đã được thêm vào giỏ hàng!`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      onClose: () => setIsToastVisible(false),
    });
  };

  const addToCart2 = (
    aProduct: aProduct,
    quantity: number,
    actionType: string
  ) => {
    const existingProduct = cart.find(
      (item) => item.productId === aProduct.productId
    );
    if (!existingProduct) {
      const updatedCart = [
        ...cart,
        {
          productId: aProduct.productId,
          name: aProduct.name,
          imageProducts: aProduct.imageProducts,
          price: aProduct.price,
          quantity: quantity,
          stock: aProduct.stock,
          isActive: aProduct.isActive,
        },
      ];

      setCart(updatedCart);
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      setTotals(calculateTotals(updatedCart));
    } else {
      const updatedCart = cart.map((item) =>
        item.productId === aProduct.productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      setTotals(calculateTotals(updatedCart));
    }
    if (actionType == "add")
      toast.success(`Sản phẩm đã được thêm vào giỏ hàng!`, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  const incrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotals(calculateTotals(updatedCart));
  };

  const decrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));

    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct && existingProduct.quantity > 1) {
      setTotals(calculateTotals(updatedCart));
    }

    // localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotals = (cart: iProduct[]) => {
    const newTotals: { [productId: number]: number } = {};
    cart.forEach((item) => {
      newTotals[item.productId] =
        (newTotals[item.productId] || 0) + item.price * item.quantity;
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

    const cartData: CartData = JSON.parse(
      localStorage.getItem("storedCart") || "{}"
    );
    delete cartData[userId];
    localStorage.setItem("storedCart", JSON.stringify(cartData));

    // localStorage.removeItem("cart");
    // localStorage.setItem("cart", JSON.stringify(updatedCart));

    const storedQuantitiesStr = localStorage.getItem("currentQuantities");
    const storedQuantities = storedQuantitiesStr
      ? JSON.parse(storedQuantitiesStr)
      : {};
    delete storedQuantities[productId];

    localStorage.setItem("currentQuantities", JSON.stringify(storedQuantities));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totals,
        removeItems,
        addToCart,
        addToCart2,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
