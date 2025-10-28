import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, projectTitle }) => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
    index: number;
  } | null>(null);

  const openModal = (imageUrl: string, index: number) => {
    setSelectedImage({
      url: imageUrl,
      alt: `${projectTitle} - Image ${index + 1}`,
      index: index
    });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage) {
      const newIndex = selectedImage.index > 0 ? selectedImage.index - 1 : images.length - 1;
      setSelectedImage({
        url: images[newIndex],
        alt: `${projectTitle} - Image ${newIndex + 1}`,
        index: newIndex
      });
    }
  };

  const goToNext = () => {
    if (selectedImage) {
      const newIndex = selectedImage.index < images.length - 1 ? selectedImage.index + 1 : 0;
      setSelectedImage({
        url: images[newIndex],
        alt: `${projectTitle} - Image ${newIndex + 1}`,
        index: newIndex
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => openModal(image, index)}
          >
            <div className="relative">
              <img
                src={image}
                alt={`${projectTitle} - Image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        imageUrl={selectedImage?.url || ''}
        imageAlt={selectedImage?.alt || ''}
        projectTitle={projectTitle}
        images={images}
        currentIndex={selectedImage?.index || 0}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
};

export default ProjectGallery;
