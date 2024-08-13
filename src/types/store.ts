import { UserSlice } from "@/store/user-slice"
import { CartSlice } from "@/store/cart-slice";
export type Store = UserSlice & CartSlice;