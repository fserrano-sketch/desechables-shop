'use client'

import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

export default function InlineCart() {
  const { items, remove, setQty, total, count } = useCart()
  const iva = total * 0.16
  const grandTotal = total + iva

  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 text-sm">Tu carrito</h2>
        {count > 0 && <span className="text-xs text-gray-400">{count} artículo{count !== 1 ? 's' : ''}</span>}
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center text-gray-400">
          <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-xs">Agrega productos<br />del catálogo</p>
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto space-y-3 pr-1">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-2 items-start">
                <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 leading-snug line-clamp-2">{product.name}</p>
                  <p className="text-xs text-brand-600 font-semibold mt-0.5">${(product.price * quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <button onClick={() => setQty(product.id, quantity - 1)} className="w-5 h-5 rounded border border-gray-200 text-xs flex items-center justify-center hover:bg-gray-50">−</button>
                    <span className="text-xs font-semibold w-5 text-center">{quantity}</span>
                    <button onClick={() => setQty(product.id, quantity + 1)} className="w-5 h-5 rounded border border-gray-200 text-xs flex items-center justify-center hover:bg-gray-50">+</button>
                  </div>
                </div>
                <button onClick={() => remove(product.id)} className="text-gray-300 hover:text-gray-500 mt-0.5" aria-label="Eliminar">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-400"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs text-gray-400"><span>IVA 16%</span><span>${iva.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-1 border-t border-gray-100"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
            <button className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-3 rounded-xl mt-2 transition-colors">
              Solicitar cotización
            </button>
            <p className="text-[11px] text-center text-gray-400">Te contactaremos para confirmar</p>
          </div>
        </>
      )}
    </div>
  )
}
