"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CategoryPage = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Category татахад алдаа:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full mx-auto m-2">
      <div className="divide-y divide-gray-100 bg-white shadow-sm rounded-lg">
        {categories.map((cat) => (
          <div key={cat.category_id} className="p-3">
            {/* 🟢 Category мөр */}
            <div className="flex items-center gap-3">
              <Image
                src={`http://localhost:4000${cat.category_image}`}
                alt={cat.category_name}
                width={44}
                height={44}
                className="rounded-md object-cover"
              />
              <span className="text-gray-900 text-base">
                {cat.category_name}
              </span>
            </div>

            {/* 🔵 Subcategory жагсаалт */}
            {cat.subcategories?.length > 0 && (
              <div className="mt-2 ml-14 text-sm text-gray-600">
                {cat.subcategories.map((sub: any) => (
                  <div
                    key={sub.id}
                    className="hover:text-blue-600 transition p-1 cursor-pointer"
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
