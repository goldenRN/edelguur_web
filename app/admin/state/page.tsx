'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CategoryTable from './stateTable';
import BackButton from '@/components/BackButton';
import EditStateModal from './EditStateModal';
import AddStateModal from './AddStateModal';

interface State {
  id: number;
  name: string;
  description: string;
}

const StatePage: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editState, setEditState] = useState<State | null>(null);
  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/status", {
      });
      const data = await res.json();
      setStates(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddState = async (data: { name: string }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch('http://localhost:4000/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data), // 👈 Modal-аас ирсэн JSON
      });

      if (!res.ok) throw new Error('Төлөв нэмэхэд алдаа гарлаа');
      setOpenModal(false);
      await fetchStates(); // жагсаалтаа дахин татах
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (cat: State) => {
    setEditState(cat);
    setEditModalOpen(true);
  };
  // Edit-ийг backend руу хадгалах
  const handleUpdateState = async (id: number, name: string, description?: string) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch(`http://localhost:4000/api/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id,
          name,
          description: description || '', // undefined бол хоосон string
        }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || 'Төлөв засахад алдаа гарлаа');

      setStates(prev => prev.map(c => (c.id === id ? updated : c)));
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Серверийн алдаа гарлаа');
    }
  };

  // const handleUpdateState = async (id: number, name: string, description: string) => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem('user') || '{}');

  //     const res = await fetch(`http://localhost:4000/api/status/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({ id: id, name: name, description: description }),
  //     });

  //     const updated = await res.json();

  //     if (!res.ok) throw new Error(updated.message || 'Төлөв засахад алдаа гарлаа');

  //     // жагсаалтыг шинэчлэх
  //     setStates(prev => prev.map(c => (c.id === id ? updated : c))
  //     // setStates(prev =>
  //     //   prev.map(c => (c.id === id ? { ...c, name: updated.name || name } : c))
  //     );

  //     setEditModalOpen(false);
  //   } catch (err) {
  //     console.error(err);
  //     alert('Серверийн алдаа гарлаа');
  //   }
  // };
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

      <CategoryTable
        states={states}
        onEdit={handleEditClick}
        // onDelete={handleDeleteCategory} 
        onDelete={async (id) => {
          const confirmed = window.confirm('Устгах уу?');
          if (!confirmed) return;
          try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch(`http://localhost:4000/api/status/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${user.token}` },
            });
            if (!res.ok) {
              const error = await res.json();
              return alert(error.message || 'Устгах үед алдаа гарлаа');
            }
            setStates((prev) => prev.filter((cat) => cat.id !== id));
            alert('Амжилттай устлаа');
          } catch (err) {
            alert('Серверийн алдаа');
          }
        }} />
      <EditStateModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateState}
        state={editState}
      />
      <AddStateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={
          handleAddState}
      />
    </div>
  );
};

export default StatePage;
