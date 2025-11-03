"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const BubbleCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://urnukh.vercel.app/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Category татахад алдаа:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-8 justify-items-center">
        {categories.map((cat) => (
          <Link
            key={cat.category_id}
            href={`/category/${cat.category_id}`}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Icon circle */}
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center transition group-hover:bg-gray-200">
              <Image
                src={`http://localhost:4000${cat.category_image}`}
                alt={cat.category_name}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* Category name */}
            <p className="mt-3 text-sm text-gray-700 text-center font-medium group-hover:text-gray-900">
              {cat.category_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BubbleCategory;
