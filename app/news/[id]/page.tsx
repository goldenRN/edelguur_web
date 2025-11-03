"use client";
import Image from "next/image";

export default function BasketPage() {
  const items = [
    {
      id: 1,
      name: "Heirloom tomato",
      price: 5.99,
      unitPrice: "$5.99 / lb",
      qty: "1 lb",
      img: "/tomato.jpg",
    },
    {
      id: 2,
      name: "Organic ginger",
      price: 6.5,
      unitPrice: "$12.99 / lb",
      qty: "0.5 lb",
      img: "/ginger.jpg",
    },
    {
      id: 3,
      name: "Sweet onion",
      price: 14.95,
      unitPrice: "$2.99 / lb",
      qty: "5 lb",
      img: "/onion.jpg",
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = 3.99;
  const tax = 2.0;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Title */}
      <h1 className="text-4xl font-serif">Basket</h1>
      <p className="text-gray-600 mt-1 mb-6">{items.length} items</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left side: items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 rounded-xl p-4"
            >
              <div className="flex items-center">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-xl object-cover"
                />
                <div className="ml-4">
                  <h2 className="font-medium text-lg">{item.name}</h2>
                  <p className="text-green-700 text-sm">{item.unitPrice}</p>
                  <div className="mt-2 flex items-center space-x-2 text-sm border rounded-md px-2 py-1 w-fit">
                    <span>{item.qty}</span>
                    <button className="text-gray-500 hover:text-black">✏️</button>
                  </div>
                </div>
              </div>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Right side: Order summary */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Order summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-green-700 text-white py-3 rounded-lg mt-6 font-medium flex justify-center items-center space-x-2 hover:bg-green-800">
            <span>Continue to payment</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
