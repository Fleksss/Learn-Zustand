import { CartProduct } from "@/types/cartProduct"
import { Product } from "@/types/product"
import { StateCreator } from "zustand"

type CartState = {
  products: CartProduct[],
  total: number,
}

type CartActions = {
  addProduct: (product: Product) => void,
  removeProduct: (productId: string) => void,
  incQty: (productId: string) => void,
  decQty: (productId: string) => void,
  getProductById: (productId: string) => CartProduct | undefined,
  setTotal: (total: number) => void,
  reset: () => void,
}

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
}

export type UserSlice = CartState & CartActions

export const createCartSlice: StateCreator<CartSlice, [['zustand/immer', never]], [], CartSlice> = (set, get) => ({
  ...initialState,
  addProduct: (product) => set((state) => {
    state.products.push({ ...product, qty: 1 })
  }),
  removeProduct: (productId) => set((state) => {
    state.products = state.products.filter((p) => p.id !== productId)
  }),
  incQty: (productId) => set((state) => {
    const product = state.products.find((p) => p.id === productId)
    if (product) {
      product.qty++
    }
  }),
  decQty: (productId) => set((state) => {
    const foundIndex = state.products.findIndex((p) => p.id === productId)
    if (foundIndex !== -1 && state.products[foundIndex].qty === 1) {
      state.products.splice(foundIndex, 1)
    } else {
      state.products[foundIndex].qty--
    }
  }),

  getProductById: (productId) => {
    return get().products.find((p) => p.id === productId)
  },

  setTotal: (total) => set((state) => {
    state.total = total
  }),
  reset: () => set(initialState),
})