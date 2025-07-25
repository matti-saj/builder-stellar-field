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
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const synthAudioRefs = useRef<{ [key: string]: { stop: () => void } }>({});

  const testimonies: Testimony[] = [
    {
      id: "1",
      name: "María Condori",
      community: "Tilcara",
      age: 67,
      avatar: "/api/placeholder/120/120",
      title: "Recuerdos de la Quebrada",
      text: "Mi abuela me contaba sobre las antiguas ceremonias en el Pucará. Cada piedra tiene una historia, cada viento trae voces del pasado. Nosotros somos los guardianes de estas memorias.",
      audioUrl: "https://www.dropbox.com/scl/fi/8n1frouagia2c242sh6pc/Recuerdos-de-la-Quebrada.mp3?rlkey=6jjgbqgucnrom25rhmc5inr5v&st=ti7d9tc1&dl=1",
      image: "https://www.dropbox.com/scl/fi/71jpb7u4o0dby4gpbutjw/img_recuerdo_pucara.webp?rlkey=kndequss29f7use36icz5j64a&st=k23feyoz&dl=1",
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
      audioUrl: "https://www.dropbox.com/scl/fi/uwo0dfx0va68ofd3uot9d/El-Arte-de-Tejer.mp3?rlkey=oo5bej09zwuy3d44j96fyya54&st=4ah5xw3r&dl=1",
      image: "https://www.dropbox.com/scl/fi/tqw5c8vpayx72p2jc73gy/img_tejidos.webp?rlkey=8rzu58iklohainwyh5c25ud0m&st=zq1nhmic&dl=1",
      tags: ["artesanías", "textiles", "tradición"],
    },
    {
      id: "3",
      name: "Rosa Vilca",
      community: "Humahuaca",
      age: 67,
      avatar: "/api/placeholder/120/120",
      title: "Cantos de la Pachamama",
      text: "Cuando éramos jóvenes, cada siembra era una fiesta. Cantábamos a la Pachamama, le pedíamos su bendición. La tierra nos escuchaba y nos daba abundancia.",
      audioUrl: "https://www.dropbox.com/scl/fi/eig8g0jqpe4yvycr53krp/Cantos-Pachamama.mp3?rlkey=to7sqdqlwg62d29slh501vphl&st=9x1sj9ms&dl=1",
      image: "https://www.dropbox.com/scl/fi/dnlvfyj6hveoqf88zvxgp/img_cantos.webp?rlkey=sutikyrif26dfpasmag1wuu0z&st=tk5qhby8&dl=1",
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
      audioUrl: "https://www.dropbox.com/scl/fi/m12pk1pcbp8zbr18lxoq2/Resistencia-y-memoria.mp3?rlkey=ycxa356po14zwhx55rl8bahpj&st=mknc4ptv&dl=1",
      image: "https://www.dropbox.com/scl/fi/tedaaa9ji9zf4nusth6ab/img_resistencia_memoria.jpg?rlkey=tnkzyz7mwh8maid0vxwah9obn&st=suya15he&dl=1",
      tags: ["resistencia", "territorio", "derechos"],
    },
    {
      id: "5",
      name: "Elena Wayra",
      community: "Iruya",
      age: 80,
      avatar: "/api/placeholder/120/120",
      title: "Medicina de los Abuelos",
      text: "Las plantas del cerro son nuestras maestras. La coca sagrada, la muña para el estómago, el palo santo para limpiar el alma. Este conocimiento no debe perderse.",
      audioUrl: "https://www.dropbox.com/scl/fi/f0qu2rdjna5ii2d16fjva/Medicina-Abuelos.mp3?rlkey=yvr5gy67kv2celu4b1rxz6t2r&st=nxzbhgqs&dl=1",
      image: "https://www.dropbox.com/scl/fi/lc5tyjjc70fmy6lvvm5zz/img_medicina_abuelos.jpg?rlkey=zszt05pyu74v7c967awiec5df&st=o8n29fth&dl=1",
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
      audioUrl: "https://www.dropbox.com/scl/fi/4mi3v4i6avoqqia9z001c/Las-voces-del-viento.mp3?rlkey=zswb7nccpxmuqut85snkhl7ef&st=h77uicm7&dl=1",
      image: "https://www.dropbox.com/scl/fi/2il11b24mr3xg759nw8f3/img_voces_viento.jpg?rlkey=nrkoj6u4y8yqht8120mtiip7e&st=kfn4tr10&dl=1",
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

      // Store reference for stopping
      synthAudioRefs.current[audioId] = {
        stop: () => {
          try {
            source.stop();
            gainNode.disconnect();
            setPlayingAudio(null);
          } catch (e) {
            console.log("Audio already stopped");
          }
        },
      };

      setPlayingAudio(audioId);

      // Auto-stop after duration
      const timeoutId = setTimeout(() => {
        if (synthAudioRefs.current[audioId]) {
          delete synthAudioRefs.current[audioId];
        }
        setPlayingAudio(null);
      }, duration * 1000);

      // Add timeout to the stop function
      const originalStop = synthAudioRefs.current[audioId].stop;
      synthAudioRefs.current[audioId].stop = () => {
        clearTimeout(timeoutId);
        originalStop();
      };
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
      // Stop HTML audio element if it exists
      if (audioRefs.current[playingAudio]) {
        const currentAudio = audioRefs.current[playingAudio];
        if (currentAudio.pause) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      }

      // Stop synthetic audio if it exists
      if (synthAudioRefs.current[playingAudio]) {
        synthAudioRefs.current[playingAudio].stop();
        delete synthAudioRefs.current[playingAudio];
      }

      // If clicking the same audio that's playing, just stop it
      if (playingAudio === audioId) {
        setPlayingAudio(null);
        return;
      }

      // Otherwise, stop current and continue to play the new one
      setPlayingAudio(null);
    }

    // For testimonies with Dropbox audio (audioId "1" and "3"), try real audio first
    if (
      (audioId === "1" || audioId === "2" || audioId === "3" || audioId === "4" || audioId === "5" || audioId === "6") &&
      testimony.audioUrl.includes("dropbox.com")
    ) {
      console.log(`🎵 Playing Dropbox audio for "${testimony.title}"`);

      const audio = audioRefs.current[audioId];
      if (!audio) {
        console.error("Audio element not found");
        createVoiceSimulation(audioId, 8);
        return;
      }

      // Show loading state immediately
      setLoadingAudio(audioId);

      // Check if audio is already loaded enough to play
      if (audio.readyState >= 3) {
        // HAVE_FUTURE_DATA or better
        console.log("🚀 Audio already buffered, playing immediately");
        setLoadingAudio(null);
        audio
          .play()
          .then(() => {
            setPlayingAudio(audioId);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setLoadingAudio(null);
            alert(
              "Error al reproducir el audio desde Dropbox. Usando simulación de voz como alternativa.",
            );
            createVoiceSimulation(audioId, 8);
          });
      } else {
        console.log("📡 Buffering audio...");

        // Listen for when it's ready to play
        const onCanPlay = () => {
          console.log("▶️ Audio ready, starting playback");
          setLoadingAudio(null);
          audio.removeEventListener("canplay", onCanPlay);
          audio
            .play()
            .then(() => {
              setPlayingAudio(audioId);
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
              setLoadingAudio(null);
              alert(
                "Error al reproducir el audio desde Dropbox. Usando simulación de voz como alternativa.",
              );
              createVoiceSimulation(audioId, 8);
            });
        };

        // Listen for errors
        const onError = () => {
          console.error("Error loading audio");
          setLoadingAudio(null);
          audio.removeEventListener("canplay", onCanPlay);
          audio.removeEventListener("error", onError);
          alert(
            "No se pudo cargar el audio desde Dropbox. Usando simulación de voz como alternativa.",
          );
          createVoiceSimulation(audioId, 8);
        };

        audio.addEventListener("canplay", onCanPlay);
        audio.addEventListener("error", onError);

        // Force reload if needed
        if (audio.readyState === 0) {
          audio.load();
        }

        // Timeout after 5 seconds
        setTimeout(() => {
          if (loadingAudio === audioId) {
            console.log("⏰ Audio loading timeout, using fallback");
            setLoadingAudio(null);
            audio.removeEventListener("canplay", onCanPlay);
            audio.removeEventListener("error", onError);
            createVoiceSimulation(audioId, 8);
          }
        }, 5000);
      }
    } else if (audioId === "1" || audioId === "2" || audioId === "3" || audioId === "4" || audioId === "5" || audioId === "6") {
      console.log(`Using voice simulation for "${testimony.title}"`);
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
                  disabled={loadingAudio === testimony.id}
                >
                  {loadingAudio === testimony.id ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : playingAudio === testimony.id ? (
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

        {/* Hidden audio elements for Dropbox OPUS files with optimized preloading */}
        {/* Audio for "Recuerdos de la Quebrada" */}
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

              // Preload immediately when component mounts
              el.addEventListener("loadstart", () =>
                console.log(
                  "🔄 Iniciando carga de Recuerdos de la Quebrada...",
                ),
              );
              el.addEventListener("loadedmetadata", () =>
                console.log("📊 Metadata cargada (Recuerdos)"),
              );
              el.addEventListener("loadeddata", () =>
                console.log("📁 Datos iniciales cargados (Recuerdos)"),
              );
              el.addEventListener("canplay", () =>
                console.log("▶️ Recuerdos listo para reproducir"),
              );
              el.addEventListener("canplaythrough", () =>
                console.log("🚀 Recuerdos completamente cargado"),
              );
            }
          }}
          preload="auto"
          style={{ display: "none" }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/8n1frouagia2c242sh6pc/Recuerdos-de-la-Quebrada.mp3?rlkey=6jjgbqgucnrom25rhmc5inr5v&st=ti7d9tc1&dl=1"
            type="audio/mpeg"
          />
        </audio>

        {/* Audio for "El Arte de Tejer" */}
        <audio
          ref={(el) => {
            if (el) {
              audioRefs.current["2"] = el;

              el.addEventListener("ended", () => setPlayingAudio(null));
              el.addEventListener("pause", () => {
                if (playingAudio === "2") {
                  setPlayingAudio(null);
                }
              });

              el.addEventListener("loadstart", () =>
                console.log("🔄 Iniciando carga de El Arte de Tejer..."),
              );
              el.addEventListener("loadedmetadata", () =>
                console.log("📊 Metadata cargada (Tejer)"),
              );
              el.addEventListener("loadeddata", () =>
                console.log("📁 Datos iniciales cargados (Tejer)"),
              );
              el.addEventListener("canplay", () =>
                console.log("▶️ Tejer listo para reproducir"),
              );
              el.addEventListener("canplaythrough", () =>
                console.log("🚀 Tejer completamente cargado"),
              );
            }
          }}
          preload="auto"
          style={{ display: "none" }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/uwo0dfx0va68ofd3uot9d/El-Arte-de-Tejer.mp3?rlkey=oo5bej09zwuy3d44j96fyya54&st=4ah5xw3r&dl=1"
            type="audio/mpeg"
          />
        </audio>

        {/* Audio for "Cantos de la Pachamama" */}
        <audio
          ref={(el) => {
            if (el) {
              audioRefs.current["3"] = el;

              // Add event listeners for better control
              el.addEventListener("ended", () => setPlayingAudio(null));
              el.addEventListener("pause", () => {
                if (playingAudio === "3") {
                  setPlayingAudio(null);
                }
              });

              // Preload immediately when component mounts
              el.addEventListener("loadstart", () =>
                console.log("🔄 Iniciando carga de Cantos de la Pachamama..."),
              );
              el.addEventListener("loadedmetadata", () =>
                console.log("📊 Metadata cargada (Pachamama)"),
              );
              el.addEventListener("loadeddata", () =>
                console.log("📁 Datos iniciales cargados (Pachamama)"),
              );
              el.addEventListener("canplay", () =>
                console.log("▶️ Cantos Pachamama listo para reproducir"),
              );
              el.addEventListener("canplaythrough", () =>
                console.log("🚀 Cantos Pachamama completamente cargado"),
              );
            }
          }}
          preload="auto"
          style={{ display: "none" }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/eig8g0jqpe4yvycr53krp/Cantos-Pachamama.mp3?rlkey=to7sqdqlwg62d29slh501vphl&st=9x1sj9ms&dl=1"
            type="audio/mpeg"
          />
        </audio>

        {/* Audio for "Resistencia y Memoria" */}
        <audio
          ref={(el) => {
            if (el) {
              audioRefs.current["4"] = el;

              // Add event listeners for better control
              el.addEventListener("ended", () => setPlayingAudio(null));
              el.addEventListener("pause", () => {
                if (playingAudio === "4") {
                  setPlayingAudio(null);
                }
              });

              // Optional: Debug preload lifecycle
              el.addEventListener("loadstart", () =>
                console.log("🔄 Iniciando carga de Resistencia y Memoria..."),
              );
              el.addEventListener("loadedmetadata", () =>
                console.log("📊 Metadata cargada (Resistencia)"),
              );
              el.addEventListener("loadeddata", () =>
                console.log("📁 Datos iniciales cargados (Resistencia)"),
              );
              el.addEventListener("canplay", () =>
                console.log("▶️ Resistencia listo para reproducir"),
              );
              el.addEventListener("canplaythrough", () =>
                console.log("🚀 Resistencia completamente cargado"),
              );
            }
          }}
          preload="auto"
          style={{ display: "none" }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/m12pk1pcbp8zbr18lxoq2/Resistencia-y-memoria.mp3?rlkey=ycxa356po14zwhx55rl8bahpj&st=mknc4ptv&dl=1"
            type="audio/mpeg"
          />
        </audio>

        {/* Audio for "Medicina de los Abuelos" */}
        <audio
          ref={(el) => {
            if (el) {
              audioRefs.current["5"] = el;

              el.addEventListener("ended", () => setPlayingAudio(null));
              el.addEventListener("pause", () => {
                if (playingAudio === "5") {
                  setPlayingAudio(null);
                }
              });

              el.addEventListener("loadstart", () =>
                console.log("🔄 Iniciando carga de Medicina de los Abuelos..."),
              );
              el.addEventListener("loadedmetadata", () =>
                console.log("📊 Metadata cargada (Medicina)"),
              );
              el.addEventListener("loadeddata", () =>
                console.log("📁 Datos iniciales cargados (Medicina)"),
              );
              el.addEventListener("canplay", () =>
                console.log("▶️ Medicina lista para reproducir"),
              );
              el.addEventListener("canplaythrough", () =>
                console.log("🚀 Medicina completamente cargada"),
              );
            }
          }}
          preload="auto"
          style={{ display: "none" }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/f0qu2rdjna5ii2d16fjva/Medicina-Abuelos.mp3?rlkey=yvr5gy67kv2celu4b1rxz6t2r&st=nxzbhgqs&dl=1"
            type="audio/mpeg"
          />
        </audio>

        {/* Audio for "Las Voces del Viento" */}
        <audio
          ref={(el) => {
            if (el) {
              audioRefs.current["6"] = el;

              el.addEventListener("ended", () => setPlayingAudio(null));
              el.addEventListener("pause", () => {
                if (playingAudio === "6") {
                  setPlayingAudio(null);
                }
              });

              el.addEventListener("loadstart", () =>
                console.log("🔄 Iniciando carga de Las Voces del Viento..."),
              );
              el.addEventListener("loadedmetadata", () =>
                console.log("📊 Metadata cargada (Viento)"),
              );
              el.addEventListener("loadeddata", () =>
                console.log("📁 Datos iniciales cargados (Viento)"),
              );
              el.addEventListener("canplay", () =>
                console.log("▶️ Viento listo para reproducir"),
              );
              el.addEventListener("canplaythrough", () =>
                console.log("🚀 Viento completamente cargado"),
              );
            }
          }}
          preload="auto"
          style={{ display: "none" }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/4mi3v4i6avoqqia9z001c/Las-voces-del-viento.mp3?rlkey=zswb7nccpxmuqut85snkhl7ef&st=h77uicm7&dl=1"
            type="audio/mpeg"
          />
        </audio>
      </div>
    </section>
  );
}
