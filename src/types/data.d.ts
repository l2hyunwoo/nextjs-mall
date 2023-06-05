// 상품 카테고리
export type Category = 'shoes' | 'clothes' | 'book'

// 상품 상태
export type Condition = 'new' | 'used'

// 사용자
export type User = {
  id: number
  userName: string
  displayName: string
  email: string
  profileImageUrl: string
  description: string
}

export type Product = {
  id: number
  category: Category
  title: string
  description: string
  imageUrl: string
  blurDataUrl: string
  price: number
  condition: Condition
  owner: User
}

export type ApiContext = {
  apiRootUrl: string
}
