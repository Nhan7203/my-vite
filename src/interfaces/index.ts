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

export interface ImageProduct {
  imageId: number;
  productId: number;
  imageUrl: string;
  imageFile?: File | null
}

export interface ShopContextType {
  allProduct: aProduct[];
}

export interface Blog {
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