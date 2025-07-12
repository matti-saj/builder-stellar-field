import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string;
  significance: string;
  relatedEvents?: string[];
}

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      year: 1000,
      title: "Desarrollo de los Tilcaras",
      shortDescription:
        "Los tilcaras se establecen en la Quebrada de Humahuaca",
      fullDescription:
        "Los tilcaras, pueblo originario de la familia lingüística quechua, se asientan definitivamente en la región de la Quebrada de Humahuaca. Desarrollan una sociedad agrícola avanzada, construyen pucarás (fortalezas) y establecen rutas comerciales que conectan las tierras altas con los valles. Su legado arquitectónico y cultural permanece hasta hoy como testimonio de su organización social y conocimiento del territorio.",
      image: "https://www.dropbox.com/scl/fi/o7sf3g9dm1ccih0m8z83r/img_aborigen_tilcara.jpg?rlkey=xrjpsefbwbz2r5p9gk8wx4avh&st=pxshao4p&dl=1",
      category: "precolombino",
      significance: "Fundación de la identidad cultural de la región",
      relatedEvents: ["Construcción del Pucará de Tilcara"],
    },
    {
      id: "2",
      year: 1480,
      title: "Llegada del Imperio Inca",
      shortDescription: "Los incas incorporan la región a su imperio",
      fullDescription:
        "Durante el reinado de Túpac Inca Yupanqui, el Imperio Inca extiende sus dominios hasta la región de Jujuy. Se construye el Camino del Inca que atraviesa la Quebrada de Humahuaca, conectando Cusco con el noroeste argentino. Los incas respetan las tradiciones locales mientras incorporan su sistema administrativo, introducen nuevas técnicas agrícolas y consolidan las rutas comerciales andinas.",
      image: "https://www.dropbox.com/scl/fi/ilakt0msca1mzi9a1axhg/img_imperio_inca.webp?rlkey=n4jokdzoy5go5rrs6isl2t4bz&st=0z42qgk9&dl=1",
      category: "precolombino",
      significance: "Integración al sistema andino de intercambio",
      relatedEvents: ["Construcción del Qhapaq Ñan"],
    },
    {
      id: "3",
      year: 1593,
      title: "Fundación de San Salvador de Jujuy",
      shortDescription: "Francisco de Argañaraz y Murguía funda la ciudad",
      fullDescription:
        "El capitán Francisco de Argañaraz y Murguía funda la ciudad de San Salvador de Jujuy por orden del virrey del Perú. La fundación tiene propósitos estratégicos: controlar las rutas comerciales entre el Alto Perú y el Río de la Plata, y servir como avanzada en la frontera con los pueblos indígenas. La ciudad se convierte en un importante centro de intercambio comercial y cultural entre el mundo andino y el colonial español.",
      image: "https://www.dropbox.com/scl/fi/1zcfhatrhjjpfdnfl3axf/img_fundacion_jujuy.webp?rlkey=j2dtp3g1eswgc6rkfnlqnyyv0&st=xjzffar1&dl=1",
      category: "colonial",
      significance: "Inicio del período colonial en Jujuy",
      relatedEvents: ["Establecimiento del Cabildo", "Primera iglesia"],
    },
    {
      id: "4",
      year: 1812,
      title: "Éxodo Jujeño",
      shortDescription:
        "La población abandona la ciudad ante el avance realista",
      fullDescription:
        "Bajo el liderazgo del general Manuel Belgrano y con la colaboración del teniente coronel Marqués de Yavi, la población jujeña abandona sus hogares llevando consigo todos los recursos que pudieran ser útiles al enemigo. Este acto heroico, conocido como el Éxodo Jujeño, es fundamental para la estrategia independentista. La población se refugia en Tucumán, demostrando un compromiso extraordinario con la causa de la libertad americana.",
      image: "https://www.dropbox.com/scl/fi/yswxdaz6ahugqa6lc7mru/img_exodo_juje-o.webp?rlkey=ope6oms5klspuhy878cmxujzl&st=ie7s0ruq&dl=1",
      category: "independencia",
      significance: "Acto heroico clave en la independencia argentina",
      relatedEvents: ["Batalla de Tucumán", "Regreso de la población"],
    },
    /*
      id: "5",
      year: 1834,
      title: "Guerra Civil y Resistencia",
      shortDescription: "Conflictos entre unitarios y federales en la región",
      fullDescription:
        "Durante las guerras civiles argentinas, Jujuy se convierte en escenario de intensos conflictos entre unitarios y federales. La población rural, especialmente los pueblos originarios, participan activamente en estas luchas, defendiendo sus territorios y formas de vida tradicionales. Estos conflictos moldean la identidad política y social de la región, fortaleciendo la resistencia de las comunidades locales.",
      image: "/api/placeholder/400/300",
      category: "independencia",
      significance: "Consolidación de la identidad política jujeña",
      relatedEvents: ["Levantamientos populares", "Pacificación regional"],
    },*/
    {
      id: "6",
      year: 1884,
      title: "Llegada del Ferrocarril",
      shortDescription:
        "Se inaugura la línea férrea que conecta Jujuy con Buenos Aires",
      fullDescription:
        "La llegada del ferrocarril marca el inicio de la modernización de Jujuy. La línea conecta la provincia con Buenos Aires y facilita el transporte de materias primas, especialmente azúcar de los ingenios del sur provincial. Sin embargo, esta modernización también intensifica la explotación de los trabajadores rurales y profundiza las desigualdades sociales. El ferrocarril transforma la economía regional pero también genera nuevos conflictos sociales.",
      image: "https://www.dropbox.com/scl/fi/n9473bwatcc0k5mmul06c/img_ferrocarril.jpg?rlkey=a3b9eg7uzpnfd12fnwacjfw7n&st=c7e8czfv&dl=1",
      category: "moderno",
      significance: "Transformación económica y social",
      relatedEvents: ["Desarrollo de ingenios azucareros", "Migración interna"],
    },
    {
      id: "7",
      year: 1946,
      title: "Movimientos Obreros",
      shortDescription:
        "Fortalecimiento de los sindicatos en los ingenios azucareros",
      fullDescription:
        "Durante el primer gobierno de Juan Domingo Perón, los trabajadores de los ingenios azucareros se organizan y fortalecen sus sindicatos. Las mejores condiciones laborales y la política de derechos sociales del peronismo tienen un impacto significativo en Jujuy. Sin embargo, estas transformaciones también generan tensiones con los sectores tradicionales de poder, especialmente con los propietarios de ingenios y las élites conservadoras.",
      image: "https://www.dropbox.com/scl/fi/h6250upw80qynwbp3sux0/img_movimiento_obrero.jpg?rlkey=yzi0mvfi8wxusy6w6gp1oq79o&st=azs3cv7a&dl=1",
      category: "moderno",
      significance: "Avances en derechos laborales y sociales",
      relatedEvents: ["Sindicalización", "Conflictos con patronales"],
    },
    {
      id: "8",
      year: 2003,
      title: "Patrimonio de la Humanidad",
      shortDescription:
        "La Quebrada de Humahuaca es declarada Patrimonio Mundial",
      fullDescription:
        "La UNESCO declara a la Quebrada de Humahuaca como Patrimonio Cultural y Natural de la Humanidad, reconociendo su valor excepcional como paisaje cultural. Este reconocimiento destaca la continuidad de tradiciones andinas milenarias, la riqueza de su patrimonio arqueológico y la importancia de sus comunidades originarias. La declaración impulsa el turismo cultural pero también genera debates sobre la preservación de las tradiciones locales frente a la modernización.",
      image: "https://www.dropbox.com/scl/fi/d5alb5xgc94q6s9m0jrem/img_patrimonio_humanidad.jpg?rlkey=8bbqmqz5r47jhhv4tkzlve7mn&st=b09q9sxf&dl=1",
      category: "contemporáneo",
      significance: "Reconocimiento mundial del patrimonio cultural",
      relatedEvents: ["Aumento del turismo", "Programas de preservación"],
    },
    {
      id: "9",
      year: 2010,
      title: "Resistencia a la Megaminería",
      shortDescription: "Las comunidades se organizan contra proyectos mineros",
      fullDescription:
        "Las comunidades originarias y organizaciones ambientales inician una fuerte resistencia contra proyectos de megaminería a cielo abierto. La oposición se centra en la protección de glaciares, fuentes de agua y territorios sagrados. Estas luchas refuerzan la identidad de los pueblos originarios y su conexión ancestral con la tierra, generando un movimiento social que trasciende las fronteras provinciales y se articula con luchas similares en toda América Latina.",
      image: "https://www.dropbox.com/scl/fi/igiod4spd84843h1ixpvt/img_megamineria.jpg?rlkey=80fl1w3zqkyepzrdpe5gt8xqv&st=f91awv9g&dl=1",
      category: "contemporáneo",
      significance: "Defensa del territorio y recursos naturales",
      relatedEvents: ["Ley de glaciares", "Movilizaciones populares"],
    },
  ];

  const categories = [
    { id: "todas", label: "Todas las épocas", color: "bg-muted" },
    { id: "precolombino", label: "Precolombino", color: "bg-clay" },
    { id: "colonial", label: "Colonial", color: "bg-primary" },
    { id: "independencia", label: "Independencia", color: "bg-cactus" },
    { id: "moderno", label: "Moderno", color: "bg-stone" },
    { id: "contemporáneo", label: "Contemporáneo", color: "bg-accent" },
  ];

  const filteredEvents = timelineEvents.filter(
    (event) =>
      selectedCategory === "todas" || event.category === selectedCategory,
  );

  const toggleExpanded = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat?.color || "bg-muted";
  };

  return (
    <section id="timeline" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Línea de Tiempo Histórica
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recorre los momentos más importantes de la historia de Jujuy, desde
            las culturas precolombinas hasta la actualidad.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <div className="flex items-center space-x-2 mr-4">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Filtrar por época:</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              size="sm"
              className="capitalize"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-border hidden lg:block" />

          {/* Timeline events */}
          <div className="space-y-8 lg:space-y-0">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Year marker */}
                <div
                  className={`lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:top-8 ${
                    index % 2 === 0
                      ? "lg:col-start-1 lg:text-right lg:pr-8"
                      : "lg:col-start-2 lg:text-left lg:pl-8"
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-lg">
                    {event.year}
                  </div>
                </div>

                {/* Event content */}
                <div
                  className={`${
                    index % 2 === 0
                      ? "lg:col-start-1 lg:text-right"
                      : "lg:col-start-2 lg:text-left"
                  } mt-4 lg:mt-12`}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Event header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge
                              className={`${getCategoryColor(event.category)} text-white`}
                            >
                              {event.category}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.year}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {event.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Event image */}
                      <div className="mb-4">
                        <PlaceholderImage
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 rounded-lg"
                          fallbackContent={
                            <div className="text-center">
                              <Calendar className="w-12 h-12 mx-auto mb-2 text-stone-foreground opacity-60" />
                              <p className="text-sm text-stone-foreground opacity-80">
                                {event.title}
                              </p>
                            </div>
                          }
                        />
                      </div>

                      {/* Expand button */}
                      <Button
                        variant="outline"
                        onClick={() => toggleExpanded(event.id)}
                        className="w-full"
                      >
                        {expandedEvent === event.id ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            Mostrar menos
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Leer más
                          </>
                        )}
                      </Button>

                      {/* Expanded content */}
                      {expandedEvent === event.id && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Descripción detallada
                              </h4>
                              <p className="text-muted-foreground leading-relaxed">
                                {event.fullDescription}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Significado histórico
                              </h4>
                              <p className="text-muted-foreground">
                                {event.significance}
                              </p>
                            </div>

                            {event.relatedEvents && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  Eventos relacionados
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {event.relatedEvents.map((related, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {related}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron eventos para esta época.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
