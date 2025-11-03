'use client';

import React, { useState, useEffect } from 'react';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import { Plus } from 'lucide-react';
import CategoryTable from './categoryTable';
import BackButton from '@/components/BackButton';
import { Category } from "./categoryTable";
// interface Category {
//   id: number;
//   name: string;
//   description?: string;
//   image_url?: string;
// }

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await fetch("http://localhost:4000/api/category", {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      const formatted: Category[] = data.map((c: any) => ({
        category_id: c.id,
        category_name: c.name,
        category_image: c.image_url,
        description: c.description,
        subcategories: c.subcategories || [],
      }));

      setCategories(formatted);
      // setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (formData: FormData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch('http://localhost:4000/api/category', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData, // ← FormData илгээнэ
      });

      if (!res.ok) throw new Error('Ангилал нэмэхэд алдаа гарлаа');
      setOpenModal(false);
      await fetchCategories(); // жагсаалтаа дахин татах
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (cat: Category) => {
    setEditCategory(cat);
    setEditModalOpen(true);
  };
  // Edit-ийг backend руу хадгалах
  const handleUpdateCategory = async (id: number, formData: FormData) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const res = await fetch(`http://localhost:4000/api/category/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${user.token}` },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setCategories(prev => prev.map(c => (c.category_id === id ? data : c)));
    } else {
      alert(data.message || 'Ангилал засахад алдаа гарлаа');
    }
  };
  return (
    <div className="w-[calc(100vw-300px)] p-4">
      <div className="flex justify-between items-center bg-white sticky top-0 z-10 p-2 mb-4">
        <BackButton text="Буцах" link="/admin/dashboard" />
        <button
          className="bg-[#4c9a2a] hover:opacity-90 text-white font-bold py-2 px-4 rounded text-xs flex items-center gap-2"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={15} /> Нэмэх
        </button>
      </div>

      <CategoryTable categories={categories}
        onEdit={handleEditClick}
        // onDelete={handleDeleteCategory} 
        onDelete={async (id) => {
          const confirmed = window.confirm('Устгах уу?');
          if (!confirmed) return;
          try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch(`http://localhost:4000/api/category/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${user.token}` },
            });
            if (!res.ok) {
              const error = await res.json();
              return alert(error.message || 'Устгах үед алдаа гарлаа');
            }
            setCategories((prev) => prev.filter((cat) => cat.category_id !== id));
            alert('Амжилттай устлаа');
          } catch (err) {
            alert('Серверийн алдаа');
          }
        }} />
      <EditCategoryModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateCategory}
        category={editCategory}
      />
      <AddCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={
          handleAddCategory}
      />
    </div>
  );
};

export default CategoryPage;








