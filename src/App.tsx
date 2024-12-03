import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import BirthChartAnalysis from "./pages/BirthChartAnalysis";
import Astrologers from "./pages/Astrologers";
import SingleQuestionAstrology from "./pages/SingleQuestionAstrology";
import SingleQuestionChat from "./pages/SingleQuestionChat";
import RelationshipAnalysis from "./pages/RelationshipAnalysis";
import Support from "./pages/Support";
import TicketDetail from "./pages/TicketDetail";
import Reports from "./pages/Reports";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/birth-chart"
            element={
              <ProtectedRoute>
                <BirthChartAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/astrologers"
            element={
              <ProtectedRoute>
                <Astrologers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/single-question"
            element={
              <ProtectedRoute>
                <SingleQuestionAstrology />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/single-question/chat"
            element={
              <ProtectedRoute>
                <SingleQuestionChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/relationship"
            element={
              <ProtectedRoute>
                <RelationshipAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/support/:ticketId"
            element={
              <ProtectedRoute>
                <TicketDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/failed"
            element={
              <ProtectedRoute>
                <PaymentFailed />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}