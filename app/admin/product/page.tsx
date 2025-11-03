'use client'
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, RefreshCcw, Edit, Trash2 } from "lucide-react";
import AddProductModal from "./AddProductModal";
import axios from "axios";
import ImageViewerModal from "./ImageViewerModal";

interface Product {
  id: number;
  name: string;
  description: string;
  category_name: string;
  subcategory_name: string;
  brand_name: string;
  unit_name: string;
  status_name: string;
  price: number;
  stock: number;
  created_at: string;
  image_urls?: string[];
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Бараа татахад алдаа:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return data;
  }, [products, search, sortField, sortOrder]);
  const handleViewImages = async (productId: number) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/productimg/${productId}`);
      setImages(res.data.map((img: any) => img.image_url));
      setImageModalOpen(true);
    } catch (err) {
      console.error("Зураг татахад алдаа:", err);
      alert("Зураг татаж чадсангүй!");
    }
  };
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("⚠️ Энэ барааг устгах уу?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/product/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error("Устгах үед алдаа:", err);
      alert("⚠️ Устгаж чадсангүй!");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">📦 Бараа бүртгэл</h2>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Хайлт хийх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={fetchProducts} variant="outline" disabled={loading}>
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            </Button>
            <Button onClick={() => { setEditData(null); setOpen(true); }} className="flex gap-2 items-center">
              <PlusCircle size={18} /> Шинэ бараа
            </Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-100 text-left">
                {/* <th className="py-3 px-4 text-sm">Зураг</th> */}
                {[
                  { key: "name", label: "Нэр" },
                  { key: "category_name", label: "Ангилал" },
                  { key: "subcategory_name", label: "Дэд ангилал" },
                  { key: "brand_name", label: "Брэнд" },
                  { key: "unit_name", label: "Нэгж" },
                  { key: "status_name", label: "Төлөв" },
                  { key: "price", label: "Үнэ (₮)" },
                  { key: "stock", label: "Үлдэгдэл" },
                  { key: "created_at", label: "Огноо" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key as keyof Product)}
                    className="py-3 px-4 cursor-pointer hover:bg-gray-200 whitespace-nowrap text-sm"
                  >
                    {col.label}{" "}
                    {sortField === col.key &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                ))}
                <th className="py-3 px-4 text-center text-sm">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">

                    <td className="py-2 px-4 text-sm">{p.name}</td>
                    <td className="py-2 px-4 text-sm">{p.category_name}</td>
                    <td className="py-2 px-4 text-sm">{p.subcategory_name}</td>
                    <td className="py-2 px-4 text-sm">{p.brand_name}</td>
                    <td className="py-2 px-4 text-sm">{p.unit_name}</td>
                    <td className="py-2 px-4 text-sm">{p.status_name}</td>
                    <td className="py-2 px-4 text-sm">{p.price.toLocaleString()}₮</td>
                    <td className="py-2 px-4 text-sm">{p.stock}</td>
                    <td className="py-2 px-4 text-sm">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewImages(p.id)}
                        >
                          🖼️
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditData(p);
                            setOpen(true);
                          }}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(p.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center py-6 text-gray-500">
                    {loading ? "Уншиж байна..." : "Бараа олдсонгүй."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
        onRefresh={fetchProducts}
        editData={editData}
      />
      <ImageViewerModal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        images={images}
      />
    </div>
  );
};

export default ProductPage;
