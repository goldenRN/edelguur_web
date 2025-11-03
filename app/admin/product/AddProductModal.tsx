

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Modal } from "@/components/ui/modal";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import axios from "axios";

// interface AddProductModalProps {
//     open: boolean;
//     onClose: () => void;
//     onRefresh: () => void;
//     editData?: any | null; // 🆕 Edit mode support
// }

// interface UploadFile {
//     file?: File;
//     preview: string;
//     progress?: number;
//     uploadedUrl?: string;
// }

// export default function AddProductModal({ open, onClose, onRefresh, editData }: AddProductModalProps) {
//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         category_id: "",
//         category_name: "",
//         subcategory_id: "",
//         subcategory_name: "",
//         brand_id: "",
//         brand_name: "",
//         unit_id: "",
//         unit_name: "",
//         status_id: "",
//         status_name: "",
//         images: [] as UploadFile[],
//     });

//     const [categories, setCategories] = useState<any[]>([]);
//     const [allSubCategories, setAllSubCategories] = useState<any[]>([]);
//     const [subCategories, setSubCategories] = useState<any[]>([]);
//     const [brands, setBrands] = useState<any[]>([]);
//     const [units, setUnits] = useState<any[]>([]);
//     const [statuses, setStatuses] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement | null>(null);

//     useEffect(() => {
//         if (editData) {
//             setForm((prev) => ({
//                 ...prev,
//                 ...editData,
//                 price: editData.price?.toString() || "",
//                 stock: editData.stock?.toString() || "",
//                 category_id: editData.category_id?.toString() || "",
//                 brand_id: editData.brand_id?.toString() || "",
//                 unit_id: editData.unit_id?.toString() || "",
//                 status_id: editData.status_id?.toString() || "",
//                 images: [], // түр хоослоно
//             }));

//             // 🔹 Зургуудыг тусад нь татна
//             axios
//                 .get(`http://localhost:4000/api/productimg/${editData.id}`)
//                 .then((res) => {
//                     const imgs = res.data.map((i: any) => ({
//                         preview: i.image_url,
//                         public_id:i.public_id,
//                         uploadedUrl: i.image_url,
//                     }));
//                     setForm((prev) => ({ ...prev, images: imgs }));
//                 })
//                 .catch((err) => console.error("Image fetch error:", err));
//         } else {
//             resetForm();
//         }
//     }, [editData, open]);

//     useEffect(() => {
//         if (!open) return;
//         Promise.all([
//             fetch("http://localhost:4000/api/category").then((res) => res.json()),
//             fetch("http://localhost:4000/api/subcategory").then((res) => res.json()),
//             fetch("http://localhost:4000/api/brand").then((res) => res.json()),
//             fetch("http://localhost:4000/api/unit").then((res) => res.json()),
//             fetch("http://localhost:4000/api/status").then((res) => res.json()),
//         ]).then(([cat, sub, br, un, st]) => {
//             setCategories(cat);
//             setAllSubCategories(sub);
//             setBrands(br);
//             setUnits(un);
//             setStatuses(st);
//         });
//     }, [open]);

