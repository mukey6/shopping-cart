import { createContext, ReactNode, useContext, useState } from "react"
import {ShoppingCart} from '../component/ShoppingCart'
const ShoppingCartContext = createContext({}as ShoppingCartContext)
import {useLocalStorage} from '../hooks/useLocalStorage'
export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps ={
    children: ReactNode
}
type CartItem = {
     id: number,
     quantity: number
}
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

export function ShoppingCartProvider ({children}: ShoppingCartProviderProps){
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("Shopping-Cart", [ ])
    const cartQuantity = cartItems.reduce((quantity, item)=>
    item.quantity + quantity, 0)
    const [isOpen, setIsOpen] = useState(false)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }
      function decreaseQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id)?.quantity === 1) {
            return currItems.filter(item => item.id !== id)
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }
    
      function removeFromCart(id: number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
      }
return (
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseQuantity, removeFromCart, cartItems, cartQuantity, openCart,closeCart}}>
{children}
<ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>

)
}
 