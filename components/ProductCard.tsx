'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md hover:border-gray-200 transition-all duration-200">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 gap-2">
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{product.unit}</p>
          <h3 className="text-xs font-semibold leading-snug text-gray-900 line-clamp-2">{product.name}</h3>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-sm font-bold text-navy-700">${product.price}</span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-navy-700 hover:bg-navy-800 text-white'
            }`}
            aria-label={`Agregar ${product.name}`}
          >
            {added ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Listo
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
