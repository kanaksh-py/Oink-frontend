import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Signup } from "./pages/Signup"; 
import { Signin } from "./pages/Signin"; 
import { Dashboard } from "./pages/Dashboard";
import { AnimatePresence } from "framer-motion";

// We create this separate component so we can use useLocation()
function AnimatedRoutes() {
  const location = useLocation();

  return (
    // mode="wait" ensures the old page fades out BEFORE the new one fades in
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;