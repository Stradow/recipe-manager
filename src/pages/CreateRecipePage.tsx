import { useState } from "react";

const CreateRecipePage = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="bg-[#F7F2F1] p-6 rounded-xl">
      <div className="space-y-12">
        <div className="border-b border-[#D28625] pb-4">
          <h2 className="text-md font-semibold text-[#3A2A1A]">
            Add New Recipe
          </h2>
        </div>

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
            placeholder="Salad with Grilled Chicken"
            className="mt-2 w-full rounded-md border border-[#D4C8BE] bg-white p-2 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3">
          <div>
            <label className="block text-sm font-medium text-[#3A2A1A]">
              Ingredients:
            </label>
            <select className="mt-2 w-full rounded-md border border-[#D4C8BE] bg-white p-2 text-sm">
              <option>Tomato</option>
              <option>Onion</option>
              <option>Salt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3A2A1A]">
              Quantity:
            </label>
            <select className="mt-2 w-full rounded-md border border-[#D4C8BE] bg-white p-2 text-sm">
              <option>1</option>
              <option>1/2 tsp</option>
              <option>2 cups</option>
            </select>
          </div>
          <button
            type="button"
            className="mt-7 text-[#9A8F86] rounded-md border border-[#D4C8BE] bg-white px-4 py-2 hover:text-red-600 transition"
            aria-label="Remove ingredient"
          >
            🗑
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#3A2A1A]">
            Instructions:
          </label>
          <textarea
            rows={4}
            placeholder="Here you can add the instructions for the recipe..."
            className="mt-2 w-full rounded-md border border-[#D4C8BE] bg-white p-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-x-6">
        <button className="text-sm font-semibold rounded-md border border-[#D4C8BE] bg-white px-4 py-2 text-[#3A2A1A] hover:bg-[#D4C8BE]">
          Cancel
        </button>
        <button className="rounded-md bg-[#D28625] px-4 py-2 text-sm font-semibold text-white hover:bg-[#AB9983]">
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateRecipePage;
