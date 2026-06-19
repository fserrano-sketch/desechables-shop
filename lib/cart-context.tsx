'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: number }
  | { type: 'SET_QTY'; productId: number; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.product.id !== action.productId) }
    case 'SET_QTY': {
      if (action.quantity <= 0) {
        return { items: state.items.filter(i => i.product.id !== action.productId) }
      }
      return {
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  add: (product: Product) => void
  remove: (productId: number) => void
  setQty: (productId: number, quantity: number) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const total = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const count = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        add: (product) => dispatch({ type: 'ADD', product }),
        remove: (productId) => dispatch({ type: 'REMOVE', productId }),
        setQty: (productId, quantity) => dispatch({ type: 'SET_QTY', productId, quantity }),
        clear: () => dispatch({ type: 'CLEAR' }),
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
