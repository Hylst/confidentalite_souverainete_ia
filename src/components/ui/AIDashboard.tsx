import { motion } from "motion/react";
import { TrendingUp, AlertTriangle, ShieldAlert, Users } from "lucide-react";
import { Card, CardContent } from "./Card";

export function AIDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 my-8">
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Users className="h-10 w-10 text-blue-600 mb-4" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2"
          >
            65%
          </motion.div>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            Des entreprises européennes utilisent l'IA en 2026
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <TrendingUp className="h-10 w-10 text-amber-600 mb-4" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-extrabold text-amber-700 dark:text-amber-400 mb-2"
          >
            &lt; 20%
          </motion.div>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            Ont une politique de gouvernance IA formalisée
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <AlertTriangle className="h-10 w-10 text-red-600 mb-4" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl font-extrabold text-red-700 dark:text-red-400 mb-2"
          >
            4,5 Md€
          </motion.div>
          <p className="text-sm font-medium text-red-900 dark:text-red-200">
            D'amendes RGPD cumulées en Europe
          </p>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50 dark:border-purple-900/50 dark:bg-purple-900/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <ShieldAlert className="h-10 w-10 text-purple-600 mb-4" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-4xl font-extrabold text-purple-700 dark:text-purple-400 mb-2"
          >
            23 M€
          </motion.div>
          <p className="text-sm font-medium text-purple-900 dark:text-purple-200">
            Première amende IA Act (Prestataire RH, 2025)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
