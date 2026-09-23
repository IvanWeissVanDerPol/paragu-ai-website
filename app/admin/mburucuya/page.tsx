'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Types
interface Product {
  id: string
  brand_slug: string
  brand: string
  name: string
  size_ml: number
  gender: 'masculino' | 'femenino' | 'unisex'
  category: string
  wholesale_price_usd?: number
  retail_price_gs: number
  image: string
  description?: string
  featured?: boolean
  in_stock?: boolean
}

interface Category {
  slug: string
  name: string
}

// Icons
const IconSearch = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)
const IconEdit = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)
const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)
const IconX = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)
const IconStar = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

// Sample data (will load from JSON)
const SAMPLE_CATEGORIES: Category[] = [
  { slug: 'fragancia-femenina', name: 'Fragancia Femenina' },
  { slug: 'fragancia-masculina', name: 'Fragancia Masculina' },
  { slug: 'fragancia-unisex', name: 'Fragancia Unisex' },
  { slug: 'nicho-alta-perfumeria', name: 'Nicho & Alta Perfumería' },
  { slug: 'colonias', name: 'Colonias' },
  { slug: 'kits', name: 'Kits' },
  { slug: 'testers', name: 'Testers' },
  { slug: 'perfume-infantil', name: 'Perfume Infantil' },
]

const SAMPLE_PRODUCTS: Product[] = [
  { id: 'carolina-herrera-carolina-212-vip-black-100ml', brand_slug: 'carolina-herrera', brand: 'Carolina Herrera', name: 'Carolina 212 Vip Black 100ml', size_ml: 100, gender: 'unisex', category: 'fragancia-unisex', retail_price_gs: 570000, image: '/mburucuya/products/mayorca-carolina-herrera-carolina-212-vip-black-100ml.jpeg', featured: true, in_stock: true },
  { id: 'calvin-klein-ck-be-100ml', brand_slug: 'calvin-klein', brand: 'Calvin Klein', name: 'Ck Be 100ml', size_ml: 100, gender: 'unisex', category: 'fragancia-unisex', retail_price_gs: 250000, image: '/mburucuya/products/santi-calvin-klein-ck-be.jpeg', featured: true, in_stock: true },
  { id: 'dolce-gabbana-dolce-g-light-blue-100ml', brand_slug: 'dolce-gabbana', brand: 'Dolce & Gabbana', name: 'Dolce G. Light Blue 100ml', size_ml: 100, gender: 'unisex', category: 'fragancia-femenina', retail_price_gs: 590000, image: '/mburucuya/products/mayorca-dolce-gabbana-dolce-g-light-blue-100ml.jpeg', featured: true, in_stock: true },
  { id: 'versace-eros-flame-200ml', brand_slug: 'versace', brand: 'Versace', name: 'Versace Eros Flame 200ml', size_ml: 200, gender: 'masculino', category: 'fragancia-masculina', retail_price_gs: 570000, image: '/mburucuya/products/mayorca-versace-versace-eros-flame-200ml.jpeg', featured: true, in_stock: true },
  { id: 'lattafa-asad-edp-100ml', brand_slug: 'lattafa', brand: 'Lattafa', name: 'Asad EDP 100ml', size_ml: 100, gender: 'masculino', category: 'fragancia-masculina', retail_price_gs: 180000, image: '/mburucuya/products/santi-lattafa-asad.jpeg', featured: true, in_stock: true },
  { id: 'tom-ford-ombre-leather-edp-100ml', brand_slug: 'tom-ford', brand: 'Tom Ford', name: 'Tom Ford Ombre Leather EDP 100ml', size_ml: 100, gender: 'masculino', category: 'nicho-alta-perfumeria', retail_price_gs: 1435000, image: '/mburucuya/products/santi-tom-ford-ombre-leather.jpeg', featured: false, in_stock: true },
  { id: 'parfums-de-marly-deline-exclusif-75ml', brand_slug: 'parfums-de-marly', brand: 'Parfums de Marly', name: 'Parfums D Marly Deline Exclusif 75ml', size_ml: 75, gender: 'unisex', category: 'nicho-alta-perfumeria', retail_price_gs: 1810000, image: '', featured: false, in_stock: true },
  { id: 'xerjoff-erba-gold-edp-100ml', brand_slug: 'xerjoff', brand: 'Xerjoff', name: 'Erba Gold EDP 100ml', size_ml: 100, gender: 'unisex', category: 'nicho-alta-perfumeria', retail_price_gs: 905000, image: '/mburucuya/products/santi-xerjoff-erba-gold.jpeg', featured: true, in_stock: true },
]

