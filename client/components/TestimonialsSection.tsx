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
        "https://www.dropbox.com/scl/fi/7k7cju1muvvn6rcrkalzv/Recuerdos-de-la-Quebrada.opus?rlkey=76rujvlxu2jvqtu95oy3vzll6&st=pt18dkcs&dl=1",
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

  const createVoiceSimulation = (audioId: string, duration: number = 10) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const sampleRate = audioContext.sampleRate;
      const frameCount = sampleRate * duration;

      // Create buffer for voice-like audio
      const arrayBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
      const data = arrayBuffer.getChannelData(0);

      // Generate voice-like frequencies and modulation
      for (let i = 0; i < frameCount; i++) {
        const t = i / sampleRate;

        // Base voice frequency around 150Hz (male voice range)
        const baseFreq = 150 + Math.sin(t * 0.5) * 30;

        // Add formants (voice characteristics)
        const formant1 = Math.sin(2 * Math.PI * baseFreq * t) * 0.3;
        const formant2 = Math.sin(2 * Math.PI * baseFreq * 2.5 * t) * 0.2;
        const formant3 = Math.sin(2 * Math.PI * baseFreq * 4 * t) * 0.1;

        // Add some speech-like modulation
        const modulation = Math.sin(t * 8) * 0.3 + Math.sin(t * 12) * 0.2;

        // Combine and apply envelope
        let sample = (formant1 + formant2 + formant3) * (1 + modulation);

        // Apply envelope (fade in/out)
        const envelope = Math.min(1, Math.min(t * 10, (duration - t) * 2));
        sample *= envelope * 0.15; // Reduce volume

        data[i] = sample;
      }

      // Play the generated audio
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = arrayBuffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Dynamic volume control
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.5,
        audioContext.currentTime + 0.5,
      );
      gainNode.gain.linearRampToValueAtTime(
        0.5,
        audioContext.currentTime + duration - 1,
      );
      gainNode.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + duration,
      );

      source.start();

      setPlayingAudio(audioId);

      // Stop after duration
      setTimeout(() => {
        setPlayingAudio(null);
      }, duration * 1000);
    } catch (error) {
      console.error("Error creating voice simulation:", error);
      alert("Audio no disponible en este navegador.");
    }
  };

  const handleAudioPlay = (audioId: string) => {
    const testimony = testimonies.find((t) => t.id === audioId);
    if (!testimony) return;

    // Stop any currently playing audio
    if (playingAudio) {
      // Stop the actual audio element if it exists
      if (audioRefs.current[playingAudio]) {
        const currentAudio = audioRefs.current[playingAudio];
        if (currentAudio.pause) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      }

      // If clicking the same audio that's playing, just stop it
      if (playingAudio === audioId) {
        setPlayingAudio(null);
        return;
      }

      // Otherwise, stop current and continue to play the new one
      setPlayingAudio(null);
    }

    // For "Recuerdos de la Quebrada" (audioId "1"), try real audio first
    if (audioId === "1" && testimony.audioUrl.includes("dropbox.com")) {
      console.log('Playing Dropbox audio for "Recuerdos de la Quebrada"');

      // Create audio element
      if (!audioRefs.current[audioId]) {
        const audio = new Audio();
        audio.preload = "metadata";

        audio.addEventListener("loadstart", () => {
          console.log("Starting to load audio from Dropbox...");
        });

        audio.addEventListener("canplay", () => {
          console.log("Audio ready to play");
        });

        audio.addEventListener("ended", () => {
          console.log("Audio playback ended");
          setPlayingAudio(null);
        });

        audio.addEventListener("error", (e) => {
          console.error("Audio loading error:", e);
          console.log("Error details:", audio.error);
          setPlayingAudio(null);
          alert(
            "No se pudo cargar el audio desde Dropbox. Verifica que el enlace esté disponible públicamente.",
          );
          // Fallback to voice simulation
          setTimeout(() => createVoiceSimulation(audioId, 8), 100);
        });

        audioRefs.current[audioId] = audio;
      }

      const audio = audioRefs.current[audioId];
      audio.src = testimony.audioUrl;

      // First try to load the audio
      audio.load();

      // Then try to play
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Successfully playing Dropbox audio");
            setPlayingAudio(audioId);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setPlayingAudio(null);
            alert(
              "Error al reproducir el audio desde Dropbox. Usando simulación de voz como alternativa.",
            );
            createVoiceSimulation(audioId, 8);
          });
      }
    } else if (audioId === "1") {
      console.log('Using voice simulation for "Recuerdos de la Quebrada"');
      createVoiceSimulation(audioId, 8); // 8 seconds of voice-like audio
    } else {
      // For other testimonies, use musical chimes
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        const duration = 3;
        const frequency1 = 523.25; // C5
        const frequency2 = 659.25; // E5
        const frequency3 = 783.99; // G5

        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const osc3 = audioContext.createOscillator();

        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        const gain3 = audioContext.createGain();
        const masterGain = audioContext.createGain();

        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        gain1.connect(masterGain);
        gain2.connect(masterGain);
        gain3.connect(masterGain);
        masterGain.connect(audioContext.destination);

        osc1.frequency.value = frequency1;
        osc2.frequency.value = frequency2;
        osc3.frequency.value = frequency3;

        osc1.type = "sine";
        osc2.type = "sine";
        osc3.type = "sine";

        const now = audioContext.currentTime;
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.2, now + 0.1);
        masterGain.gain.linearRampToValueAtTime(0.2, now + duration - 0.5);
        masterGain.gain.linearRampToValueAtTime(0, now + duration);

        gain1.gain.setValueAtTime(0.4, now);
        gain2.gain.setValueAtTime(0.3, now);
        gain3.gain.setValueAtTime(0.2, now);

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);

        osc1.stop(now + duration);
        osc2.stop(now + duration);
        osc3.stop(now + duration);

        setPlayingAudio(audioId);

        setTimeout(() => {
          setPlayingAudio(null);
        }, duration * 1000);
      } catch (error) {
        console.error("Error creating synthetic audio:", error);
        alert("Audio no disponible en este navegador.");
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

        {/* Hidden audio element for Dropbox OPUS file */}
        <audio
          ref={(el) => {
            if (el) {
              audioRefs.current["1"] = el;
              // Add event listeners for better control
              el.addEventListener("ended", () => setPlayingAudio(null));
              el.addEventListener("pause", () => {
                if (playingAudio === "1") {
                  setPlayingAudio(null);
                }
              });
            }
          }}
          preload="metadata"
          style={{ display: "none" }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/7k7cju1muvvn6rcrkalzv/Recuerdos-de-la-Quebrada.opus?rlkey=76rujvlxu2jvqtu95oy3vzll6&st=pt18dkcs&dl=1"
            type="audio/opus"
          />
          <source
            src="https://www.dropbox.com/scl/fi/7k7cju1muvvn6rcrkalzv/Recuerdos-de-la-Quebrada.opus?rlkey=76rujvlxu2jvqtu95oy3vzll6&st=pt18dkcs&dl=1"
            type="audio/ogg"
          />
        </audio>
      </div>
    </section>
  );
}
