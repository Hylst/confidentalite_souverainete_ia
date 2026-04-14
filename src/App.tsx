/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/Layout";
import { ProgressProvider } from "./contexts/ProgressContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Module from "./pages/Module";
import Atelier from "./pages/Atelier";
import Annexe from "./pages/Annexe";
import Exam from "./pages/Exam";
import Generator from "./pages/Generator";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

export default function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <ProgressProvider>
          <Router basename={(import.meta as any).env.BASE_URL}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/module/:id" element={<ProtectedRoute><Module /></ProtectedRoute>} />
                <Route path="/atelier/:id" element={<ProtectedRoute><Atelier /></ProtectedRoute>} />
                <Route path="/annexe/:id" element={<ProtectedRoute><Annexe /></ProtectedRoute>} />
                <Route path="/exam" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
                <Route path="/generator" element={<ProtectedRoute><Generator /></ProtectedRoute>} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              </Routes>
            </Layout>
          </Router>
        </ProgressProvider>
      </ToastProvider>
    </HelmetProvider>
  );
}
