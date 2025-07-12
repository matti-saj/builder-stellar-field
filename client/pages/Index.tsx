import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import InteractiveMap from "@/components/InteractiveMap";
import TestimonialsSection from "@/components/TestimonialsSection";
import ExplorationMode from "@/components/ExplorationMode";
import TriviaSection from "@/components/TriviaSection";
import Timeline from "@/components/Timeline";
import ImageCarousel from "@/components/ImageCarousel";
import YouTubeVideo from "@/components/YouTubeVideo";
import PlaceholderImage from "@/components/PlaceholderImage";
import {
  ChevronDown,
  MapPin,
  Users,
  Compass,
  Brain,
  Clock,
} from "lucide-react";

export default function Index() {
  const [activeSection, setActiveSection] = useState("inicio");

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (section === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "mapa",
        "testimonios",
        "timeline",
        "exploracion",
        "trivia",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            return;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("inicio");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onSectionClick={handleSectionClick}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-sand/20 to-cactus/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cactus/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header Image */}
          <div className="mb-8">
            <div className="relative w-full mb-8">
              <PlaceholderImage
                src="/api/placeholder/1600/600"
                alt="Paisaje cultural de Jujuy - Quebrada de Humahuaca"
                className="w-full h-72 md:h-96 lg:h-[500px] rounded-2xl shadow-2xl"
                fallbackContent={
                  <div className="text-center text-stone-foreground">
                    <div className="w-24 h-24 mx-auto mb-4 opacity-60">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-full h-full"
                      >
                        <path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Paisajes de Jujuy
                    </h3>
                    <p className="text-sm opacity-80">
                      Quebrada de Humahuaca - Patrimonio de la Humanidad
                    </p>
                  </div>
                }
              />

              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />

              {/* Floating badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-foreground">
                  🏔️ Patrimonio UNESCO
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary to-cactus bg-clip-text text-transparent">
                Jujuy Interactivo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Descubre la riqueza cultural del norte argentino a través de
              relatos orales, mapas interactivos y experiencias educativas
              inmersivas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              {
                icon: MapPin,
                title: "Mapa Interactivo",
                description: "Explora territorios y lugares históricos",
                color: "bg-primary",
                section: "mapa",
              },
              {
                icon: Users,
                title: "Testimonios Orales",
                description: "Escucha voces de las comunidades",
                color: "bg-cactus",
                section: "testimonios",
              },
              {
                icon: Clock,
                title: "Línea de Tiempo",
                description: "Descubre la historia cronológica",
                color: "bg-accent",
                section: "timeline",
              },
              {
                icon: Compass,
                title: "Exploración Guiada",
                description: "Recorridos temáticos personalizados",
                color: "bg-stone",
                section: "exploracion",
              },
              {
                icon: Brain,
                title: "Trivia Educativa",
                description: "Aprende jugando sobre la cultura jujeña",
                color: "bg-clay",
                section: "trivia",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleSectionClick(feature.section)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${feature.color} text-white rounded-lg p-4 mb-4 inline-flex`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Image Carousel */}
          <ImageCarousel />

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button
              size="lg"
              onClick={() => handleSectionClick("mapa")}
              className="w-full sm:w-auto"
            >
              Comenzar Exploración
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSectionClick("testimonios")}
              className="w-full sm:w-auto"
            >
              Escuchar Testimonios
            </Button>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-muted-foreground mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Preservando la Memoria Cultural
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Jujuy Interactivo es una plataforma educativa que preserva y
                comparte la rica herencia cultural de los pueblos originarios de
                Jujuy. A través de tecnología interactiva, conectamos el pasado
                con el presente.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Testimonios auténticos de ancianos y líderes comunitarios
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cactus rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Mapas interactivos con informaci��n histórica y cultural
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-stone rounded-full mt-2 flex-shrink-0" />
                  <span>Experiencias educativas para todas las edades</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-clay rounded-full mt-2 flex-shrink-0" />
                  <span>Acceso libre y gratuito para toda la comunidad</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/5 to-cactus/5 p-6 rounded-2xl border border-border/50 shadow-lg">
                <YouTubeVideo
                  videoId="Fh15x7BkvJ4"
                  title="Patrimonio Cultural de Jujuy - Tradiciones Ancestrales"
                  className="w-full rounded-xl overflow-hidden"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Tradiciones Ancestrales de Jujuy
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Descubre la riqueza cultural a través de este documental
                    sobre las tradiciones que perviven en nuestras comunidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <InteractiveMap />
      <TestimonialsSection />
      <Timeline />
      <ExplorationMode />
      <TriviaSection />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Jujuy Interactivo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Patrimonio Cultural Digital
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Preservando y compartiendo la memoria cultural de los pueblos
                originarios de Jujuy para las futuras generaciones.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Explora más
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => handleSectionClick("mapa")}
                    className="hover:text-primary transition-colors"
                  >
                    Mapa Interactivo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick("testimonios")}
                    className="hover:text-primary transition-colors"
                  >
                    Testimonios Orales
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick("timeline")}
                    className="hover:text-primary transition-colors"
                  >
                    Línea de Tiempo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick("exploracion")}
                    className="hover:text-primary transition-colors"
                  >
                    Exploración Guiada
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick("trivia")}
                    className="hover:text-primary transition-colors"
                  >
                    Trivia Educativa
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Colaboradores
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Este proyecto fue desarrollado en colaboración con comunidades
                originarias de Jujuy y organizaciones culturales locales.
              </p>
              <p className="text-xs text-muted-foreground">
                © 2024 Jujuy Interactivo. Contenido cultural protegido por
                derechos de las comunidades originarias.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
