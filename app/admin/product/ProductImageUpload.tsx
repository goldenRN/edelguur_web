'use client';

import { useState } from 'react';

interface ProductImageUploadProps {
  productId?: number; // эсвэл string
}

export default function ProductImageUpload({ productId }: ProductImageUploadProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('images', files[i]);
    }

    const res = await fetch(`/api/products/${productId}/images`, {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      <button type="submit">Upload</button>
      {progress && <div>{progress}</div>}
    </form>
  );
}
