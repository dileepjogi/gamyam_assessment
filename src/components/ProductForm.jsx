import { useState, useEffect } from "react";

export default function ProductForm({ onSave, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.price || isNaN(form.price)) errs.price = "Valid price required";
    if (!form.category) errs.category = "Category is required";
    if (form.stock && isNaN(form.stock)) errs.stock = "Stock must be a number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, id: form.id || Date.now() });
    setForm({ name: "", price: "", category: "", stock: "", description: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-4 rounded border mb-4 mt-4 w-1/2"
    >
      <h2 className="text-lg font-semibold mb-3">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <div className="grid gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          className="border p-2 rounded"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <input
          className="border p-2 rounded"
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}

        <input
          className="border p-2 rounded"
          placeholder="Stock"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}

        <textarea
          className="border p-2 rounded"
          placeholder="Description (optional)"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
