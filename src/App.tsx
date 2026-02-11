import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import CreateEditRecipePage from "./pages/CreateEditRecipePage";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<RecipeListPage />} />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <RecipeListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes/new"
            element={
              <ProtectedRoute>
                <CreateEditRecipePage />
              </ProtectedRoute>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route
            path="/recipes/:id/edit"
            element={
              <ProtectedRoute>
                <CreateEditRecipePage />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
