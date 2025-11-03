'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
  description: string;
}

interface EditBrandModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: number, name: string, description: string) => Promise<void>;
  brand: Brand | null;
}

const EditBrandModal: React.FC<EditBrandModalProps> = ({ open, onClose, onSubmit, brand }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setDescription(brand.description || '');
    }
  }, [brand]);

  if (!open || !brand) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(brand.id, name, description);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">Брэнд засах</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Нэр</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Тайлбар</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-3 py-2"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-2 rounded-md transition-all"
          >
            Хадгалах
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBrandModal;
