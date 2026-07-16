import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastProvider } from "@/components/ui/toast";

import { useCookies } from "react-cookie";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";


function Protected({ children }: { children: JSX.Element }) {
  const [cookie] = useCookies(["role"]);
  const user = cookie.role;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ToastProvider>
 
        <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route
              // path="/"
              // element={
              //   // <Protected>
              //     <AppLayout />
              //   // </Protected>
              // }
            >
              <Route index element={<Index/>} />

            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>

    </ToastProvider>
  );
}
