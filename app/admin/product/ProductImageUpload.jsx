"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageViewerModalProps {
  open: boolean
  onClose: () => void
  productId: number | null
}

export default function ImageViewerModal({ open, onClose, productId }: ImageViewerModalProps) {
  const [images, setImages] = useState<string[]>([])
  const [current, setCurrent] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    if (open && productId) {
      fetch(`http://localhost:4000/api/product/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setImages(data.image_urls || [])
          setCurrent(0)
        })
        .catch((err) => console.error("Зураг татахад алдаа:", err))
    }
  }, [open, productId])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, current])

  const next = () => setCurrent((prev) => (prev + 1) % images.length)
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  if (!images.length) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black/95 text-white border-0 relative overflow-hidden">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:bg-white/20"
        >
          <X size={20} />
        </Button>

        {/* Image carousel */}
        <div className="relative flex items-center justify-center h-[70vh] w-full select-none">
          {/* Previous button */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="absolute left-3 text-white bg-black/40 hover:bg-black/60 rounded-full"
            >
              <ChevronLeft size={30} />
            </Button>
          )}

          {/* Image */}
          <div
            className="relative cursor-zoom-in transition-transform duration-300"
            onClick={() => setZoom(!zoom)}
          >
            <img
              src={images[current]}
              alt={`Image ${current + 1}`}
              className={`rounded-lg max-h-[70vh] object-contain transition-transform duration-300 ${
                zoom ? "scale-125" : "scale-100"
              }`}
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="absolute right-3 text-white bg-black/40 hover:bg-black/60 rounded-full"
            >
              <ChevronRight size={30} />
            </Button>
          )}
        </div>

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="flex justify-center mt-3 gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === current ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
