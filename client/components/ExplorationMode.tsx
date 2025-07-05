import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Mountain,
  Scroll,
  Swords,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";

interface ExplorationTheme {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  duration: string;
  highlights: string[];
  mapPoints: number;
  testimonies: number;
}

interface ExplorationStep {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "map" | "testimony" | "trivia";
  completed: boolean;
}

export default function ExplorationMode() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const explorationThemes: ExplorationTheme[] = [
    {
      id: "historia",
      title: "Historia Ancestral",
      description:
        "Descubre los orígenes de los pueblos originarios y su legado milenario en las tierras de Jujuy.",
      icon: Scroll,
      color: "bg-primary",
      duration: "30 min",
      highlights: [
        "Culturas precolombinas",
        "Camino del Inca",
        "Rituales ancestrales",
        "Testimonios de ancianos",
      ],
      mapPoints: 6,
      testimonies: 4,
    },
    {
      id: "geografia",
      title: "Geografía Sagrada",
      description:
        "Explora los paisajes únicos de Jujuy y su significado espiritual para las comunidades locales.",
      icon: Mountain,
      color: "bg-cactus",
      duration: "25 min",
      highlights: [
        "Quebrada de Humahuaca",
        "Cerros multicolores",
        "Salinas Grandes",
        "Paisajes sagrados",
      ],
      mapPoints: 5,
      testimonies: 3,
    },
    {
      id: "conflictos",
      title: "Resistencia y Lucha",
      description:
        "Conoce las luchas contemporáneas por la tierra, la identidad y los derechos de los pueblos originarios.",
      icon: Swords,
      color: "bg-destructive",
      duration: "35 min",
      highlights: [
        "Derechos territoriales",
        "Resistencia minera",
        "Organización comunitaria",
        "Testimonios de líderes",
      ],
      mapPoints: 4,
      testimonies: 5,
    },
  ];

  const getExplorationSteps = (themeId: string): ExplorationStep[] => {
    const baseSteps: { [key: string]: ExplorationStep[] } = {
      historia: [
        {
          id: "1",
          title: "Orígenes Precolombinos",
          description: "Explora los asentamientos más antiguos de la región",
          location: "Pucará de Tilcara",
          type: "map",
          completed: false,
        },
        {
          id: "2",
          title: "Voces Ancestrales",
          description: "Escucha testimonios sobre tradiciones milenarias",
          location: "Testimonios de ancianos",
          type: "testimony",
          completed: false,
        },
        {
          id: "3",
          title: "El Camino del Inca",
          description: "Recorre las rutas históricas de comercio andino",
          location: "Quebrada de Humahuaca",
          type: "map",
          completed: false,
        },
        {
          id: "4",
          title: "Prueba tus Conocimientos",
          description: "Responde preguntas sobre la historia de Jujuy",
          location: "Trivia Educativa",
          type: "trivia",
          completed: false,
        },
      ],
      geografia: [
        {
          id: "1",
          title: "Paisajes Multicolores",
          description: "Descubre la formación geológica única de los cerros",
          location: "Cerro de los Siete Colores",
          type: "map",
          completed: false,
        },
        {
          id: "2",
          title: "Conexión con la Tierra",
          description: "Escucha sobre la relación espiritual con el paisaje",
          location: "Testimonios de comuneros",
          type: "testimony",
          completed: false,
        },
        {
          id: "3",
          title: "Las Salinas Sagradas",
          description: "Explora la importancia cultural de las salinas",
          location: "Salinas Grandes",
          type: "map",
          completed: false,
        },
        {
          id: "4",
          title: "Geografía en Acción",
          description: "Demuestra tu conocimiento sobre la geografía jujeña",
          location: "Trivia Educativa",
          type: "trivia",
          completed: false,
        },
      ],
      conflictos: [
        {
          id: "1",
          title: "Territorios en Disputa",
          description: "Identifica las zonas de conflicto territorial",
          location: "Mapa de conflictos",
          type: "map",
          completed: false,
        },
        {
          id: "2",
          title: "Voces de Resistencia",
          description: "Escucha testimonios de líderes comunitarios",
          location: "Testimonios de activistas",
          type: "testimony",
          completed: false,
        },
        {
          id: "3",
          title: "Organización Comunitaria",
          description: "Conoce las formas de organización social",
          location: "Comunidades organizadas",
          type: "map",
          completed: false,
        },
        {
          id: "4",
          title: "Reflexión y Acción",
          description: "Responde sobre derechos y justicia social",
          location: "Trivia Educativa",
          type: "trivia",
          completed: false,
        },
      ],
    };
    return baseSteps[themeId] || [];
  };

  const currentTheme = explorationThemes.find((t) => t.id === selectedTheme);
  const explorationSteps = selectedTheme
    ? getExplorationSteps(selectedTheme)
    : [];

  const handleStartExploration = (themeId: string) => {
    setSelectedTheme(themeId);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < explorationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleResetExploration = () => {
    setSelectedTheme(null);
    setCurrentStep(0);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "map":
        return MapPin;
      case "testimony":
        return Sparkles;
      case "trivia":
        return Scroll;
      default:
        return Compass;
    }
  };

  if (!selectedTheme) {
    return (
      <section id="exploracion" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Exploración Guiada
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Elige una temática para iniciar un recorrido guiado por la
              historia y cultura de Jujuy. Cada exploración combina mapas
              interactivos, testimonios orales y conocimientos educativos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {explorationThemes.map((theme) => {
              const IconComponent = theme.icon;
              return (
                <Card
                  key={theme.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div
                      className={`${theme.color} text-white rounded-lg p-4 mb-4 flex items-center justify-center`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {theme.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {theme.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Duración: {theme.duration}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{theme.mapPoints} puntos del mapa</span>
                        <span>•</span>
                        <span>{theme.testimonies} testimonios</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="text-sm font-semibold text-foreground">
                        Incluye:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {theme.highlights.map((highlight) => (
                          <Badge
                            key={highlight}
                            variant="secondary"
                            className="text-xs"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleStartExploration(theme.id)}
                      className="w-full"
                    >
                      Iniciar Exploración
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="exploracion" className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with current theme */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`${currentTheme?.color} text-white rounded-lg p-3`}>
              {currentTheme?.icon && <currentTheme.icon className="w-6 h-6" />}
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {currentTheme?.title}
            </h2>
          </div>
          <Button variant="outline" onClick={handleResetExploration}>
            Cambiar Temática
          </Button>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Progreso de Exploración
            </span>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} de {explorationSteps.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / explorationSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Current step */}
        {explorationSteps[currentStep] && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  {(() => {
                    const StepIcon = getStepIcon(
                      explorationSteps[currentStep].type,
                    );
                    return (
                      <div className="bg-primary text-primary-foreground rounded-full p-4">
                        <StepIcon className="w-8 h-8" />
                      </div>
                    );
                  })()}
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {explorationSteps[currentStep].title}
                </h3>

                <p className="text-lg text-muted-foreground mb-4">
                  {explorationSteps[currentStep].description}
                </p>

                <Badge variant="outline" className="mb-6">
                  📍 {explorationSteps[currentStep].location}
                </Badge>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleNextStep}
                    disabled={currentStep >= explorationSteps.length - 1}
                  >
                    {currentStep < explorationSteps.length - 1
                      ? "Siguiente Paso"
                      : "Completado"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Steps overview */}
        <div className="grid md:grid-cols-2 gap-4">
          {explorationSteps.map((step, index) => {
            const StepIcon = getStepIcon(step.type);
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <Card
                key={step.id}
                className={`transition-all ${
                  isActive
                    ? "ring-2 ring-primary shadow-lg"
                    : isCompleted
                      ? "bg-muted/50"
                      : "opacity-60"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`rounded-full p-2 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                            ? "bg-cactus text-cactus-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {step.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {step.location}
                      </p>
                    </div>
                    {isCompleted && (
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
