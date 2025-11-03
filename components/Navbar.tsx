"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MenuIcon,
  ShoppingBasketIcon,
  PhoneCallIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import logo_v from "/img/logo_v.png";
import CategoryPage from "./menu/page";
import CategoryMenu from "./common/topMenu";
import { useCart } from '@/app/context/CartContext';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { cart } = useCart();

  // 🟢 Ангилал сонгоход Home-д event илгээдэг функц
  const handleCategorySelect = (id: string) => {
    const event = new CustomEvent("scrollToSection", { detail: id });
    window.dispatchEvent(event);
  };

  return (
    <header className="w-full shadow-lg border-b border-gray-200 sticky top-0 z-50">
      {/* --- Top bar --- */}
      <div className="h-12 bg-gradient-to-b from-[#1d3b86] via-[#3f6cb8] to-[#1d3b86]
       text-white flex items-center justify-between px-6 py-2 text-sm">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <MenuIcon size={25} className="text-white hover:text-cyan-200 transition" />
          <span className="text-md font-light tracking-wide">Ангилал</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5">
          <PhoneCallIcon size={15} />
          <span className="font-medium">99887766</span>
        </div>
      </div>

      {/* --- Main navigation --- */}
      <nav className="bg-white text-blue-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-3 gap-4">
          {/* ☰ Menu and CategoryMenu */}

          <div className="flex items-center gap-3">
            <Link href="/">
              <div>
                <Image src={logo_v} alt="Logo" width={130} height={80} className="object-contain" />
              </div>
            </Link>
            <div className="px-10">
              {/* 🔹 CategoryMenu-д сонгох event дамжуулна */}
              <CategoryMenu onCategorySelect={handleCategorySelect} />
            </div>
          </div>

          {/* 🔎 Search + Cart */}
          <div className="flex flex-row justify-between w-1/3">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-3/4 shadow-inner">
              <SearchIcon size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Бараа хайх..."
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/basket"
                className="relative flex items-center gap-2 bg-gradient-to-r from-[#1d3b86] via-[#2b5ba5] to-[#1d3b86]
               hover:from-[#254f94] hover:to-[#16336d]
               text-white px-5 py-2.5 rounded-full font-medium shadow-md transition-all duration-300 group"
              >
                <div className="relative">
                  <ShoppingBasketIcon
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  {cart.length > 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 
                     text-white text-[11px] font-semibold px-1.5 py-[1px] rounded-full shadow"
                    >
                      {cart.length}
                    </span>
                  )}
                </div>

                <span className="hidden sm:inline-block group-hover:translate-x-0.5 transition-transform">
                  Сагс
                </span>

                {/* Animated glow on hover */}
                <span
                  className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur-md transition"
                ></span>
              </Link>
            </div>

            {/* <div className="flex items-center gap-2">
              <Link
                href="/basket"
                className="flex items-center gap-2 bg-gradient-to-b from-[#1d3b86] via-[#3f6cb8] to-[#1d3b86]
               hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-light shadow-md transition"
              >
                <ShoppingBasketIcon size={18} />
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              </Link>
            </div> */}
          </div>
        </div>
      </nav>

      {/* --- Sidebar --- */}
      {
        openMenu && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpenMenu(false)}></div>
            <div className="fixed top-0 left-0 w-72 h-full bg-white z-50 shadow-xl animate-slideIn">
              <div className="flex justify-between items-center mb-4 border-b p-4">
                <h3 className="text-lg font-semibold text-blue-900">Ангилал</h3>
                <button onClick={() => setOpenMenu(false)} className="text-gray-500 hover:text-red-500 transition">
                  <XIcon size={22} />
                </button>
              </div>
              <CategoryPage />
            </div>
          </>
        )
      }
    </header >
  );
}
