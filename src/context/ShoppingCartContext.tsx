import { createContext, ReactNode, useContext, useState } from "react"

const ShoppingCartContext = createContext(())
export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps ={
    children: ReactNode
}
type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeFromCart: (id: number) => number
}

export function ShoppingCartProvider ({children}: ShoppingCartProviderProps){
    const [cartItems, setCartItems] = useState([ ])
return (
    <ShoppingCartContext.Provider value={{}}>
{children}
    </ShoppingCartContext.Provider>

)
}