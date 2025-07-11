import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function YouTubeVideo({
  videoId,
  title = "Video",
  className = "",
}: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadVideo = () => {
    setIsLoaded(true);
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className={`relative ${className}`}>
      {!isLoaded ? (
        // Thumbnail with play button
        <div
          className="relative group cursor-pointer"
          onClick={handleLoadVideo}
        >
          <div className="aspect-video w-full bg-muted rounded-xl overflow-hidden">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/api/placeholder/800/450";
              }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-xl">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/80 text-sm">Haz clic para reproducir</p>
            </div>
          </div>
        </div>
      ) : (
        // Embedded YouTube video
        <div className="aspect-video w-full">
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* External link button */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(watchUrl, "_blank")}
          className="text-sm"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Ver en YouTube
        </Button>
      </div>
    </div>
  );
}
