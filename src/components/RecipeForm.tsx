import { useState, useEffect } from "react";
import { Recipe } from "../types/Recipe";
import { Ingredient } from "../types/Ingredient";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface RecipeFormProps {
  initialData: Recipe | null;
  onSubmit: (formData: FormData) => Promise<void>;
  isEditMode: boolean;
}

const RecipeForm = ({ initialData, onSubmit, isEditMode }: RecipeFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    name: "",
    quantity: "",
  });
  const [instructions, setInstructions] = useState<string[]>([]);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setIngredients(initialData.ingredients);

      if (initialData.instructions) {
        try {
          const parsed = JSON.parse(initialData.instructions);
          setInstructions(
            Array.isArray(parsed) ? parsed : [initialData.instructions],
          );
        } catch {
          setInstructions([initialData.instructions]);
        }
      }

      if (initialData.imageUrl) {
        setPreview(initialData.imageUrl);
      }
    }
  }, [initialData]);

  const handleAddIngredient = () => {
    if (currentIngredient.name && currentIngredient.quantity) {
      const newIngredient: Ingredient = {
        id: Date.now().toString(),
        name: currentIngredient.name,
        quantity: currentIngredient.quantity,
        recipeId: initialData?.id || "",
      };
      setIngredients([...ingredients, newIngredient]);
      setCurrentIngredient({ name: "", quantity: "" });
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients?.filter((ing) => ing.id !== id));
  };

  const handleAddInstruction = () => {
    if (currentInstruction.trim()) {
      setInstructions([...instructions, currentInstruction.trim()]);
      setCurrentInstruction("");
    }
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));

    if (imageFile) {
      formData.append("imageUrl", imageFile);
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.log("Error submitting form: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    nav("/recipes");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#F7F2F1] p-6 rounded-xl">
      <div className="space-y-12">
        <div>
          <label className="block text-sm font-medium text-[#3A2A1A]">
            Recipe Photo
          </label>

          <div className="mt-3 flex items-center gap-x-4">
            {preview ? (
              <img
                src={preview}
                alt="Recipe preview"
                className="h-24 w-24 rounded-lg object-cover border border-[#D4C8BE]"
              />
            ) : (
              <div className="h-24 w-24 rounded-lg bg-[#EAE3DF] flex items-center justify-center text-sm text-[#9A8F86]">
                No image
              </div>
            )}

            <label className="cursor-pointer rounded-md bg-[#D28625] px-3 py-2 text-sm font-semibold text-white hover:bg-[#AB9983]">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#3A2A1A]">
            Recipe Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Salad with Grilled Chicken"
            required
            className="mt-2 w-full rounded-md border border-[#D4C8BE] bg-white p-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#3A2A1A] mb-3">
            Add Ingredients:
          </label>

          <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A2A1A] mb-1">
                Quantity:
              </label>
              <input
                type="text"
                value={currentIngredient.quantity}
                onChange={(e) =>
                  setCurrentIngredient({
                    ...currentIngredient,
                    quantity: e.target.value,
                  })
                }
                placeholder="2"
                className="w-full rounded-md border border-[#D4C8BE] bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D28625]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3A2A1A] mb-1">
                Ingredient Name:
              </label>
              <input
                type="text"
                value={currentIngredient.name}
                onChange={(e) =>
                  setCurrentIngredient({
                    ...currentIngredient,
                    name: e.target.value,
                  })
                }
                placeholder="Tomatoes"
                className="w-full rounded-md border border-[#D4C8BE] bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D28625]"
              />
            </div>

            <button
              type="button"
              onClick={handleAddIngredient}
              className="rounded-md bg-[#D28625] px-4 py-2 text-sm font-semibold text-white hover:bg-[#AB9983] transition"
            >
              Add
            </button>
          </div>
        </div>

        {ingredients.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[#3A2A1A] mb-3">
              Current Ingredients:
            </label>
            <div className="space-y-2">
              {ingredients?.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 bg-white p-3 rounded-md border border-[#D4C8BE]"
                >
                  <div className="text-sm text-[#3A2A1A]">
                    {ingredient.quantity}
                  </div>
                  <div className="text-sm text-[#3A2A1A] font-medium">
                    {ingredient.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                    className="text-[#9A8F86] rounded-md border border-[#D4C8BE] bg-white px-3 py-1 hover:text-red-600 transition"
                    aria-label="Remove ingredient"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#3A2A1A] mb-3">
            Instructions:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={currentInstruction}
              onChange={(e) => setCurrentInstruction(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddInstruction();
                }
              }}
              placeholder="Enter a step (e.g., Heat oil in a large pan)"
              className="flex-1 rounded-md border border-[#D4C8BE] bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D28625]"
            />
            <button
              type="button"
              onClick={handleAddInstruction}
              className="rounded-md bg-[#D28625] px-4 py-2 text-sm font-semibold text-white hover:bg-[#AB9983] transition"
            >
              Add Step
            </button>
          </div>
        </div>

        {instructions.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[#3A2A1A] mb-3">
              Current Steps:
            </label>
            <div className="space-y-2">
              {instructions.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white p-3 rounded-md border border-[#D4C8BE]"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D28625] text-white flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1 text-sm text-[#3A2A1A] pt-1">
                    {step}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveInstruction(index)}
                    className="text-[#9A8F86] rounded-md border border-[#D4C8BE] bg-white px-3 py-1 hover:text-red-600 transition"
                    aria-label="Remove step"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-x-6">
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm font-semibold rounded-md border border-[#D4C8BE] bg-white px-4 py-2 text-[#3A2A1A] hover:bg-[#D4C8BE] transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className={`rounded-md px-4 py-2 text-sm font-semibold text-white transition 
          ${
            submitting
              ? "bg-[#9A8F86] cursor-not-allowed"
              : "bg-[#D28625] hover:bg-[#AB9983]"
          }`}
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
