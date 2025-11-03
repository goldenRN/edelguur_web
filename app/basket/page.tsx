"use client";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function BasketPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0; // хөнгөлөлт байвал энд тооцно
  const tax = subtotal * 0.1; // 10% татвар (жишээ)
  const total = subtotal - discount + tax;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Title */}
      <h1 className="text-4xl font-serif">Сагс</h1>
      <p className="text-gray-600 mt-1 mb-6">{cart.length} Бараа</p>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>Таны сагс хоосон байна.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Зүүн тал — барааны жагсаалт */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 rounded-xl pr-4"
              >
                <div className="flex items-center p-1">
                  <div className="h-full p-1">
                    <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="font-medium text-lg">{item.name}</h2>
                    <p className="text-cyan-700 text-sm">{item.price.toLocaleString()}₮ / ш</p>

                    <div className="mt-2 flex items-center space-x-2 text-sm border rounded-md px-2 py-1 w-fit">
                      <span>{item.quantity} ш</span>
                      <button
                        className="text-red-500 hover:text-black"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
                <p className="font-medium">
                  {(item.price * item.quantity).toLocaleString()}₮
                </p>
              </div>
            ))}
          </div>

          {/* Баруун тал — Төлбөрийн хэсэг */}
          <div className="bg-gray-50 rounded-xl p-6 h-fit">
            <h3 className="font-semibold text-lg mb-4">Төлбөрийн мэдээлэл</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Нийт</span>
                <span>{subtotal.toLocaleString()}₮</span>
              </div>
              <div className="flex justify-between">
                <span>Харилцагчын хөнгөлөлт</span>
                <span>{discount.toFixed(2)}₮</span>
              </div>
              <div className="flex justify-between">
                <span>Татвар</span>
                <span>{tax.toLocaleString()}₮</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Нийт төлбөр</span>
                <span>{total.toLocaleString()}₮</span>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mt-4 hover:bg-gray-300"
            >
              Сагс хоослох
            </button>

            <button className="w-full bg-black text-white py-3 rounded-lg mt-6 font-medium flex justify-center items-center space-x-2 hover:bg-green-800">
              <span>Худалдан авалтыг үргэлжлүүлэх</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