export default function MburucuyaAdminPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStock, setFilterStock] = useState<'all' | 'in_stock' | 'out_of_stock'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Product | null>(null)
  const [showFeatured, setShowFeatured] = useState(false)

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.brand.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !filterCategory || p.category === filterCategory
    const matchesStock = filterStock === 'all' || 
                         (filterStock === 'in_stock' && p.in_stock) ||
                         (filterStock === 'out_of_stock' && !p.in_stock)
    const matchesFeatured = !showFeatured || p.featured
    return matchesSearch && matchesCategory && matchesStock && matchesFeatured
  })

  const featuredCount = products.filter(p => p.featured).length
  const inStockCount = products.filter(p => p.in_stock).length

  // Edit handlers
  const startEdit = (product: Product) => {
    setEditingId(product.id)
    setEditForm({ ...product })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const saveEdit = () => {
    if (!editForm) return
    setProducts(products.map(p => p.id === editForm.id ? editForm : p))
    setEditingId(null)
    setEditForm(null)
  }

  const toggleFeatured = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ))
  }

  const toggleStock = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, in_stock: !p.in_stock } : p
    ))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', { 
      style: 'currency', 
      currency: 'PYG',
      maximumFractionDigits: 0 
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-gray-400 hover:text-white text-sm">← Volver al Admin</a>
            <h1 className="text-xl font-bold">Mburucuyá Poty — Catálogo</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {inStockCount} en stock • {featuredCount} destacados
            </span>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium">
              Guardar cambios
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 px-6 py-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold">{products.length}</div>
          <div className="text-sm text-gray-400">Total productos</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-green-400">{inStockCount}</div>
          <div className="text-sm text-gray-400">En stock</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-yellow-400">{products.length - inStockCount}</div>
          <div className="text-sm text-gray-400">Sin stock</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-purple-400">{featuredCount}</div>
          <div className="text-sm text-gray-400">Destacados</div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <IconSearch />
            <input
              type="text"
              placeholder="Buscar perfume..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none"
          >
            <option value="">Todas las categorías</option>
            {SAMPLE_CATEGORIES.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value as any)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none"
          >
            <option value="all">Todos</option>
            <option value="in_stock">En stock</option>
            <option value="out_of_stock">Sin stock</option>
          </select>
          <button
            onClick={() => setShowFeatured(!showFeatured)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              showFeatured ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <IconStar /> Solo destacados
            </span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="px-6 pb-6">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-left text-sm text-gray-400">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Tamaño</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Destacado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {SAMPLE_CATEGORIES.find(c => c.slug === product.category)?.name || product.category}
                  </td>
                  <td className="px-4 py-3 text-sm">{product.size_ml}ml</td>
                  <td className="px-4 py-3">
                    {editingId === product.id && editForm ? (
                      <input
                        type="number"
                        value={editForm.retail_price_gs}
                        onChange={(e) => setEditForm({...editForm, retail_price_gs: Number(e.target.value)})}
                        className="w-28 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm"
                      />
                    ) : (
                      <span className="font-mono">{formatPrice(product.retail_price_gs)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStock(product.id)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.in_stock 
                          ? 'bg-green-900/60 text-green-300' 
                          : 'bg-red-900/60 text-red-300'
                      }`}
                    >
                      {product.in_stock ? '✓ En stock' : '✗ Sin stock'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`p-1 rounded ${product.featured ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}
                    >
                      <IconStar />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {editingId === product.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="p-1 text-green-400 hover:text-green-300"
                          >
                            <IconCheck />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <IconX />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(product)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <IconEdit />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No se encontraron productos
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
