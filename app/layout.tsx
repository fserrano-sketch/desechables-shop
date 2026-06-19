import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desechables y Plásticos | Material médico desechable en México',
  description:
    'Venta de desechables de curación, material de laboratorio, ropa quirúrgica y equipo de protección. Abatelenguas, aplicadores, guantes, cubrebocas y más. Envío a todo México.',
  keywords:
    'desechables médicos, material de laboratorio, abatelenguas, aplicadores, guantes látex, cubrebocas, ropa quirúrgica, RPBI, desechables curación México',
  openGraph: {
    title: 'Desechables y Plásticos — Material médico desechable',
    description:
      'Amplio catálogo de material médico desechable para clínicas, laboratorios y hospitales. Calidad garantizada, envío a todo México.',
    type: 'website',
    locale: 'es_MX',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://desechablesyplasticos.com.mx',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'Desechables y Plásticos',
              description: 'Venta de material médico desechable y de laboratorio en México',
              url: 'https://desechablesyplasticos.com.mx',
              telephone: '',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'MX',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Catálogo de desechables médicos',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
