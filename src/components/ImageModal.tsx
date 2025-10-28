import React, { useEffect, useState } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
  projectTitle: string;
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  projectTitle,
  images,
  currentIndex,
  onPrevious,
  onNext,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Handle escape key and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && !isTransitioning) {
        onPrevious();
      } else if (e.key === "ArrowRight" && !isTransitioning) {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onPrevious, onNext, isTransitioning]);

  // Handle image transition animation
  const handleImageChange = (direction: "prev" | "next") => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Small delay to show the transition
    setTimeout(() => {
      if (direction === "prev") {
        onPrevious();
      } else {
        onNext();
      }

      // Reset transition state after image loads
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Container with Animation */}
        <div className="relative">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Image Caption */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg transition-all duration-300 ${
              isTransitioning
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            <h3 className="text-white text-xl font-semibold mb-1">
              {projectTitle}
            </h3>
            <p className="text-gray-300 text-sm">{imageAlt}</p>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => handleImageChange("prev")}
                disabled={isTransitioning}
                className={`bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 ${
                  isTransitioning ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => handleImageChange("next")}
                disabled={isTransitioning}
                className={`bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 ${
                  isTransitioning ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div
            className={`absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Loading indicator during transition */}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
