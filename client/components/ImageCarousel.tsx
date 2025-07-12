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
      title: "Pucará de Tilcara",
      description:
        "Fortaleza precolombina que fue centro político y ceremonial del pueblo tilcara. Sus ruinas arqueológicas nos conectan con la sabiduría ancestral de los pueblos originarios y su avanzada organización social.",
      image:
        "https://www.dropbox.com/scl/fi/kwpvnsn9i5elq8ieyxh8l/Img_Tilcara.png?rlkey=757nns44mmk2zn2dcaeqc68af&st=nymi9akq&dl=1",
      category: "Arqueología",
    },
    {
      id: "2",
      title: "Pollera de la Colla",
      description:
        "Vestimenta tradicional de las mujeres kollas que representa la identidad cultural andina. Cada detalle, color y bordado cuenta la historia de un pueblo que conserva sus tradiciones ancestrales.",
      image:
        "https://www.dropbox.com/scl/fi/vxfcnsh18z9pkz8w3r5qp/Img_PolleraDeLaColla.png?rlkey=kex788sf4sxihwhq2vhb9xsbu&st=ckcx79iq&dl=1",
      category: "Cultura Viva",
    },
    {
      id: "3",
      title: "Monumento al Libertador",
      description:
        "Homenaje a los héroes de la independencia que lucharon en tierras jujeñas. Este monumento recuerda el papel fundamental de Jujuy en la gesta libertadora y el heroico Éxodo Jujeño.",
      image:
        "https://www.dropbox.com/scl/fi/dcixph3rzj8hgzu79xfw8/Img_Libertador.png?rlkey=69yfnw59joan2c01o60k8q9tx&st=8pjbekgk&dl=1",
      category: "Historia Patria",
    },
    {
      id: "4",
      title: "Monumento a los Héroes de la Independencia",
      description:
        "Memorial que honra la memoria de quienes sacrificaron todo por la libertad. Representa el espíritu heroico del pueblo jujeño y su contribución decisiva a la independencia argentina.",
      image:
        "https://www.dropbox.com/scl/fi/5m001uly7tdwdh9bl07qh/Img_MonumentoHeroesIndependencia.png?rlkey=cp2ywd68s67ef9gsas1doplwf&st=k6v6gmm8&dl=1",
      category: "Patrimonio Histórico",
    },
    {
      id: "5",
      title: "León de Jujuy",
      description:
        "Símbolo heráldico de la provincia que representa la bravura y el coraje del pueblo jujeño. Esta figura emblemática evoca la fuerza y determinación que caracteriza a la tierra del Éxodo.",
      image:
        "https://www.dropbox.com/scl/fi/ug85ajyzwhbx7jr4ltbi9/Img_Leon.png?rlkey=3xotyy4onggqh24o74x7y9u1n&st=h0n1xf18&dl=1",
      category: "Símbolos Patrios",
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
