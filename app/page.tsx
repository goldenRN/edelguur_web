"use client";

import { useEffect, useRef } from "react";
import BrandList from "@/components/brand/BrandList";
import BannerPromotion from "@/components/common/BannerPromotion";
import ProductGrid from "@/components/products/ProductGrid";
import Slider from "@/components/common/Slider";
import BubbleCategory from "@/components/common/bubbleCategory";

export default function Home() {
  const allRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  // 🟢 Navbar-аас ирэх event-ийг сонсож scroll хийх
  useEffect(() => {
    const handleScrollToSection = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const sectionId = customEvent.detail;
      const refMap: Record<string, React.RefObject<HTMLDivElement>> = {
        home: allRef,
        new: latestRef,
        best: popularRef,
        brand: brandRef,
      };
      const ref = refMap[sectionId];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("scrollToSection", handleScrollToSection);
    return () => window.removeEventListener("scrollToSection", handleScrollToSection);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div ref={allRef} className="mb-5">
        <Slider />
      </div>

      <div className="max-w-7xl mx-auto">
        <BubbleCategory />
      </div>

      <section  className="max-w-7xl mx-auto px-6 mb-14 scroll-mt-24">
        <ProductGrid type="all" title="Бүх бараа" />
      </section>

      <section ref={latestRef} className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24">
        <ProductGrid type="latest" title="Шинэ бараа" />
      </section>

      <div className="mb-14">
        <BannerPromotion />
      </div>

      <section ref={popularRef} className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24">
        <ProductGrid type="popular" title="Эрэлттэй бараа" />
      </section>

      <div ref={brandRef} className="scroll-mt-24">
        <BrandList />
      </div>
    </main>
  );
}
