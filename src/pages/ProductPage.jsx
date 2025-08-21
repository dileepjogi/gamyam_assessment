import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import Pagination from "../components/Pagination";
import data from "../data/products.json";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("table"); // table | card
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Load products
  useEffect(() => {
    setProducts(data);
  }, []);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
      setEditingProduct(null);
    } else {
      setProducts([...products, product]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search & Toggle */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* Products */}
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setView(view === "table" ? "card" : "table")}
          className="px-4 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Toggle to {view === "table" ? "Card" : "Table"} View
        </button>
      </div>

      {view === "table" ? (
        <ProductTable products={paginatedProducts} onEdit={setEditingProduct} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} onEdit={setEditingProduct} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ProductForm
        onSave={handleSave}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />
    </div>
  );
}
