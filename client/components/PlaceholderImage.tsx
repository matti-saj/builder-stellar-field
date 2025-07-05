import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackContent?: React.ReactNode;
}

export default function PlaceholderImage({
  src,
  alt,
  className = "",
  fallbackContent,
}: PlaceholderImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (!src || imageError) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-sand to-stone/50 flex items-center justify-center`}
      >
        {fallbackContent || (
          <div className="text-center text-stone-foreground">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-60" />
            <p className="text-xs opacity-80">{alt}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-sand to-stone/50 flex items-center justify-center">
          <div className="animate-pulse">
            <ImageIcon className="w-8 h-8 text-stone-foreground opacity-60" />
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
