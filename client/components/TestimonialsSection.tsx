import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Pause, Filter, Users } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";

interface Testimony {
  id: string;
  name: string;
  community: string;
  age: number;
  avatar: string;
  title: string;
  text: string;
  audioUrl: string;
  image: string;
  tags: string[];
}

export default function TestimonialsSection() {
  const [selectedCommunity, setSelectedCommunity] = useState<string>("todas");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const testimonies: Testimony[] = [
    {
      id: "1",
      name: "María Condori",
      community: "Tilcara",
      age: 67,
      avatar: "/api/placeholder/120/120",
      title: "Recuerdos de la Quebrada",
      text: "Mi abuela me contaba sobre las antiguas ceremonias en el Pucará. Cada piedra tiene una historia, cada viento trae voces del pasado. Nosotros somos los guardianes de estas memorias.",
      audioUrl:
        "https://drive.google.com/uc?export=download&id=16EJPc-akuHW81if2RKl_X_Xf4SZEmr_T",
      image: "/api/placeholder/400/250",
      tags: ["tradiciones", "ancestros", "quebrada"],
    },
    {
      id: "2",
      name: "Carlos Mamani",
      community: "Purmamarca",
      age: 54,
      avatar: "/api/placeholder/120/120",
      title: "El Arte de Tejer Historias",
      text: "Cada color en nuestros tejidos cuenta una historia. El rojo de la cochinilla, el amarillo de la retama. Mis manos aprendieron estos secretos de mi madre, como ella de la suya.",
      audioUrl: "data:audio/wav;base64,", // Mock audio URL
      image: "/api/placeholder/400/250",
      tags: ["artesanías", "textiles", "tradición"],
    },
    {
      id: "3",
      name: "Rosa Vilca",
      community: "Humahuaca",
      age: 72,
      avatar: "/api/placeholder/120/120",
      title: "Cantos de la Pachamama",
      text: "Cuando éramos jóvenes, cada siembra era una fiesta. Cantábamos a la Pachamama, le pedíamos su bendición. La tierra nos escuchaba y nos daba abundancia.",
      audioUrl: "data:audio/wav;base64,", // Mock audio URL
      image: "/api/placeholder/400/250",
      tags: ["agricultura", "pachamama", "rituales"],
    },
    {
      id: "4",
      name: "Juan Chocobar",
      community: "Tilcara",
      age: 61,
      avatar: "/api/placeholder/120/120",
      title: "Resistencia y Memoria",
      text: "Nuestras tierras fueron siempre nuestras. Los papeles pueden decir otra cosa, pero la tierra conoce a sus hijos. Seguimos luchando por lo que es nuestro por derecho ancestral.",
      audioUrl: "data:audio/wav;base64,", // Mock audio URL
      image: "/api/placeholder/400/250",
      tags: ["resistencia", "territorio", "derechos"],
    },
    {
      id: "5",
      name: "Elena Wayra",
      community: "Iruya",
      age: 58,
      avatar: "/api/placeholder/120/120",
      title: "Medicina de los Abuelos",
      text: "Las plantas del cerro son nuestras maestras. La coca sagrada, la muña para el estómago, el palo santo para limpiar el alma. Este conocimiento no debe perderse.",
      audioUrl: "data:audio/wav;base64,", // Mock audio URL
      image: "/api/placeholder/400/250",
      tags: ["medicina", "plantas", "sabiduría"],
    },
    {
      id: "6",
      name: "Pedro Quispe",
      community: "Purmamarca",
      age: 69,
      avatar: "/api/placeholder/120/120",
      title: "Las Voces del Viento",
      text: "El cóndor vuela alto y ve todo. Nosotros somos como él, guardamos la visión completa de nuestra historia. Las montañas nos susurran secretos milenarios.",
      audioUrl: "data:audio/wav;base64,", // Mock audio URL
      image: "/api/placeholder/400/250",
      tags: ["naturaleza", "espiritualidad", "montañas"],
    },
  ];

  const communities = [
    "todas",
    ...Array.from(new Set(testimonies.map((t) => t.community))),
  ];

  const filteredTestimonies = testimonies.filter(
    (testimony) =>
      selectedCommunity === "todas" ||
      testimony.community === selectedCommunity,
  );

  const handleAudioPlay = (audioId: string) => {
    // Stop any currently playing audio
    if (playingAudio && audioRefs.current[playingAudio]) {
      audioRefs.current[playingAudio].pause();
      audioRefs.current[playingAudio].currentTime = 0;
    }

    if (playingAudio === audioId) {
      setPlayingAudio(null);
    } else {
      // Play the audio
      const audio = audioRefs.current[audioId];
      if (audio) {
        audio
          .play()
          .then(() => {
            setPlayingAudio(audioId);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            alert(
              "Error al reproducir el audio. Verifica que el archivo de Google Drive esté disponible públicamente.",
            );
          });
      }
    }
  };

  return (
    <section id="testimonios" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Testimonios Orales
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Escucha las voces de los pueblos originarios de Jujuy. Cada
            testimonio es un hilo en el tejido de nuestra memoria colectiva.
          </p>
        </div>

        {/* Community Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <div className="flex items-center space-x-2 mr-4">
            <Filter className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Filtrar por comunidad:</span>
          </div>
          {communities.map((community) => (
            <Button
              key={community}
              variant={selectedCommunity === community ? "default" : "outline"}
              onClick={() => setSelectedCommunity(community)}
              size="sm"
              className="capitalize"
            >
              {community}
            </Button>
          ))}
        </div>

        {/* Testimonies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonies.map((testimony) => (
            <Card
              key={testimony.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-muted">
                <PlaceholderImage
                  src={testimony.image}
                  alt={testimony.title}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Button
                  onClick={() => handleAudioPlay(testimony.id)}
                  className="absolute bottom-4 right-4 rounded-full w-12 h-12 p-0"
                  variant={
                    playingAudio === testimony.id ? "secondary" : "default"
                  }
                >
                  {playingAudio === testimony.id ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage src={testimony.avatar} alt={testimony.name} />
                    <AvatarFallback>
                      {testimony.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {testimony.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{testimony.community}</span>
                      <span>•</span>
                      <span>{testimony.age} años</span>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-semibold mb-3 text-foreground">
                  {testimony.title}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {testimony.text}
                </p>

                <div className="flex flex-wrap gap-1">
                  {testimony.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTestimonies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron testimonios para esta comunidad.
            </p>
          </div>
        )}

        {/* Hidden audio elements for better browser compatibility */}
        {testimonies.map((testimony) => (
          <audio
            key={`audio-${testimony.id}`}
            ref={(el) => {
              if (el) audioRefs.current[testimony.id] = el;
            }}
            src={testimony.audioUrl}
            preload="metadata"
            onEnded={() => setPlayingAudio(null)}
            onError={(e) => {
              console.error("Error loading audio:", e);
              setPlayingAudio(null);
            }}
            style={{ display: "none" }}
          />
        ))}
      </div>
    </section>
  );
}
