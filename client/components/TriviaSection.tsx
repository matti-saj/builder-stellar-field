import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Star,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: "fácil" | "medio" | "difícil";
}

interface QuizState {
  currentQuestion: number;
  selectedAnswer: number | null;
  showResult: boolean;
  score: number;
  answeredQuestions: boolean[];
}

export default function TriviaSection() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    answeredQuestions: [],
  });

  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions: Question[] = [
    {
      id: "1",
      question:
        "¿Cuál es el nombre del sitio arqueológico más importante de la Quebrada de Humahuaca?",
      options: [
        "Pucará de Tilcara",
        "Ruinas de Quilmes",
        "Shincal",
        "Samaipata",
      ],
      correctAnswer: 0,
      explanation:
        "El Pucará de Tilcara es una fortaleza precolombina que fue centro político y religioso de los tilcaras, pueblo originario de la región.",
      category: "Historia",
      difficulty: "medio",
    },
    {
      id: "2",
      question: "¿Qué significa 'Pachamama' en la cultura andina?",
      options: [
        "Diosa del agua",
        "Madre Tierra",
        "Espíritu del viento",
        "Guardián de las montañas",
      ],
      correctAnswer: 1,
      explanation:
        "Pachamama significa 'Madre Tierra' en quechua y es una deidad central en la cosmovisión andina, representando la fertilidad y la vida.",
      category: "Cultura",
      difficulty: "fácil",
    },
    {
      id: "3",
      question:
        "¿Cuál es la formación geológica que le da los colores únicos al Cerro de los Siete Colores?",
      options: [
        "Sedimentos marinos",
        "Rocas volcánicas",
        "Estratos sedimentarios",
        "Cristales de cuarzo",
      ],
      correctAnswer: 2,
      explanation:
        "Los colores se deben a diferentes estratos sedimentarios depositados a lo largo de millones de años, cada uno con minerales distintos.",
      category: "Geografía",
      difficulty: "difícil",
    },
    {
      id: "4",
      question: "¿Qué producto tradicional se extrae de las Salinas Grandes?",
      options: ["Oro", "Sal", "Cobre", "Litio"],
      correctAnswer: 1,
      explanation:
        "Las Salinas Grandes son una importante fuente de sal desde tiempos precolombinos, siendo un recurso vital para las comunidades locales.",
      category: "Geografía",
      difficulty: "fácil",
    },
    {
      id: "5",
      question:
        "¿Cuál es la principal fibra textil utilizada tradicionalmente por los pueblos originarios de Jujuy?",
      options: ["Algodón", "Lana de llama", "Seda", "Lino"],
      correctAnswer: 1,
      explanation:
        "La lana de llama y vicuña han sido fundamentales en la tradición textil andina por su calidad y adaptación al clima de altura.",
      category: "Cultura",
      difficulty: "medio",
    },
    {
      id: "6",
      question:
        "¿Qué significado tiene el color rojo en los textiles tradicionales jujeños?",
      options: [
        "Representa el fuego sagrado",
        "Simboliza la cochinilla",
        "Indica la sangre de los ancestros",
        "Todas las anteriores",
      ],
      correctAnswer: 3,
      explanation:
        "El rojo tiene múltiples significados en la cultura andina: puede representar el fuego sagrado, provenir de la cochinilla como tinte natural, y simbolizar la conexión con los ancestros.",
      category: "Cultura",
      difficulty: "difícil",
    },
    {
      id: "7",
      question:
        "¿En qué año fue declarada la Quebrada de Humahuaca Patrimonio de la Humanidad por la UNESCO?",
      options: ["2001", "2003", "2005", "2007"],
      correctAnswer: 1,
      explanation:
        "La Quebrada de Humahuaca fue declarada Patrimonio Cultural y Natural de la Humanidad por la UNESCO en 2003, reconociendo su valor excepcional.",
      category: "Historia",
      difficulty: "medio",
    },
    {
      id: "8",
      question:
        "¿Cuál es la principal amenaza actual para las comunidades originarias de Jujuy?",
      options: [
        "El cambio climático",
        "La pérdida de tierras ancestrales",
        "La migración juvenil",
        "Todas las anteriores",
      ],
      correctAnswer: 3,
      explanation:
        "Las comunidades enfrentan múltiples desafíos: cambio climático que afecta sus cultivos, disputas territoriales, y migración de jóvenes hacia las ciudades.",
      category: "Actualidad",
      difficulty: "difícil",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
    }));
  };

  const handleSubmitAnswer = () => {
    const currentQ = questions[quizState.currentQuestion];
    const isCorrect = quizState.selectedAnswer === currentQ.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      showResult: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      answeredQuestions: [
        ...prev.answeredQuestions.slice(0, prev.currentQuestion),
        isCorrect,
        ...prev.answeredQuestions.slice(prev.currentQuestion + 1),
      ],
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        showResult: false,
      }));
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      answeredQuestions: [],
    });
    setIsQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (quizState.score / questions.length) * 100;
    if (percentage >= 80)
      return "¡Excelente! Eres un experto en cultura jujeña";
    if (percentage >= 60) return "¡Muy bien! Tienes buenos conocimientos";
    if (percentage >= 40) return "Bien, pero puedes aprender más";
    return "Te recomendamos explorar más sobre Jujuy";
  };

  const getScoreColor = () => {
    const percentage = (quizState.score / questions.length) * 100;
    if (percentage >= 80) return "text-cactus";
    if (percentage >= 60) return "text-primary";
    if (percentage >= 40) return "text-yellow-600";
    return "text-destructive";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "fácil":
        return "bg-cactus text-cactus-foreground";
      case "medio":
        return "bg-primary text-primary-foreground";
      case "difícil":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isQuizComplete) {
    return (
      <section id="trivia" className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  ¡Trivia Completada!
                </h2>
                <p className="text-lg text-muted-foreground">
                  Has terminado el desafío educativo sobre Jujuy
                </p>
              </div>

              <div className="mb-8">
                <div className="text-6xl font-bold mb-2">
                  <span className={getScoreColor()}>
                    {quizState.score}/{questions.length}
                  </span>
                </div>
                <p className="text-xl text-muted-foreground mb-4">
                  {Math.round((quizState.score / questions.length) * 100)}%
                  correctas
                </p>
                <p className={`text-lg font-semibold ${getScoreColor()}`}>
                  {getScoreMessage()}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cactus">
                    {quizState.answeredQuestions.filter(Boolean).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Correctas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">
                    {
                      quizState.answeredQuestions.filter((a) => a === false)
                        .length
                    }
                  </div>
                  <p className="text-sm text-muted-foreground">Incorrectas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {questions.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>

              <Button onClick={handleRestartQuiz} size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reintentar Trivia
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100;

  return (
    <section id="trivia" className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trivia Educativa
          </h2>
          <p className="text-lg text-muted-foreground">
            Pon a prueba tus conocimientos sobre la cultura e historia de Jujuy
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            {/* Progress and question info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">
                    Pregunta {quizState.currentQuestion + 1} de{" "}
                    {questions.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{currentQuestion.category}</Badge>
                  <Badge
                    className={getDifficultyColor(currentQuestion.difficulty)}
                  >
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Answer options */}
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      quizState.selectedAnswer === index ? "default" : "outline"
                    }
                    onClick={() => handleAnswerSelect(index)}
                    disabled={quizState.showResult}
                    className="p-4 h-auto text-left justify-start"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          quizState.selectedAnswer === index
                            ? "bg-primary-foreground text-primary border-primary-foreground"
                            : "border-muted-foreground text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {quizState.showResult && (
                        <div className="ml-auto">
                          {index === currentQuestion.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-cactus" />
                          ) : quizState.selectedAnswer === index ? (
                            <XCircle className="w-5 h-5 text-destructive" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Result explanation */}
            {quizState.showResult && (
              <div className="mb-8 p-4 bg-muted rounded-lg">
                <div className="flex items-start space-x-3">
                  {quizState.selectedAnswer ===
                  currentQuestion.correctAnswer ? (
                    <CheckCircle className="w-6 h-6 text-cactus mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive mt-1" />
                  )}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {quizState.selectedAnswer ===
                      currentQuestion.correctAnswer
                        ? "¡Correcto!"
                        : "Incorrecto"}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Puntuación: {quizState.score}/{questions.length}
                </span>
              </div>

              <div className="space-x-2">
                {!quizState.showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={quizState.selectedAnswer === null}
                  >
                    Confirmar Respuesta
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    {quizState.currentQuestion < questions.length - 1
                      ? "Siguiente Pregunta"
                      : "Ver Resultados"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
