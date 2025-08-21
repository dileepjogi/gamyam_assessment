export default function ProductTable({ products, onEdit }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Stock</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="p-2 border">{p.name}</td>
            <td className="p-2 border">₹{p.price}</td>
            <td className="p-2 border">{p.category}</td>
            <td className="p-2 border">{p.stock}</td>
            <td className="p-2 border">
              <button
                onClick={() => onEdit(p)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
