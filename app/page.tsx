'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import CartSidebar from '@/components/CartSidebar'
import ProductCard from '@/components/ProductCard'
import InlineCart from '@/components/InlineCart'
import { products, categories } from '@/lib/products'
import type { Category } from '@/lib/products'

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>('todos')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'todos' || p.category === activeCategory
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [search, activeCategory])

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} search={search} onSearch={setSearch} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />

      <main>
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-10 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            <div className="hidden md:block flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" aria-hidden width={100} height={100} style={{ objectFit: 'contain', display: 'block' }} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-navy-700">
                Desechables y Plasticos
              </h1>
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                Material medico desechable para clinicas, hospitales y laboratorios. Abatelenguas, guantes, ropa quirurgica, RPBI y mas. Envio a todo Mexico.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {['🚚 Envio a todo Mexico', '🏥 Clinicas y laboratorios', '📦 Venta por mayoreo', '✅ Facturacion CFDI 4.0'].map(t => (
                  <span key={t} className="bg-navy-50 text-navy-700 border border-navy-100 rounded-full px-4 py-1.5 text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Catalog + Cart split */}
        <div className="max-w-7xl mx-auto flex gap-0">
          <div className="flex-1 px-6 py-8 min-w-0">
            <div className="flex gap-2 flex-wrap mb-6" role="tablist">
              {categories.map(({ id, label }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeCategory === id}
                  onClick={() => setActiveCategory(id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeCategory === id
                      ? 'bg-navy-700 text-white border-navy-700'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-brand-400 hover:text-brand-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <p className="font-medium text-gray-600 mb-1">Sin resultados para &quot;{search}&quot;</p>
                <button onClick={() => { setSearch(''); setActiveCategory('todos') }} className="text-sm text-brand-500 underline mt-2">
                  Ver todo el catalogo
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-400 mb-4">{filtered.length} productos</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="hidden lg:block w-72 flex-shrink-0 border-l border-gray-100 bg-white">
            <InlineCart />
          </div>
        </div>

        {/* Info */}
        <section className="bg-navy-800 text-white mt-8 py-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center">
            {[
              { icon: '📞', title: 'Cotizaciones', body: 'Escribenos por WhatsApp y te respondemos con precios especiales por volumen.' },
              { icon: '🏭', title: 'Venta por mayoreo', body: 'Precios preferenciales para hospitales, clinicas, laboratorios y distribuidores.' },
              { icon: '📋', title: 'Facturacion electronica', body: 'Emitimos CFDI 4.0 en cada compra. Somos proveedores verificados del sector salud.' },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <span className="text-3xl">{icon}</span>
                <h3 className="font-semibold mt-3 mb-2 text-brand-400">{title}</h3>
                <p className="text-navy-100 text-sm leading-relaxed opacity-80">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-navy-900 text-gray-400 text-sm py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-3">
          <div>
            <p className="text-white font-semibold">Desechables y Plasticos</p>
            <p className="text-xs mt-1 opacity-60">Material medico de curacion · Mexico</p>
          </div>
          <p className="text-xs text-gray-600 self-end">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
