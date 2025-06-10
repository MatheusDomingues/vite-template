import AppRoutes from "@/routes/index";
import { AuthProvider } from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster />
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
