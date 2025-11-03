'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Pencil, Trash } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
  description: string;
}

interface BrandTableProps {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete?: (id: number) => void;
}

const BrandTable = ({ brands, onEdit, onDelete }: BrandTableProps) => {
  return (
    <div>
      <Table>
        <TableCaption>Брэндийн бүртгэл</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Нэр</TableHead>
            <TableHead>Тайлбар</TableHead>
            <TableHead>Үйлдэл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.name}</TableCell>
              <TableCell>{b.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <button
                    className="bg-blue-100 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded text-xs"
                    onClick={() => onEdit(b)}
                  >
                    <Pencil className="text-slate-800" size={20} />
                  </button>
                  <button
                    className="bg-red-100 hover:bg-red-500 text-white font-bold py-2 px-4 rounded text-xs"
                    onClick={() => onDelete && onDelete(b.id)}
                  >
                    <Trash className="text-slate-800" size={20} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BrandTable;
