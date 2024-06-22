/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Notification {
  notificationId: number;
  userId: number;
  header: string;
  content: string;
  isRead: boolean;
  isRemoved: boolean;
  createdDate: Date;
}

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

export interface AllUsers {
  userId: number;
  roleId: number;
  email: string;
  phoneNumber: number;
  address: string;
  isActive: boolean;
  password: string;
  name: string;
}

export interface User {
  userId: number;
  roleId: number;
  email: string;
  phoneNumber: number;
  address: string;
  isActive: boolean;
  password: string;
  name: string;
}

export interface ImageProduct {
  imageId: number;
  productId: number;
  imageUrl: string;
}

export interface ShopContextType {
  allProduct: aProduct[];
}

export interface aBlog {
  blogId: number;
  title: string;
  content: string;
  author: string;
  productId: number;
  uploadDate: Date;
  updateDate: Date;
  view: number;
  like: number;
  imageUrl: string;
}

export interface iProduct {
  productId: number;
  name: string;
  imageProducts: ImageProduct[];
  price: number;
  quantity: number;
  stock: number;
  isActive: boolean;
}

export interface CartContextType {
  cart: iProduct[];
  totals: { [productId: number]: number };
  addToCart: (product: aProduct) => void;
  addToCart2: (
    productId: aProduct,
    quantity: number,
    actionType: string
  ) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  removeItems: (productId: number) => void;
}

export interface aOrder {
  orderId: number;
  userId: number;
  voucherId: number;
  orderDate: string;
  address: string;
  paymentMethod: string;
  shippingMethodId: number;
  orderStatus: string;

  orderDetails: {
    productId: number;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
}

export interface Order {
  orderId: number;
  voucherId: number;
  userId: number;
  orderDate: string;
  address: string;
  paymentMethod: string;
  shippingMethodId: number;
  total: number;
}

export interface aProductReview {
  userId: number;
  orderDetailId: number;
  productId: number;
  date: Date;
  rating: number;
  comment: string;
}

export interface RatingInfo {
  averageRating: number;
  totalRating: number;
  reviewCount: number;
}

export interface OrderDetail {
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

export interface ReviewData {
  userId: any;
  orderDetailId: any;
  productId: number | undefined;
  date: string;
  rating: number;
  comment: string;
  isRated: boolean;
}

export interface AllVouchers {
  voucherId: number;
  name: string;
  discountValue: number;
  discountType: string
}

export interface Voucher {
  voucherId: number
  name: string;
  discountValue: number;
  discountType: string
}

export const ageOptions = [
  { id: 1, name: "0 - 6 Month" },
  { id: 2, name: "6 - 12 Month" },
  { id: 3, name: "0 - 1 Year" },
  { id: 4, name: "1 - 2 year" },
  { id: 5, name: "+2 year" },
];

export const categoryOptions = [
  { id: 1, name: "Powdered milk" },
  { id: 2, name: "Nut milk" },
  { id: 3, name: "Nutritional drinks" },
  { id: 4, name: "Fresh milk, Yogurt" },
];

export const shippingMethodOptions = [
  { id: 1, price: "30,000" },
  { id: 2, price: "50,000" },
  { id: 3, price: "120,000" },
];

export const roleOptions = [
  { id: 1, role: "User" },
  { id: 2, role: "Staff" },
  { id: 3, role: "Admin" },
];
