

'use client'

import { useEffect, useState } from 'react'
import { LucideShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext';

interface Product {
  id: number
  name: string
  price?: number
  brand_name?: string
  category_name?: string
  images?: { id: number; image_url: string }[]
}

interface Props {
  type: 'latest' | 'popular' | 'all'
  title: string
}

export default function ProductGrid({ type, title }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://urnukh-git-main-goldens-projects-4c53454f.vercel.app/api/product/${type}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json" // хэрвээ JWT шаардлагатай бол
      },
      credentials: "include"
    })
    const json = await res.json()
    console.log("json", json)
    setProducts(Array.isArray(json) ? json : json.data || [])
  } catch (err) {
    console.error(`${type} бараа татахад алдаа:`, err)
    setProducts([]) // safety
  } finally {
    setLoading(false)
  }
}

fetchProducts()
  }, [type])

if (loading) {
  return <div className="text-center py-10 text-gray-500">Ачааллаж байна...</div>
}

return (
  <section className="py-12 max-w-7xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products?.map((product) => {
        const imageUrl =
          product.images && product.images.length > 0
            ? product.images[0].image_url
            : '/no-image.png'

        return (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="rounded-xl border border-gray-200 shadow hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col bg-white">
              <div className="w-full p-1">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-100">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="px-3 py-3 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-normal text-gray-800 text-base line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {product.brand_name || ''} {product.category_name ? `• ${product.category_name}` : ''}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-[#1d3b86]">
                    {product.price ? `${product.price.toLocaleString()}₮` : 'Үнэ тодорхойгүй'}
                  </span>
                  <button
                    type="button"
                    className="bg-[#d49943] hover:bg-[#1d3b86] text-white p-2 rounded-full shadow-md transition"
                    onClick={(e) => {
                      e.preventDefault() // 👈 Link чиглэлд явахгүй
                      e.stopPropagation()
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price ?? 0,
                        image_url: imageUrl,
                        quantity: 1,
                      })
                    }}
                  >
                    <LucideShoppingBasket size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  </section >
)
}

