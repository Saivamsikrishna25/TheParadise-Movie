"use client";

/* ================= IMPORTS ================= */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ======================================================
   GALLERY PAGE - FULL GALLERY WITH ARROW NAVIGATION
====================================================== */
export default function GalleryPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* ================= KEYBOARD NAVIGATION ================= */
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowLeft") {
        navigatePrevious();
      } else if (e.key === "ArrowRight") {
        navigateNext();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedIndex]);

  /* ================= NAVIGATION FUNCTIONS ================= */
  const navigatePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const navigateNext = () => {
    setSelectedIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  /* ================= DOWNLOAD IMAGE ================= */
  const downloadImage = (imageSrc: string, imageName: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedImage = selectedIndex !== null ? galleryImages[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ======================================================
         HEADER WITH BACK BUTTON
      ====================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-black via-red-950/20 to-black backdrop-blur-xl border-b border-red-500/20 shadow-lg shadow-red-900/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-semibold group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            THE PARADISE
          </h1>

          <div className="w-24"></div>
        </div>
      </header>

      {/* ======================================================
         MAIN CONTENT
      ====================================================== */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Gallery
            </h2>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            <p className="mt-4 text-gray-400">Click on any image to view in full size</p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-red-500/30 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white font-semibold text-sm">View Full</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ======================================================
         FULL-SIZE IMAGE MODAL WITH ARROW NAVIGATION
      ====================================================== */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="fixed top-6 right-6 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:from-red-500 hover:to-red-700 transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50"
          >
            ✕
          </button>

          {/* Previous Arrow */}
          <button
            onClick={navigatePrevious}
            className="fixed left-6 top-1/2 -translate-y-1/2 bg-gradient-to-br from-red-600/90 to-red-800/90 text-white rounded-full w-16 h-16 flex items-center justify-center hover:from-red-500 hover:to-red-700 transition-all duration-300 hover:scale-110 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50 group"
          >
            <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            onClick={navigateNext}
            className="fixed right-6 top-1/2 -translate-y-1/2 bg-gradient-to-br from-red-600/90 to-red-800/90 text-white rounded-full w-16 h-16 flex items-center justify-center hover:from-red-500 hover:to-red-700 transition-all duration-300 hover:scale-110 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50 group"
          >
            <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="w-full h-full flex items-center justify-center p-8 pb-32 max-w-[95vw] max-h-[95vh]">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Download Button - Fixed at Bottom Center */}
          <button
            onClick={() => downloadImage(selectedImage.src, `paradise-${selectedImage.id}.jpg`)}
            className="fixed bottom-22 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full px-6 py-2 flex items-center gap-3 font-bold shadow-2xl hover:scale-101 transition-all duration-300 z-50 border-2 border-red-400/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-lg">Download</span>
          </button>

          {/* Image Info */}
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md border border-red-500/40 rounded-xl px-10 py-0 z-100 shadow-2xl">
            <p className="text-white text-lg font-bold text-center">{selectedImage.alt}</p>
            <p className="text-red-400 text-sm font-semibold text-center">
              Image {selectedIndex + 1} of {galleryImages.length}
            </p>
            <p className="text-gray-400 text-xs text-center mt-1">
              Use ← → arrows to navigate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================
   GALLERY IMAGES DATA
====================================================== */
const galleryImages = [
  { id: 1, src: "/img1.jpg", alt: "NANI - ODELA 2 Pre Look" },
  { id: 3, src: "/img3.jpg", alt: "THE PARADISE Title Announcement" },
  { id: 4, src: "/img4.jpg", alt: "THE PARADISE Crow" },
  { id: 6, src: "/img6.jpg", alt: "Anirudh - Verriga Podham" },
  { id: 7, src: "/img7.jpg", alt: "He is coming to claim his GLORY" },
  { id: 2, src: "/img2.jpg", alt: "THE PARADISE First Look" },
  { id: 9, src: "/img9.jpg", alt: "THE PARADISE - JADAL against all odds" },
  { id: 10, src: "/img10.jpg", alt: "THE PARADISE Glimspse" },
  { id: 5, src: "/img5.jpg", alt: "Dagad on the sets of THE PARADISE" },
  { id: 11, src: "/nani.jpg", alt: "THE PARADISE - JADAL's Journey" },
  { id: 8, src: "/img8.jpg", alt: "THE PARADISE - JADAL ZAMANA" },
  { id: 12, src: "/img12.jpg", alt: "JADAL ZAMANA BEGINS FROM 21-08-2026" },
];