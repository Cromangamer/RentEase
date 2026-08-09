import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../services/api";
import { fetchProducts } from "../redux/productSlice";
import AdminSidebar from "../components/AdminSidebar";

const emptyForm = {
  title: "",
  category: "Furniture",
  subCategory: "",
  brand: "",
  description: "",
  image: "",
  monthlyRent: "",
  securityDeposit: "",
  tenureOptions: [3, 6, 12],
  stock: "",
};

function AdminProducts() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const data = {
        ...formData,
        monthlyRent: Number(formData.monthlyRent),
        securityDeposit: Number(formData.securityDeposit),
        stock: Number(formData.stock),
        tenureOptions: formData.tenureOptions.map(Number),
      };
      if (editingId) {
        await api.put(`/products/${editingId}`, data);
        setSuccess("Product updated successfully.");
      } else {
        await api.post("/products", data);
        setSuccess("Product created successfully.");
      }
      setFormData(emptyForm);
      setEditingId(null);
      dispatch(fetchProducts());
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      title: product.title,
      category: product.category,
      subCategory: product.subCategory,
      brand: product.brand || "",
      description: product.description,
      image: product.image,
      monthlyRent: product.monthlyRent,
      securityDeposit: product.securityDeposit,
      tenureOptions: product.tenureOptions,
      stock: product.stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    try {
      await api.delete(`/products/${id}`);
      setSuccess("Product deleted successfully.");
      dispatch(fetchProducts());
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete product.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setSuccess("");
  };

  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <main className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Product Management</h1>
                  <p className="mt-2 text-slate-600">Manage RentEase inventory with confidence.</p>
                </div>
                {editingId && (
                  <button type="button" onClick={cancelEdit} className="rounded-3xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{editingId ? "Edit Product" : "Add Product"}</h2>
              {error && <div className="mt-5 rounded-3xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}
              {success && <div className="mt-5 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">{success}</div>}
              <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Product title" required className="input" />
                <select name="category" value={formData.category} onChange={handleChange} className="input">
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                </select>
                <input name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="Sub-category e.g. Bed" required className="input" />
                <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="input" />
                <input name="monthlyRent" type="number" value={formData.monthlyRent} onChange={handleChange} placeholder="Monthly rent" required className="input" />
                <input name="securityDeposit" type="number" value={formData.securityDeposit} onChange={handleChange} placeholder="Security deposit" required className="input" />
                <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="input" />
                <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required className="input" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="4" required className="input md:col-span-2 resize-none" />
                <button type="submit" className="md:col-span-2 rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition">
                  {editingId ? "Update Product" : "Add Product"}
                </button>
              </form>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Inventory</h2>
              {loading ? (
                <p className="mt-5 text-slate-500">Loading products...</p>
              ) : (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <div key={product._id} className="rounded-[2rem] border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
                      <img src={product.image} alt={product.title} className="h-52 w-full object-cover" />
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Stock {product.stock}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">{product.category} / {product.subCategory}</p>
                        <p className="mt-4 text-lg font-semibold text-slate-900">₹{product.monthlyRent}/month</p>
                        <div className="mt-5 flex gap-3">
                          <button onClick={() => handleEdit(product)} type="button" className="flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(product._id)} type="button" className="flex-1 rounded-3xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
