export interface Product {
  productId: number
  forAgeId: number
  categoryId: number
  brandId: number
  name: string
  description: string
  price: number
  stock: number
  imageProducts: ImageProduct[]
  isActive: boolean
}

export interface ImageProduct {
  imageId: number
  productId: number
  imageUrl: string
}
