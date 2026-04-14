import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { examQuestions } from "@/src/data/examData";
import { CheckCircle2, XCircle, Award, Printer, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";
import confetti from "canvas-confetti";
import { SEO } from "@/src/components/SEO";
import { useProgress } from "@/src/contexts/ProgressContext";
import { useLocation } from "react-router-dom";

export default function Exam() {
  const { isCompleted, toggleCompletion } = useProgress();
  const location = useLocation();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleStart = () => {
    if (userName.trim().length > 0) {
      setNameSubmitted(true);
      setStarted(true);
    }
  };

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion]: optionId });
    
    if (currentQuestion < examQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(q => q + 1), 300);
    } else {
      setTimeout(() => {
        setFinished(true);
      }, 300);
    }
  };

  const calculateScore = () => {
    let score = 0;
    examQuestions.forEach((q, index) => {
      if (answers[index] === q.correctId) score++;
    });
    return score;
  };

  const score = calculateScore();
  const passMark = 8; // 80%
  const passed = score >= passMark;

  useEffect(() => {
    if (finished && passed) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#f59e0b']
      });
    }
  }, [finished, passed]);

  const handlePrint = () => {
    window.print();
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setFinished(false);
    setNameSubmitted(false);
    setUserName("");
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SEO 
          title="Examen Final" 
          description="Passez l'examen final sur la conformité IA et le RGPD pour obtenir votre certificat de réussite."
          path="/exam"
        />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-4">Évaluation Finale & Certification</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Testez vos connaissances sur la conformité IA & RGPD. Obtenez 80% de bonnes réponses pour débloquer votre certificat.
          </p>
        </div>

        <Card className="border-2 border-slate-200 dark:border-slate-800">
          <CardContent className="p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Entrez votre nom complet (pour le certificat) :
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Jean Dupont"
              />
            </div>
            <button
              onClick={handleStart}
              disabled={userName.trim().length === 0}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Commencer l'examen ({examQuestions.length} questions)
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8 print:hidden">
          <h2 className="text-3xl font-extrabold mb-2">Résultats de l'examen</h2>
          <p className="text-xl">
            Votre score : <span className={cn("font-bold", passed ? "text-emerald-600" : "text-red-600")}>{score} / {examQuestions.length}</span>
          </p>
        </div>

        {passed ? (
          <div className="space-y-8">
            {/* Certificate */}
            <div className="relative p-1 bg-gradient-to-br from-blue-500 via-emerald-500 to-blue-600 rounded-2xl print:bg-none print:p-0">
              <div className="bg-white dark:bg-slate-950 p-12 rounded-xl text-center border-4 border-double border-slate-200 dark:border-slate-800 print:border-8 print:border-slate-300">
                <Award className="h-20 w-20 mx-auto text-blue-600 mb-6" />
                <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-2 uppercase tracking-widest">Certificat de Réussite</h1>
                <p className="text-lg text-slate-500 mb-8">Ce document certifie que</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8 italic">{userName}</p>
                <p className="text-lg text-slate-700 dark:text-slate-300 max-w-lg mx-auto mb-12">
                  a complété avec succès la formation "Conformité IA & RGPD" et a démontré une excellente compréhension des enjeux éthiques et légaux.
                </p>
                <div className="flex justify-between items-end border-t-2 border-slate-200 dark:border-slate-800 pt-8 mt-8">
                  <div className="text-left">
                    <p className="font-bold">Date</p>
                    <p className="text-slate-500">{new Date().toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Score</p>
                    <p className="text-slate-500">{score}/{examQuestions.length} ({Math.round(score/examQuestions.length*100)}%)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center print:hidden">
              <button
                onClick={() => toggleCompletion(location.pathname)}
                className={cn(
                  "px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2",
                  isCompleted(location.pathname)
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                )}
              >
                <CheckCircle2 className="h-5 w-5" />
                {isCompleted(location.pathname) ? "Terminé" : "Marquer comme terminé"}
              </button>
              <button 
                onClick={handlePrint}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Printer className="h-5 w-5" /> Imprimer / Sauvegarder PDF
              </button>
            </div>
          </div>
        ) : (
          <Card className="text-center p-8 border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20">
            <XCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Score insuffisant</h3>
            <p className="text-red-900 dark:text-red-200 mb-6">
              Il faut au moins {passMark} bonnes réponses pour obtenir le certificat. Révisez les modules et réessayez !
            </p>
            <button 
              onClick={handleRestart}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="h-5 w-5" /> Repasser l'examen
            </button>
          </Card>
        )}
      </div>
    );
  }

  const q = examQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-8" aria-live="polite">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentQuestion + 1} sur {examQuestions.length}</span>
          <span>{Math.round(((currentQuestion) / examQuestions.length) * 100)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800" role="progressbar" aria-valuenow={Math.round(((currentQuestion) / examQuestions.length) * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className="h-full bg-blue-600 transition-all duration-300 ease-out" 
            style={{ width: `${((currentQuestion) / examQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <CardContent className="p-8">
          <h2 id="exam-question" className="text-xl font-bold mb-6">{q.question}</h2>
          <div className="space-y-3" role="group" aria-labelledby="exam-question">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                className="w-full text-left p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="font-bold mr-3 text-blue-600 dark:text-blue-400">{opt.id}.</span>
                {opt.text}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
