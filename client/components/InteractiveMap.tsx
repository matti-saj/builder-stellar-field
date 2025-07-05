import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Layers,
  Volume2,
  AlertTriangle,
  Route,
  Eye,
  EyeOff,
} from "lucide-react";

interface MapLayer {
  id: string;
  name: string;
  icon: any;
  color: string;
  active: boolean;
  points: MapPoint[];
}

interface MapPoint {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  type: string;
}

export default function InteractiveMap() {
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([
    {
      id: "relatos",
      name: "Relatos Orales",
      icon: Volume2,
      color: "bg-cactus",
      active: true,
      points: [
        {
          id: "1",
          x: 25,
          y: 30,
          title: "Relato de la Quebrada",
          description: "Historia oral de los pueblos originarios",
          type: "relatos",
        },
        {
          id: "2",
          x: 45,
          y: 60,
          title: "Leyenda del Pucará",
          description: "Tradiciones ancestrales del lugar",
          type: "relatos",
        },
        {
          id: "3",
          x: 70,
          y: 40,
          title: "Canto de las Salinas",
          description: "Testimonios de trabajadores salineros",
          type: "relatos",
        },
      ],
    },
    {
      id: "conflictos",
      name: "Zonas de Conflicto",
      icon: AlertTriangle,
      color: "bg-destructive",
      active: false,
      points: [
        {
          id: "4",
          x: 35,
          y: 45,
          title: "Conflicto Territorial",
          description: "Disputa por tierras ancestrales",
          type: "conflictos",
        },
        {
          id: "5",
          x: 55,
          y: 25,
          title: "Resistencia Minera",
          description: "Oposición a la explotación minera",
          type: "conflictos",
        },
      ],
    },
    {
      id: "rutas",
      name: "Rutas Históricas",
      icon: Route,
      color: "bg-stone",
      active: false,
      points: [
        {
          id: "6",
          x: 20,
          y: 50,
          title: "Camino del Inca",
          description: "Antigua ruta precolombina",
          type: "rutas",
        },
        {
          id: "7",
          x: 60,
          y: 70,
          title: "Ruta de la Sal",
          description: "Camino comercial colonial",
          type: "rutas",
        },
        {
          id: "8",
          x: 80,
          y: 35,
          title: "Sendero de Llamas",
          description: "Ruta de intercambio andino",
          type: "rutas",
        },
      ],
    },
  ]);

  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const toggleLayer = (layerId: string) => {
    setMapLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, active: !layer.active } : layer,
      ),
    );
  };

  const getActivePoints = () => {
    return mapLayers
      .filter((layer) => layer.active)
      .flatMap((layer) =>
        layer.points.map((point) => ({
          ...point,
          layerColor: layer.color,
          layerIcon: layer.icon,
        })),
      );
  };

  return (
    <section id="mapa" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Mapa Interactivo de Jujuy
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explora la rica historia y cultura de Jujuy a través de relatos
            orales, zonas de conflicto y rutas históricas. Activa las capas para
            descubrir diferentes aspectos de la región.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Layer Controls */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Layers className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Capas del Mapa</h3>
                </div>
                <div className="space-y-3">
                  {mapLayers.map((layer) => {
                    const IconComponent = layer.icon;
                    return (
                      <Button
                        key={layer.id}
                        variant={layer.active ? "default" : "outline"}
                        onClick={() => toggleLayer(layer.id)}
                        className="w-full justify-start"
                      >
                        {layer.active ? (
                          <Eye className="w-4 h-4 mr-2" />
                        ) : (
                          <EyeOff className="w-4 h-4 mr-2" />
                        )}
                        <IconComponent className="w-4 h-4 mr-2" />
                        <span className="text-sm">{layer.name}</span>
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Haz clic en los marcadores del mapa para obtener más
                    información sobre cada punto.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-sand to-stone/20">
                  {/* Map Background - Stylized representation of Jujuy */}
                  <div className="absolute inset-0 opacity-30">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Mountains */}
                      <path
                        d="M0,80 L20,40 L40,60 L60,30 L80,50 L100,20 L100,100 L0,100 Z"
                        fill="hsl(var(--stone))"
                        opacity="0.6"
                      />
                      {/* Rivers */}
                      <path
                        d="M10,70 Q30,65 50,70 T90,75"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                        fill="none"
                        opacity="0.8"
                      />
                    </svg>
                  </div>

                  {/* Map Points */}
                  {getActivePoints().map((point) => {
                    const IconComponent = point.layerIcon;
                    return (
                      <button
                        key={point.id}
                        onClick={() => setSelectedPoint(point)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${point.layerColor} text-white rounded-full p-2 hover:scale-110 transition-transform shadow-lg`}
                        style={{
                          left: `${point.x}%`,
                          top: `${point.y}%`,
                        }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </button>
                    );
                  })}

                  {/* Info Card for Selected Point */}
                  {selectedPoint && (
                    <div
                      className="absolute z-10 bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs"
                      style={{
                        left: `${Math.min(selectedPoint.x + 5, 85)}%`,
                        top: `${Math.max(selectedPoint.y - 10, 5)}%`,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {selectedPoint.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {selectedPoint.description}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {selectedPoint.type}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPoint(null);
                          }}
                          className="p-1"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
