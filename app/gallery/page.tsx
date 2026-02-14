"use client";

/* ================= IMPORTS ================= */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ======================================================
   GALLERY PAGE - FULL GALLERY WITH ARROW NAVIGATION
   MOBILE-RESPONSIVE VERSION
====================================================== */
export default function GalleryPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  /* ================= NAVIGATION FUNCTIONS ================= */
  const navigatePrevious = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : galleryImages.length - 1;
    });
  };

  const navigateNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev < galleryImages.length - 1 ? prev + 1 : 0;
    });
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  /* ================= TOUCH/SWIPE HANDLERS FOR MOBILE ================= */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateNext();
    }
    if (isRightSwipe) {
      navigatePrevious();
    }
  };

  /* ================= KEYBOARD NAVIGATION ================= */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
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

  /* ================= PREVENT BODY SCROLL WHEN MODAL OPEN ================= */
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  /* ================= DOWNLOAD IMAGE ================= */
  const downloadImage = (imageSrc: string, imageName: string): void => {
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
         HEADER WITH BACK BUTTON - MOBILE RESPONSIVE
      ====================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-black via-red-950/20 to-black backdrop-blur-xl border-b border-red-500/20 shadow-lg shadow-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-white transition-all font-semibold group text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </button>
          
          <h1 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            THE PARADISE
          </h1>

          <div className="w-16 sm:w-24"></div>
        </div>
      </header>

      {/* ======================================================
         MAIN CONTENT - MOBILE RESPONSIVE
      ====================================================== */}
      <main className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-white">
              Gallery
            </h2>
            <div className="h-1 w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400">
              <span className="hidden sm:inline">Click on any image to view in full size</span>
              <span className="sm:hidden">Tap to view full size</span>
            </p>
          </div>

          {/* Gallery Grid - Mobile Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 active:scale-95 sm:hover:scale-105 cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-red-500/30 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 sm:pb-4">
                  <span className="text-white font-semibold text-xs sm:text-sm">View Full</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ======================================================
         FULL-SIZE IMAGE MODAL - MOBILE RESPONSIVE WITH SWIPE
      ====================================================== */}
      {selectedImage && selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close Button - Mobile Responsive */}
          <button
            onClick={closeModal}
            className="fixed top-3 right-3 sm:top-6 sm:right-6 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl hover:from-red-500 hover:to-red-700 transition-all duration-300 active:rotate-90 sm:hover:rotate-90 active:scale-95 sm:hover:scale-110 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50"
          >
            ✕
          </button>

          {/* Previous Arrow - Hidden on Mobile, Visible on Desktop */}
          <button
            onClick={navigatePrevious}
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 bg-gradient-to-br from-red-600/90 to-red-800/90 text-white rounded-full w-16 h-16 items-center justify-center hover:from-red-500 hover:to-red-700 transition-all duration-300 hover:scale-110 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50 group"
          >
            <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow - Hidden on Mobile, Visible on Desktop */}
          <button
            onClick={navigateNext}
            className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 bg-gradient-to-br from-red-600/90 to-red-800/90 text-white rounded-full w-16 h-16 items-center justify-center hover:from-red-500 hover:to-red-700 transition-all duration-300 hover:scale-110 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50 group"
          >
            <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Navigation Arrows - Small, Bottom Corners */}
          <button
            onClick={navigatePrevious}
            className="md:hidden fixed left-3 bottom-24 sm:bottom-28 bg-gradient-to-br from-red-600/80 to-red-800/80 text-white rounded-full w-12 h-12 flex items-center justify-center active:from-red-500 active:to-red-700 transition-all duration-300 active:scale-95 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={navigateNext}
            className="md:hidden fixed right-3 bottom-24 sm:bottom-28 bg-gradient-to-br from-red-600/80 to-red-800/80 text-white rounded-full w-12 h-12 flex items-center justify-center active:from-red-500 active:to-red-700 transition-all duration-300 active:scale-95 shadow-xl shadow-red-900/50 border-2 border-red-400/30 z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container - Mobile Responsive */}
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 pb-40 sm:pb-32 max-w-[95vw] max-h-[95vh]">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Download Button - Mobile Responsive */}
          <button
            onClick={() => downloadImage(selectedImage.src, `paradise-${selectedImage.id}.jpg`)}
            className="fixed bottom-20 sm:bottom-22 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-700 active:to-red-800 text-white rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 sm:gap-3 font-bold shadow-2xl active:scale-95 sm:hover:scale-105 transition-all duration-300 z-50 border-2 border-red-400/50 text-sm sm:text-base"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-base sm:text-lg">Download</span>
          </button>

          {/* Image Info - Mobile Responsive */}
          <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md border border-red-500/40 rounded-lg sm:rounded-xl px-4 sm:px-10 py-1 sm:py-2 z-50 shadow-2xl max-w-[90vw]">
            <p className="text-white text-sm sm:text-lg font-bold text-center truncate">{selectedImage.alt}</p>
            <p className="text-red-400 text-xs sm:text-sm font-semibold text-center">
              Image {selectedIndex + 1} of {galleryImages.length}
            </p>
            <p className="text-gray-400 text-[10px] sm:text-xs text-center mt-0.5 sm:mt-1">
              <span className="hidden sm:inline">Use ← → arrows to navigate</span>
              <span className="sm:hidden">Swipe to navigate</span>
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