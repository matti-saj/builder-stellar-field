import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Volume2,
  AlertTriangle,
  Route,
  Eye,
  EyeOff,
  MapPin,
  Layers,
} from "lucide-react";

interface MapPoint {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: "relato" | "conflicto" | "ruta";
  coords: [number, number];
  detalles?: string;
}

interface MapLayer {
  id: string;
  name: string;
  icon: any;
  color: string;
  active: boolean;
  type: "relato" | "conflicto" | "ruta";
}

export default function LeafletMap() {
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([
    {
      id: "relatos",
      name: "Relatos Orales",
      icon: Volume2,
      color: "bg-cactus",
      active: true,
      type: "relato",
    },
    {
      id: "conflictos",
      name: "Zonas de Conflicto",
      icon: AlertTriangle,
      color: "bg-destructive",
      active: false,
      type: "conflicto",
    },
    {
      id: "rutas",
      name: "Rutas Históricas",
      icon: Route,
      color: "bg-stone",
      active: false,
      type: "ruta",
    },
  ]);

  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const mapPoints: MapPoint[] = [
    {
      id: "1",
      nombre: "Leyenda del Pucará de Tilcara",
      descripcion: "Tradiciones ancestrales del pueblo tilcara",
      tipo: "relato",
      coords: [-24.2348, -65.2956],
      detalles:
        "Fortaleza precolombina con rica tradición oral sobre ceremonias ancestrales y la conexión espiritual con la Pachamama.",
    },
    {
      id: "2",
      nombre: "Relatos de Humahuaca",
      descripcion: "Historias orales de la quebrada",
      tipo: "relato",
      coords: [-23.2043, -65.3515],
      detalles:
        "Centro urbano con testimonios sobre la vida tradicional en la Quebrada de Humahuaca, declarada Patrimonio de la Humanidad.",
    },
    {
      id: "3",
      nombre: "Cantos de las Salinas Grandes",
      descripcion: "Testimonios de trabajadores salineros",
      tipo: "relato",
      coords: [-23.6312, -65.8947],
      detalles:
        "Extenso salar donde las comunidades locales han extraído sal durante siglos, manteniendo tradiciones ancestrales.",
    },
    {
      id: "4",
      nombre: "Voces de Iruya",
      descripcion: "Medicina tradicional andina",
      tipo: "relato",
      coords: [-22.2779, -64.6341],
      detalles:
        "Pueblo andino donde se preservan conocimientos ancestrales sobre plantas medicinales y rituales de sanación.",
    },
    {
      id: "5",
      nombre: "Conflicto Territorial Kollas",
      descripcion: "Disputa por tierras ancestrales",
      tipo: "conflicto",
      coords: [-23.15, -65.2],
      detalles:
        "Zona de tensión donde las comunidades kollas luchan por el reconocimiento de sus derechos territoriales ancestrales.",
    },
    {
      id: "6",
      nombre: "Resistencia Minera en Rinconada",
      descripcion: "Oposición a la explotación minera",
      tipo: "conflicto",
      coords: [-22.9876, -65.1298],
      detalles:
        "Área donde las comunidades se organizan contra proyectos de megaminería que amenazan sus fuentes de agua y territorios sagrados.",
    },
    {
      id: "7",
      nombre: "Conflicto de Cieneguillas",
      descripcion: "Disputa por recursos hídricos",
      tipo: "conflicto",
      coords: [-24.3245, -65.1892],
      detalles:
        "Zona de conflicto por el acceso al agua entre comunidades tradicionales y empresas agrícolas modernas.",
    },
    {
      id: "8",
      nombre: "Qhapaq Ñan - Camino Principal Andino",
      descripcion: "Antigua red vial incaica",
      tipo: "ruta",
      coords: [-23.65, -65.4],
      detalles:
        "Tramo del camino principal andino que conectaba el imperio incaico, utilizado para comercio y comunicación.",
    },
    {
      id: "9",
      nombre: "Ruta de la Sal",
      descripcion: "Camino comercial colonial",
      tipo: "ruta",
      coords: [-24.1012, -65.4123],
      detalles:
        "Ruta histórica utilizada para el transporte de sal desde las salinas hasta los centros urbanos coloniales.",
    },
    {
      id: "10",
      nombre: "Sendero de las Llamas",
      descripcion: "Ruta de intercambio andino",
      tipo: "ruta",
      coords: [-22.8, -65.0],
      detalles:
        "Camino tradicional usado por caravanas de llamas para el intercambio de productos entre diferentes pisos ecológicos.",
    },
    {
      id: "11",
      nombre: "Camino de los Arrieros",
      descripcion: "Ruta de comercio colonial",
      tipo: "ruta",
      coords: [-24.5, -65.3],
      detalles:
        "Camino utilizado por arrieros durante la época colonial para transportar mercancías entre el Alto Perú y el Río de la Plata.",
    },
  ];

  const toggleLayer = (layerId: string) => {
    setMapLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, active: !layer.active } : layer,
      ),
    );
  };

  const getActivePoints = () => {
    const activeTypes = mapLayers
      .filter((layer) => layer.active)
      .map((layer) => layer.type);
    return mapPoints.filter((point) => activeTypes.includes(point.tipo));
  };

  const getMarkerColor = (tipo: string) => {
    switch (tipo) {
      case "relato":
        return "bg-cactus";
      case "conflicto":
        return "bg-destructive";
      case "ruta":
        return "bg-stone";
      default:
        return "bg-primary";
    }
  };

  const getMarkerIcon = (tipo: string) => {
    switch (tipo) {
      case "relato":
        return "🎤";
      case "conflicto":
        return "⚠️";
      case "ruta":
        return "🛤️";
      default:
        return "📍";
    }
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

            {/* Selected Point Info */}
            {selectedPoint && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {selectedPoint.tipo}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPoint(null)}
                      className="p-1 h-auto"
                    >
                      ×
                    </Button>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {selectedPoint.nombre}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedPoint.descripcion}
                  </p>
                  {selectedPoint.detalles && (
                    <p className="text-xs text-muted-foreground">
                      {selectedPoint.detalles}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-sand to-stone/20 rounded-lg overflow-hidden">
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
                      {/* Quebrada de Humahuaca */}
                      <path
                        d="M15,45 Q35,40 55,45 Q75,50 85,45"
                        stroke="hsl(var(--cactus))"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.9"
                      />
                    </svg>
                  </div>

                  {/* Map Attribution */}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Mapa interactivo de Jujuy
                  </div>

                  {/* Convert coordinates to percentage positions for display */}
                  {getActivePoints().map((point) => {
                    // Simple coordinate conversion for display
                    // Jujuy bounds approximately: lat -21.5 to -24.5, lng -63.5 to -66.5
                    const x = ((point.coords[1] + 66.5) / 3) * 100; // longitude to x
                    const y = ((24.5 - point.coords[0]) / 3) * 100; // latitude to y (inverted)

                    return (
                      <button
                        key={point.id}
                        onClick={() => setSelectedPoint(point)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getMarkerColor(
                          point.tipo,
                        )} text-white rounded-full p-3 hover:scale-110 transition-all duration-300 shadow-lg border-2 border-white`}
                        style={{
                          left: `${Math.max(10, Math.min(90, x))}%`,
                          top: `${Math.max(10, Math.min(90, y))}%`,
                        }}
                        title={point.nombre}
                      >
                        <span className="text-sm">
                          {getMarkerIcon(point.tipo)}
                        </span>
                      </button>
                    );
                  })}

                  {/* Info Card for Selected Point */}
                  {selectedPoint && (
                    <div className="absolute top-4 left-4 right-4 z-10 bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {selectedPoint.tipo}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {selectedPoint.nombre}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {selectedPoint.descripcion}
                          </p>
                          {selectedPoint.detalles && (
                            <p className="text-xs text-muted-foreground">
                              {selectedPoint.detalles}
                            </p>
                          )}
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
