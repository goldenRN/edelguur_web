'use client';

import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';

interface AddBrandModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
}

const AddBrandModal: React.FC<AddBrandModalProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert('Брэндийн нэрийг оруулна уу');
    setLoading(true);
    await onSubmit({ name, description });
    setLoading(false);
    setName('');
    setDescription('');
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
        <h2 className="text-xl font-semibold text-center mb-4">Брэнд нэмэх</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Нэр</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-3 py-2"
              placeholder="Жишээ: Samsung, LG, Bosch..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Тайлбар</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-3 py-2"
              rows={3}
              placeholder="Брэндийн тухай товч тайлбар..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-md transition-all"
          >
            {loading ? 'Хадгалж байна...' : 'Нэмэх'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrandModal;
