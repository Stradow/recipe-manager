import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import CreateEditRecipePage from "./pages/CreateEditRecipePage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<RecipeListPage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipes/new" element={<CreateEditRecipePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route path="/recipes/:id/edit" element={<CreateEditRecipePage />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
