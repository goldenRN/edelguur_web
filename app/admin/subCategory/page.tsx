'use client';

import React, { useState, useEffect } from 'react';
import AddSubCategoryModal from './AddSubCategoryModal';
import EditSubCategoryModal from './EditSubCategoryModal';
import { Plus } from 'lucide-react';
import SubCategoryTable from './SubCategoryTable';
import BackButton from '@/components/BackButton';
import { describe } from 'node:test';
import { SubCategory } from '@/app/types/subcategory';

interface Category {
  id: number,
  name: string,
  description: string,
  image_url: string,
  created_at: string
}
const SubCategoryPage: React.FC = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState<SubCategory | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/category");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/subcategory");
      const data = await res.json();
      setSubCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (data: { name: string; description?: string; category_id: number }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch('http://localhost:4000/api/subcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data), // 👈 Modal-аас ирсэн JSON
      });

      if (!res.ok) throw new Error('Дэд ангилал нэмэхэд алдаа гарлаа');
      else {
        const data = await res.json();
        setSubCategories(prev => [...prev, data]);
      }
      setOpenModal(false);
      await fetchCategories(); // жагсаалтаа дахин татах
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (cat: SubCategory) => {
    setEditSubCategory(cat);
    setEditModalOpen(true);
  };

  const handleUpdateCategory = async (id: number, data: { name: string; description?: string; category_id: number }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const res = await fetch(`http://localhost:4000/api/subcategory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    const updated = await res.json();
    if (res.ok) {
      setSubCategories(prev => prev.map(c => (c.id === id ? updated : c)));
      // alert('Амжилттай засагдлаа ✅');
    } else {
      alert(updated.message || 'Дэд ангилал засахад алдаа гарлаа');
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

      <SubCategoryTable subCategories={subCategories}
        onEdit={handleEditClick}
        // onDelete={handleDeleteCategory} 
        onDelete={async (id) => {
          const confirmed = window.confirm('Устгах уу?');
          if (!confirmed) return;
          try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch(`http://localhost:4000/api/subcategory/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${user.token}` },
            });
            if (!res.ok) {
              const error = await res.json();
              return alert(error.message || 'Устгах үед алдаа гарлаа');
            }
            setSubCategories((prev) => prev.filter((cat) => cat.id !== id));
            alert('Амжилттай устлаа');
          } catch (err) {
            alert('Серверийн алдаа');
          }
        }} />
      <EditSubCategoryModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateCategory}
        category={editSubCategory}
      />
      <AddSubCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddCategory}
        category={categories}
      />
    </div>
  );
};

export default SubCategoryPage;
