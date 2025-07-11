import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Circle, Play } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";

interface CarouselImage {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images: CarouselImage[] = [
    {
      id: "1",
      title: "Quebrada de Humahuaca",
      description:
        "Paisaje cultural declarado Patrimonio de la Humanidad por la UNESCO. Sus cerros multicolores narran millones de años de historia geológica y milenios de presencia humana.",
      image: "/api/placeholder/800/400",
      category: "Patrimonio Natural",
    },
    {
      id: "2",
      title: "Pucará de Tilcara",
      description:
        "Fortaleza precolombina que fue centro político y ceremonial del pueblo tilcara. Sus ruinas nos conectan con la sabiduría ancestral de los pueblos originarios.",
      image: "/api/placeholder/800/400",
      category: "Arqueología",
    },
    {
      id: "3",
      title: "Artesanías Tradicionales",
      description:
        "Los textiles jujeños conservan técnicas milenarias. Cada color y patrón cuenta una historia, transmitida de generación en generación por manos expertas.",
      image: "/api/placeholder/800/400",
      category: "Cultura Viva",
    },
    {
      id: "4",
      title: "Ceremonias Ancestrales",
      description:
        "Los rituales a la Pachamama mantienen viva la espiritualidad andina. Estas ceremonias conectan a las comunidades con la tierra y sus ancestros.",
      image: "/api/placeholder/800/400",
      category: "Tradiciones",
    },
    {
      id: "5",
      title: "Salinas Grandes",
      description:
        "Extenso salar que ha sido fuente de vida y comercio desde tiempos precolombinos. Su inmensidad blanca refleja el cielo andino como un espejo natural.",
      image: "/api/placeholder/800/400",
      category: "Geografía",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="w-full max-w-5xl mx-auto mb-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card className="overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          <div className="relative">
            {/* Main carousel container */}
            <div className="relative h-80 md:h-96 lg:h-[400px] overflow-hidden">
              {/* Images */}
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {images.map((image, index) => (
                  <div key={image.id} className="w-full flex-shrink-0 relative">
                    <PlaceholderImage
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full"
                      fallbackContent={
                        <div className="text-center text-stone-foreground">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
                          <h3 className="text-lg font-semibold mb-2">
                            {image.title}
                          </h3>
                          <p className="text-sm opacity-80">{image.category}</p>
                        </div>
                      }
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Auto-play indicator */}
              {isAutoPlaying && (
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {images[currentSlide].category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {images[currentSlide].title}
                </h3>
                <p className="text-white/90 leading-relaxed md:text-lg">
                  {images[currentSlide].description}
                </p>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center space-x-2 py-6 bg-card">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index ? "p-1" : "p-1 hover:opacity-80"
                }`}
              >
                <Circle
                  className={`w-3 h-3 transition-all duration-300 ${
                    currentSlide === index
                      ? "fill-primary text-primary scale-125"
                      : "fill-muted text-muted hover:fill-muted-foreground hover:text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress bar */}
      {isAutoPlaying && (
        <div className="mt-4">
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-100 ease-linear"
              style={{
                width: `${((currentSlide + 1) / images.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
