import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import CreateEditRecipePage from "./pages/CreateEditRecipePage";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<RecipeListPage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipes/new" element={<CreateEditRecipePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route path="/recipes/:id/edit" element={<CreateEditRecipePage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