//     const resetForm = () => {
//         setForm({
//             name: "",
//             description: "",
//             price: "",
//             stock: "",
//             category_id: "",
//             category_name: "",
//             subcategory_id: "",
//             subcategory_name: "",
//             brand_id: "",
//             brand_name: "",
//             unit_id: "",
//             unit_name: "",
//             status_id: "",
//             status_name: "",
//             images: [],
//         });
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleCategorySelect = (value: string) => {

//         const selected = categories.find((c) => c.category_id.toString() === value);
//         const filteredSubs = allSubCategories.filter((s) => s.category_id.toString() === value);
//         setForm({
//             ...form,
//             category_id: value,
//             category_name: selected?.category_name || "",
//             subcategory_id: "",
//             subcategory_name: "",
//         });
//         setSubCategories(filteredSubs);
//     };

//     const handleSubCategorySelect = (value: string) => {
//         const selected = subCategories.find((s) => s.id.toString() === value);
//         setForm({ ...form, subcategory_id: value, subcategory_name: selected?.name || "" });
//     };

//     const handleSelectWithName = (fieldId: string, fieldName: string, list: any[], value: string) => {
//         const selected = list.find((item) => item.id.toString() === value);
//         setForm({ ...form, [fieldId]: value, [fieldName]: selected?.name || "" });
//     };

//     const handleFiles = (files: FileList | null) => {
//         if (!files) return;
//         const selected = Array.from(files);

//         if (form.images.length + selected.length > 5) {
//             alert("⚠️ Зөвхөн 5 зураг оруулах боломжтой!");
//             return;
//         }

//         const newFiles: UploadFile[] = selected.map((f) => ({
//             file: f,
//             preview: URL.createObjectURL(f),
//             progress: 0,
//         }));
//         setForm((prev) => ({ ...prev, images: [...prev.images, ...newFiles] }));
//     };

//     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         handleFiles(e.dataTransfer.files);
//     };

//     const removeImage = (index: number) => {
//         setForm((prev) => {
//             const imgs = [...prev.images];
//             imgs.splice(index, 1);
//             return { ...prev, images: imgs };
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             let uploadedImages: { imageUrl: string; public_id: string }[] = [];

//             // 🟩 Шинэ зураг байвал Cloudinary руу upload хийнэ
//             const newImages = form.images.filter((img) => !img.uploadedUrl && img.file);
//             if (newImages.length > 0) {
//                 const formData = new FormData();
//                 newImages.forEach((img) => {
//                     formData.append("images", img.file as File);
//                 });

//                 const res = await axios.post(
//                     "http://localhost:4000/api/productimg/upload-multiple",
//                     formData,
//                     {
//                         headers: { "Content-Type": "multipart/form-data" },
//                     }
//                 );

//                 // ✅ Cloudinary-аас ирсэн structure: { imageUrl, public_id }
//                 uploadedImages = res.data.images.map((imgObj: any) => ({
//                     imageUrl: imgObj.imageUrl,
//                     public_id: imgObj.public_id,
//                 }));
//             }

//             // 🟩 Хуучин (өмнө upload хийсэн) зургуудыг хадгалах
//             const existingImages = form.images
//                 .filter((img) => img.uploadedUrl)
//                 .map((img) => ({
//                     imageUrl: img.uploadedUrl,
//                     public_id: img.public_id || null, // 🟢 hadgalagdaj baisan public_id
//                 }));

//             // 🧩 Нийт зургуудыг нэгтгэх
//             const allImages = [...existingImages, ...uploadedImages];

//             const payload = {
//                 ...form,
//                 price: Number(form.price) || 0,
//                 stock: Number(form.stock) || 0,
//                 images: allImages, // 🟢 images = [{ imageUrl, public_id }]
//             };
//             delete payload.images?.file;

//             if (editData) {
//                 await axios.put(`http://localhost:4000/api/product/${editData.id}`, payload);
//             } else {
//                 await axios.post("http://localhost:4000/api/product", payload);
//             }

//             onRefresh();
//             handleClose();
//         } catch (err) {
//             console.error("Upload error:", err);
//             alert("⚠️ Алдаа гарлаа!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleClose = () => {
//         resetForm();
//         onClose();
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <div className="grid grid-cols-2 gap-8 p-2 h-full">
//                 {/* 🧾 FORM тал */}
//                 <div className="space-y-4 overflow-auto p-2">
//                     <h2 className="text-2xl font-bold mb-2">
//                         {editData ? "✏️ Бараа засах" : "🛍️ Шинэ бүтээгдэхүүн нэмэх"}
//                     </h2>

//                     <div>
//                         <Label>Бүтээгдэхүүний нэр</Label>
//                         <Input name="name" value={form.name} onChange={handleChange} className="h-12 text-lg" />
//                     </div>
//                     <div>
//                         <Label>Тайлбар</Label>
//                         <Textarea
//                             name="description"
//                             value={form.description}
//                             onChange={handleChange}
//                             className="h-28 text-lg"
//                         />
//                     </div>

//                     <div className="grid grid-cols-3 gap-4">
//                         <div>
//                             <Label>Үнэ (₮)</Label>
//                             <Input
//                                 name="price"
//                                 type="number"
//                                 value={form.price}
//                                 onChange={handleChange}
//                                 className="h-12 text-lg"
//                             />
//                         </div>
//                         <div>
//                             <Label>Үлдэгдэл</Label>
//                             <Input
//                                 name="stock"
//                                 type="number"
//                                 value={form.stock}
//                                 onChange={handleChange}
//                                 className="h-12 text-lg"
//                             />
//                         </div>
//                         <div>
//                             <Label>Хэмжих нэгж</Label>
//                             <Select value={form.unit_id} onValueChange={(v) => handleSelectWithName("unit_id", "unit_name", units, v)}>
//                                 <SelectTrigger className="h-12">
//                                     <SelectValue placeholder="Сонгох..." />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {units?.map((u) => (
//                                         <SelectItem key={u.id} value={u.id.toString()}>
//                                             {u.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <Label>Ангилал</Label>
//                             <Select value={form.category_id}
//                                 onValueChange={handleCategorySelect}>
//                                 <SelectTrigger className="h-12">
//                                     <SelectValue placeholder="Сонгох..." />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {categories?.map((c) => (
//                                         <SelectItem key={c.category_id} value={c.category_id.toString()}>
//                                             {c.category_name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                                 {/* <SelectContent>
//                                     {categories?.map((c) => (
//                                         <SelectItem key={c.id} value={c.id}>
//                                             {c.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent> */}
//                             </Select>
//                         </div>
//                         <div>
//                             <Label>Дэд ангилал</Label>
//                             <Select onValueChange={handleSubCategorySelect}
//                                 value={form.subcategory_id}>
//                                 <SelectTrigger className="h-12">
//                                     <SelectValue placeholder="Сонгох..." />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {subCategories.map((s) => (
//                                         <SelectItem key={s.id} value={s.id.toString()}>
//                                             {s.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <Label>Брэнд</Label>
//                             <Select value={form.brand_id} onValueChange={(v) => handleSelectWithName("brand_id", "brand_name", brands, v)}>
//                                 <SelectTrigger className="h-12">
//                                     <SelectValue placeholder="Сонгох..." />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {brands.map((b) => (
//                                         <SelectItem key={b.id} value={b.id.toString()}>
//                                             {b.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div>
//                             <Label>Төлөв</Label>
//                             <Select value={form.status_id}
//                                 onValueChange={(v) => handleSelectWithName("status_id", "status_name", statuses, v)}
//                             >
//                                 <SelectTrigger className="h-12">
//                                     <SelectValue placeholder="Сонгох..." />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {statuses.map((s) => (
//                                         <SelectItem key={s.id} value={s.id.toString()}>
//                                             {s.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         {/* form submit товч */}
//                         {/* <Button
//                             type="button"
//                             onClick={handleSubmit}
//                             disabled={loading}
//                             className="mt-4 w-full h-14 text-lg"
//                         >
//                             {loading ? "Хадгалж байна..." : editData ? "Засах" : "Бүртгэх"}
//                         </Button> */}
//                     </div>

//                 </div>

//                 {/* 🖼️ Зураг хэсэг */}
//                 <div className="flex flex-col items-center justify-start overflow-auto">
//                     <Label className="py-2 mt-2">Зураг оруулах (хамгийн ихдээ 5)</Label>
//                     <div
//                         onDrop={handleDrop}
//                         onDragOver={(e) => e.preventDefault()}
//                         className="w-full h-40 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center cursor-pointer mb-4"
//                         onClick={() => fileInputRef.current?.click()}
//                     >
//                         Зургаа энд чирээд, эсвэл click хийж зураг оруулж болно
//                     </div>
//                     <Input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         className="hidden"
//                         onChange={(e) => handleFiles(e.target.files)}
//                     />

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         {form.images.map((img, index) => (
//                             <div key={index} className="relative">
//                                 <img
//                                     src={img.preview}
//                                     alt={`preview-${index}`}
//                                     className="w-full h-40 object-cover rounded-xl border shadow-lg"
//                                 />
//                                 <div className="absolute bottom-1 left-1 right-1 h-1 bg-gray-300 rounded">
//                                     <div
//                                         className="h-1 bg-blue-500 rounded"
//                                         style={{ width: `${img.progress || 100}%` }}
//                                     ></div>
//                                 </div>
//                                 <Button
//                                     type="button"
//                                     onClick={() => removeImage(index)}
//                                     className="absolute top-1 right-1 bg-red-500 text-white h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center"
//                                 >
//                                     ×
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             </div>
//             <div className="sticky bottom-0 bg-white border-t pt-3 flex justify-end gap-3 mt-6 pb-3">
//                 <Button
//                     variant="outline"
//                     onClick={handleClose}
//                     className="h-12 px-6 text-base"
//                 >
//                     Хаах
//                 </Button>
//                 <Button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="h-12 px-6 text-base"
//                 >
//                     {loading ? "Хадгалж байна..." : editData ? "Засах" : "Хадгалах"}
//                 </Button>
//             </div>
//         </Modal>
//     );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onRefresh: () => void;
    editData?: any | null;
}

interface UploadFile {
    file?: File;
    preview: string;
    uploadedUrl?: string;
    public_id?: string;
    progress?: number;
}

export default function AddProductModal({ open, onClose, onRefresh, editData }: AddProductModalProps) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        category_name: "",
        subcategory_id: "",
        subcategory_name: "",
        brand_id: "",
        brand_name: "",
        unit_id: "",
        unit_name: "",
        status_id: "",
        status_name: "",
        images: [] as UploadFile[],
    });

    const [categories, setCategories] = useState<any[]>([]);
    const [allSubCategories, setAllSubCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [units, setUnits] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 🟢 Хэрэв засвар хийж байвал хуучин утгуудыг populate хийнэ
    useEffect(() => {
        if (editData) {
            setForm((prev) => ({
                ...prev,
                ...editData,
                price: editData.price?.toString() || "",
                stock: editData.stock?.toString() || "",
                category_id: editData.category_id?.toString() || "",
                brand_id: editData.brand_id?.toString() || "",
                unit_id: editData.unit_id?.toString() || "",
                status_id: editData.status_id?.toString() || "",
                images: [],
            }));

            // 🟢 Барааны зургуудыг татах
            axios
                .get(`http://localhost:4000/api/productimg/${editData.id}`)
                .then((res) => {
                    const imgs = res.data.map((i: any) => ({
                        preview: i.image_url,
                        uploadedUrl: i.image_url,
                        public_id: i.public_id,
                    }));
                    setForm((prev) => ({ ...prev, images: imgs }));
                })
                .catch((err) => console.error("Image fetch error:", err));
        } else {
            resetForm();
        }
    }, [editData, open]);

    // 🟢 Dropdown-уудыг populate хийх
    useEffect(() => {
        if (!open) return;
        Promise.all([
            fetch("http://localhost:4000/api/category").then((r) => r.json()),
            fetch("http://localhost:4000/api/subcategory").then((r) => r.json()),
            fetch("http://localhost:4000/api/brand").then((r) => r.json()),
            fetch("http://localhost:4000/api/unit").then((r) => r.json()),
            fetch("http://localhost:4000/api/status").then((r) => r.json()),
        ]).then(([cat, sub, br, un, st]) => {
            setCategories(cat);
            setAllSubCategories(sub);
            setBrands(br);
            setUnits(un);
            setStatuses(st);
        });
    }, [open]);

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            price: "",
            stock: "",
            category_id: "",
            category_name: "",
            subcategory_id: "",
            subcategory_name: "",
            brand_id: "",
            brand_name: "",
            unit_id: "",
            unit_name: "",
            status_id: "",
            status_name: "",
            images: [],
        });
    };

    // 🟢 Change handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategorySelect = (value: string) => {
        const selected = categories.find((c) => c.category_id.toString() === value);
        const filteredSubs = allSubCategories.filter((s) => s.category_id.toString() === value);
        setForm({
            ...form,
            category_id: value,
            category_name: selected?.category_name || "",
            subcategory_id: "",
            subcategory_name: "",
        });
        setSubCategories(filteredSubs);
    };

    const handleSubCategorySelect = (value: string) => {
        const selected = subCategories.find((s) => s.id.toString() === value);
        setForm({ ...form, subcategory_id: value, subcategory_name: selected?.name || "" });
    };

    const handleSelectWithName = (fieldId: string, fieldName: string, list: any[], value: string) => {
        const selected = list.find((item) => item.id.toString() === value);
        setForm({ ...form, [fieldId]: value, [fieldName]: selected?.name || "" });
    };

    // 🟢 Зураг upload
    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const selected = Array.from(files);
        if (form.images.length + selected.length > 5) {
            alert("⚠️ Зөвхөн 5 зураг оруулах боломжтой!");
            return;
        }
        const newFiles: UploadFile[] = selected.map((f) => ({
            file: f,
            preview: URL.createObjectURL(f),
            progress: 0,
        }));
        setForm((prev) => ({ ...prev, images: [...prev.images, ...newFiles] }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const removeImage = (index: number) => {
        setForm((prev) => {
            const imgs = [...prev.images];
            imgs.splice(index, 1);
            return { ...prev, images: imgs };
        });
    };


    const handleClose = () => {
        resetForm();
        onClose();
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let uploadedImages: { image_url: string; public_id: string }[] = [];

            // 🟢 Шинээр upload хийгдэх зурагнууд
            const newImages = form.images.filter((img) => !img.uploadedUrl && img.file);
            if (newImages.length > 0) {
                const formData = new FormData();
                newImages.forEach((img) => {
                    formData.append("images", img.file as File);
                });

                const res = await axios.post(
                    "http://localhost:4000/api/productimg/upload-multiple",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                uploadedImages = res.data.images.map((imgObj: any) => ({
                    image_url: imgObj.imageUrl,
                    public_id: imgObj.public_id,
                }));
            }

            // 🟢 Хуучин (өмнө нь хадгалагдсан) зургуудыг хадгална
            const existingImages = form.images
                .filter((img) => img.uploadedUrl)
                .map((img) => ({
                    image_url: img.uploadedUrl,
                    public_id: img.public_id || null,
                }));

            // 🧩 Бүх зургийг нэгтгэх
            const allImages = [...existingImages, ...uploadedImages];

            // 📦 Payload үүсгэх
            const payload = {
                name: form.name,
                description: form.description,
                category_id: form.category_id,
                category_name: form.category_name,
                subcategory_id: form.subcategory_id,
                subcategory_name: form.subcategory_name,
                brand_id: form.brand_id,
                brand_name: form.brand_name,
                unit_id: form.unit_id,
                unit_name: form.unit_name,
                status_id: form.status_id,
                status_name: form.status_name,
                price: Number(form.price) || 0,
                stock: Number(form.stock) || 0,
                images: allImages, // [{ image_url, public_id }]
            };

            // 🟢 API дуудах
            if (editData) {
                await axios.put(`http://localhost:4000/api/product/${editData.id}`, payload);
            } else {
                await axios.post("http://localhost:4000/api/product", payload);
            }

            onRefresh();
            handleClose();
        } catch (err) {
            console.error("❌ Upload error:", err);
            alert("⚠️ Алдаа гарлаа!");
        } finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   setLoading(true);

    //   try {
    //     let uploadedImages: { imageUrl: string; public_id: string }[] = [];

    //     // 🟩 Шинэ зураг upload хийх
    //     const newImages = form.images.filter((img) => !img.uploadedUrl && img.file);
    //     if (newImages.length > 0) {
    //       const formData = new FormData();
    //       newImages.forEach((img) => {
    //         formData.append("images", img.file as File);
    //       });

    //       const res = await axios.post(
    //         "http://localhost:4000/api/productimg/upload-multiple",
    //         formData,
    //         { headers: { "Content-Type": "multipart/form-data" } }
    //       );

    //       // backend-аас буцаасан imageUrl + public_id
    //       uploadedImages = res.data.images.map((imgObj: any) => ({
    //         image_url: imgObj.imageUrl,
    //         public_id: imgObj.public_id,
    //       }));
    //     }

    //     // 🟩 Хуучин зургууд (аль хэдийн upload хийгдсэн)
    //     const existingImages = form.images
    //       .filter((img) => img.uploadedUrl)
    //       .map((img) => ({
    //         image_url: img.uploadedUrl,
    //         public_id: img.public_id,
    //       }));

    //     // 🟩 Бүх зургуудыг нэгтгэх
    //     const allImages = [...existingImages, ...uploadedImages];

    //     const payload = {
    //       ...form,
    //       price: Number(form.price) || 0,
    //       stock: Number(form.stock) || 0,
    //       images: allImages, // public_id + image_url хоёуланг нь дамжуулна
    //     };
    //     //delete payload.images; // Хэрвээ form-д images field байвал duplicate-ээс сэргийлж устгана

    //     if (editData) {
    //       await axios.put(`http://localhost:4000/api/product/${editData.id}`, payload);
    //     } else {
    //       await axios.post("http://localhost:4000/api/product", payload);
    //     }

    //     onRefresh();
    //     handleClose();
    //   } catch (err) {
    //     console.error("Upload error:", err);
    //     alert("⚠️ Алдаа гарлаа!");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // 🧱 UI хэсэг
    return (
        <Modal open={open} onClose={handleClose}>
            <div className="grid grid-cols-2 gap-8 p-2 h-full">
                {/* -------- LEFT FORM -------- */}
                <div className="space-y-4 overflow-auto p-2">
                    <h2 className="text-2xl font-bold mb-2">{editData ? "✏️ Бараа засах" : "🛍️ Шинэ бүтээгдэхүүн нэмэх"}</h2>

                    <div>
                        <Label>Бүтээгдэхүүний нэр</Label>
                        <Input name="name" value={form.name} onChange={handleChange} className="h-12 text-lg" />
                    </div>
                    <div>
                        <Label>Тайлбар</Label>
                        <Textarea name="description" value={form.description} onChange={handleChange} className="h-28 text-lg" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Үнэ (₮)</Label>
                            <Input name="price" type="number" value={form.price} onChange={handleChange} className="h-12 text-lg" />
                        </div>
                        <div>
                            <Label>Үлдэгдэл</Label>
                            <Input name="stock" type="number" value={form.stock} onChange={handleChange} className="h-12 text-lg" />
                        </div>
                        <div>
                            <Label>Хэмжих нэгж</Label>
                            <Select value={form.unit_id} onValueChange={(v) => handleSelectWithName("unit_id", "unit_name", units, v)}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Сонгох..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {units?.map((u) => (
                                        <SelectItem key={u.id} value={u.id.toString()}>
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Ангилал</Label>
                            <Select value={form.category_id} onValueChange={handleCategorySelect}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Сонгох..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((c) => (
                                        <SelectItem key={c.category_id} value={c.category_id.toString()}>
                                            {c.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Дэд ангилал</Label>
                            <Select value={form.subcategory_id} onValueChange={handleSubCategorySelect}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Сонгох..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {subCategories.map((s) => (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Брэнд</Label>
                            <Select value={form.brand_id} onValueChange={(v) => handleSelectWithName("brand_id", "brand_name", brands, v)}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Сонгох..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((b) => (
                                        <SelectItem key={b.id} value={b.id.toString()}>
                                            {b.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Төлөв</Label>
                            <Select value={form.status_id} onValueChange={(v) => handleSelectWithName("status_id", "status_name", statuses, v)}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Сонгох..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((s) => (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* -------- RIGHT IMAGE UPLOAD -------- */}
                <div className="flex flex-col items-center justify-start overflow-auto">
                    <Label className="py-2 mt-2">Зураг оруулах (хамгийн ихдээ 5)</Label>
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="w-full h-40 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center cursor-pointer mb-4"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Зургаа энд чирээд эсвэл click хийж зураг оруулна
                    </div>
                    <Input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {form.images.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img.preview} alt={`preview-${index}`} className="w-full h-40 object-cover rounded-xl border shadow-lg" />
                                <Button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center"
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t pt-3 flex justify-end gap-3 mt-6 pb-3">
                <Button variant="outline" onClick={handleClose} className="h-12 px-6 text-base">
                    Хаах
                </Button>
                <Button onClick={handleSubmit} disabled={loading} className="h-12 px-6 text-base">
                    {loading ? "Хадгалж байна..." : editData ? "Засах" : "Хадгалах"}
                </Button>
            </div>
        </Modal>
    );
}
