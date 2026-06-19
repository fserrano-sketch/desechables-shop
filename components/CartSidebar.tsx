'use client'

import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CartSidebar({ open, onClose }: Props) {
  const { items, remove, setQty, total, count } = useCart()
  const iva = total * 0.16
  const grandTotal = total + iva

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-[360px] bg-white z-50 flex flex-col transition-transform duration-300 ease-out shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
          <div>
            <h2 className="font-semibold text-ink-900 text-base">Tu pedido</h2>
            {count > 0 && <p className="text-xs text-ink-400 mt-0.5">{count} artículo{count !== 1 ? 's' : ''}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink-50 transition-colors" aria-label="Cerrar">
            <svg className="w-4 h-4 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-ink-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-ink-900 text-sm">Carrito vacío</p>
              <p className="text-xs text-ink-400 mt-1">Agrega productos del catálogo</p>
            </div>
            <button onClick={onClose} className="text-xs font-medium text-brand-600 hover:text-brand-700 underline underline-offset-2">
              Ver catálogo
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-ink-50">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-ink-900 leading-snug line-clamp-2">{product.name}</p>
                    <p className="text-[11px] text-ink-400 mt-0.5">{product.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-ink-50 rounded-lg px-2 py-1">
                        <button onClick={() => setQty(product.id, quantity - 1)} className="w-4 h-4 flex items-center justify-center text-ink-600 hover:text-ink-900 text-sm font-medium">−</button>
                        <span className="text-xs font-semibold text-ink-900 min-w-[16px] text-center">{quantity}</span>
                        <button onClick={() => setQty(product.id, quantity + 1)} className="w-4 h-4 flex items-center justify-center text-ink-600 hover:text-ink-900 text-sm font-medium">+</button>
                      </div>
                      <span className="text-sm font-semibold text-ink-900">${(product.price * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(product.id)} className="self-start mt-0.5 text-ink-300 hover:text-ink-600 transition-colors" aria-label="Eliminar">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div className="px-6 py-5 border-t border-ink-100 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-ink-400">
                  <span>Subtotal</span><span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-ink-400">
                  <span>IVA 16%</span><span>${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-ink-900 pt-2 border-t border-ink-100">
                  <span>Total</span><span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-ink-900 hover:bg-ink-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors">
                Solicitar cotización
              </button>
              <p className="text-[11px] text-center text-ink-400">Te contactaremos para confirmar tu pedido</p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
