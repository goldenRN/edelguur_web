// components/brand/BrandList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Search, ImageIcon } from 'lucide-react';

interface Brand {
    id: number;
    name: string;
    description?: string;
    logo_url?: string; // хэрэв logo байгаа бол
}

const PAGE_SIZE = 12;

export default function BrandList() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:4000/api/brand');
            const data = await res.json();
            setBrands(data || []);
        } catch (err) {
            console.error('Brand fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = brands.filter((b) =>
        b.name.toLowerCase().includes(q.trim().toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <section className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Брэндүүд</h2>

                <div className="flex items-center gap-2">
                    <p>Бүгдийг харах</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Ачааллаж байна...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {pageItems.map((b) => (
                            <div key={b.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border">
                                        {b.logo_url ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={b.logo_url} alt={b.name} className="object-contain w-full h-full" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <ImageIcon size={28} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-800 truncate">{b.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{b.description || 'Тайлбар алга'} </p>
                                    </div>
                                </div>

                                {/* <div className="mt-4 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">ID: {b.id}</span>
                                    <button
                                        className="text-emerald-600 hover:underline text-sm"
                                        onClick={() => {
                                            // дараагийн алхам: edit view нээж болно
                                            window.alert(`Edit брэнд: ${b.name} (id=${b.id})`);
                                        }}
                                    >
                                        Засах
                                    </button>
                                </div> */}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className={`px-3 py-1 rounded-md ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}
                        >
                            Өмнөх
                        </button>

                        <div className="px-3 py-1 rounded-md bg-white border">
                            {page} / {totalPages}
                        </div>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className={`px-3 py-1 rounded-md ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white border'}`}
                        >
                            Дараах
                        </button>
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-8 text-gray-500">Брэнд олдсонгүй</div>
                    )}
                </>
            )}
        </section>
    );
}
