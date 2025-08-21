export default function ProductCard({ product, onEdit }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <p className="text-xs text-gray-400 mt-2">{product.description}</p>
      <button
        onClick={() => onEdit(product)}
        className="mt-3 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>
    </div>
  );
}
