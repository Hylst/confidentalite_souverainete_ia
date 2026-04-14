import { BookOpen, Shield, Code, FileText } from "lucide-react";

export const navigation = [
  {
    title: "Introduction",
    icon: BookOpen,
    items: [
      { title: "Accueil", href: "/" },
    ]
  },
  {
    title: "Section 1 : RGPD & IA Act",
    icon: Shield,
    items: [
      { title: "Module 1 : Objectifs & Présentation", href: "/module/1" },
      { title: "Module 2 : Rappels RGPD & IA Act", href: "/module/2" },
      { title: "Module 3 : Identifier les données à risques", href: "/module/3" },
      { title: "Module 4 : Cartographier les usages", href: "/module/4" },
      { title: "Module 5 : Bonnes pratiques", href: "/module/5" },
    ]
  },
  {
    title: "Section 2 : Éthique de l'IA",
    icon: BookOpen,
    items: [
      { title: "Module 6 : Principes & Biais", href: "/module/6" },
      { title: "Module 7 : Propriété Intellectuelle", href: "/module/7" },
      { title: "Module 8 : Confidentialité", href: "/module/8" },
    ]
  },
  {
    title: "Section 3 : Ateliers Pratiques",
    icon: Code,
    items: [
      { title: "Atelier 1 : Classification IA Act", href: "/atelier/1" },
      { title: "Atelier 2 : Classification des Données", href: "/atelier/2" },
      { title: "Atelier 3 : Sécurité & Shadow IT", href: "/atelier/3" },
      { title: "Atelier 4 : Sécurité des Prompts", href: "/atelier/4" },
      { title: "Atelier 5 : Nettoyage & Anonymisation", href: "/atelier/5" },
      { title: "Atelier 6 : Déploiement éthique", href: "/atelier/6" },
    ]
  },
  {
    title: "Outils & Évaluation",
    icon: Shield,
    items: [
      { title: "Générateur de Charte IA", href: "/generator" },
      { title: "Examen Final & Certificat", href: "/exam" },
    ]
  },
  {
    title: "Annexes",
    icon: FileText,
    items: [
      { title: "Glossaire", href: "/annexe/glossaire" },
      { title: "Ressources", href: "/annexe/ressources" },
      { title: "Checklist", href: "/annexe/checklist" },
    ]
  }
];
