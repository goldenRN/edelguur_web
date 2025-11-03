

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [sort, setSort] = useState('new');
  const [filter, setFilter] = useState({
    discounted: false,
    featured: false,
    bestseller: false,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/category/${id}`);
      setProducts(res.data.products);
      setCategoryName(res.data.category_name);
    } catch (err) {
      console.error('Бараа татахад алдаа:', err);
    }
  };

  useEffect(() => {
    if (id) fetchProducts();
  }, [id]);

  // 🧮 Sort function
  const sortedProducts = [...products].sort((a, b) => {
  if (sort === 'new') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  if (sort === 'old') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  if (sort === 'price-asc') return a.price - b.price;
  if (sort === 'price-desc') return b.price - a.price;
  return 0;
});

//   const sortedProducts = [...products].sort((a, b) => {
//     // if (sort === 'new') return new Date(b.created_at) - new Date(a.created_at);
//     // if (sort === 'old') return new Date(a.created_at) - new Date(b.created_at);
//     if (sort === 'price-asc') return a.price - b.price;
//     if (sort === 'price-desc') return b.price - a.price;
//     return 0;
//   });

  // 🧩 Filtered list
  const filteredProducts = sortedProducts.filter((p) => {
    if (filter.discounted && !p.discount_price) return false;
    if (filter.featured && !p.is_featured) return false;
    if (filter.bestseller && !p.is_bestseller) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto text-black">
      {/* --- Sidebar filters --- */}
      <aside className="w-64 p-6 border-r border-gray-800 space-y-6">
        <div>
          <input
            type="text"
            placeholder="Нэрээр хайх..."
            className="w-full px-3 py-2 bg-gray-900 rounded text-sm placeholder-gray-400 outline-none"
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-300 mb-2">АНГИЛАЛ</h3>
          <div className="space-y-2 text-gray-400">
            <p className="hover:text-white cursor-pointer">Бүх бүтээгдэхүүн</p>
            <p className="hover:text-white cursor-pointer">Jersey</p>
            <p className="hover:text-white cursor-pointer">Lifestyle</p>
            <p className="hover:text-white cursor-pointer">Accessories</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-300 mb-2">БУСАД</h3>
          <div className="space-y-2 text-gray-400 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filter.discounted}
                onChange={() =>
                  setFilter({ ...filter, discounted: !filter.discounted })
                }
              />
              Хямдралтай
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filter.featured}
                onChange={() =>
                  setFilter({ ...filter, featured: !filter.featured })
                }
              />
              Онцлох
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filter.bestseller}
                onChange={() =>
                  setFilter({ ...filter, bestseller: !filter.bestseller })
                }
              />
              Бестселлер
            </label>
          </div>
        </div>
      </aside>

      {/* --- Main content --- */}
      <main className="flex-1 p-10">
        {/* Breadcrumb + Sort */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-400 text-sm">
            Нүүр / <span className="text-white">{categoryName}</span>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 text-sm"
          >
            <option value="new">Шинэ нь эхэндээ</option>
            <option value="old">Хуучин нь эхэндээ</option>
            <option value="price-asc">Үнэ өсөхөөр</option>
            <option value="price-desc">Үнэ буурахаар</option>
          </select>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">Бараа олдсонгүй.</p>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <Image
                  src={
                    p.images?.[0]?.image_url
                      ? p.images[0].image_url
                      : '/img/no-image.png'
                  }
                  alt={p.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-56"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{p.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {p.price.toLocaleString()}₮
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

