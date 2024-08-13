import { Button } from "./components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./components/ui/card"
import { PRODUCTS_DATA } from "@/lib/mockData"
import { useStore } from "./store/store"
import { ChangeQtyButtons } from "./shared/ChangeQtyButton"
import { Cart } from "./shared/Cart"
import { User } from "./shared/User"
export const App = () => {

  const addProduct = useStore((state) => state.addProduct)
  const cartProducts = useStore((state) => state.products)

  return (
    <div className="flex justify-center w-screen h-screen overflow-x-hidden dark bg-background">
      <main className="space-y-2 dark h-full bg-background max-w-sm mt-2 grow">
        <div className="flex justify-between">
          <User />
          <Cart />
        </div>
        <h1 className="text-2xl">Products:</h1>
        <div className="space-y-2">
          {
            PRODUCTS_DATA.map((product) => (
              <Card key={product.id}>
                <CardHeader>{product.title}</CardHeader>
                <CardContent>{product.price}$</CardContent>
                <CardFooter>
                  {
                    cartProducts.find((item) => item.id === product.id)
                      ?
                      <ChangeQtyButtons productId={product.id} />
                      :
                      <Button onClick={() => addProduct(product)} variant='default'>
                        Add to Cart
                      </Button>
                  }
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </main>
    </div>
  )
}