import React, { useState, useEffect, createContext, useContext } from 'react';
import { Camera, Package, Users, ShoppingCart, FileText, TrendingUp, LogOut, Menu, X, Plus, Edit2, Trash2, Search, Download, Eye } from 'lucide-react';

// Auth Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    const decoded = JSON.parse(atob(newToken.split('.')[0]));
    setUser(decoded);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`}>
      {message}
    </div>
  );
};

// Login Page
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('sales');
  const [toast, setToast] = useState(null);

  const handleSubmit = () => {
    if (isRegister) {
      setToast({ message: 'Registration successful! Please login.', type: 'success' });
      setIsRegister(false);
      setName('');
      setEmail('');
      setPassword('');
    } else {
      const fakeToken = btoa(JSON.stringify({ 
        id: '1', 
        email, 
        role: email.includes('admin') ? 'admin' : 'sales',
        name: email.split('@')[0]
      })) + '.fake.token';
      onLogin(fakeToken);
      setToast({ message: 'Login successful!', type: 'success' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">ERP System</h1>
          <p className="text-gray-600 mt-2">{isRegister ? 'Create Account' : 'Welcome Back'}</p>
        </div>

        <div className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sales">Sales</option>
                <option value="purchase">Purchase</option>
                <option value="inventory">Inventory</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Dashboard
const Dashboard = () => {
  const stats = [
    { label: 'Total Products', value: '1,234', icon: Package, color: 'bg-blue-500' },
    { label: 'Total Customers', value: '856', icon: Users, color: 'bg-green-500' },
    { label: 'Sales Orders', value: '432', icon: ShoppingCart, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$128K', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Sales</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-semibold text-gray-800">Order #{1000 + i}</p>
                  <p className="text-sm text-gray-600">Customer {i}</p>
                </div>
                <span className="text-green-600 font-semibold">${(Math.random() * 1000).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Low Stock Alert</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-semibold text-gray-800">Product {i}</p>
                  <p className="text-sm text-gray-600">SKU-{1000 + i}</p>
                </div>
                <span className="text-red-600 font-semibold">{Math.floor(Math.random() * 10)} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Products Page
const ProductsPage = () => {
  const [products, setProducts] = useState([
    { id: 1, title: 'Laptop', sku: 'LAP-001', price: 999, stock: 45, reorderLevel: 10 },
    { id: 2, title: 'Mouse', sku: 'MOU-001', price: 25, stock: 150, reorderLevel: 50 },
    { id: 3, title: 'Keyboard', sku: 'KEY-001', price: 75, stock: 8, reorderLevel: 20 },
  ]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    title: '', sku: '', price: '', stock: '', reorderLevel: ''
  });

  const handleSubmit = () => {
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...formData, id: p.id, price: Number(formData.price), stock: Number(formData.stock), reorderLevel: Number(formData.reorderLevel) } : p));
      setToast({ message: 'Product updated successfully!', type: 'success' });
    } else {
      setProducts([...products, { ...formData, id: Date.now(), price: Number(formData.price), stock: Number(formData.stock), reorderLevel: Number(formData.reorderLevel) }]);
      setToast({ message: 'Product added successfully!', type: 'success' });
    }
    setShowModal(false);
    setEditProduct(null);
    setFormData({ title: '', sku: '', price: '', stock: '', reorderLevel: '' });
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setToast({ message: 'Product deleted successfully!', type: 'success' });
  };

  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => {
            setEditProduct(null);
            setFormData({ title: '', sku: '', price: '', stock: '', reorderLevel: '' });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">SKU</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reorder Level</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{product.title}</td>
                  <td className="px-4 py-3 text-gray-600">{product.sku}</td>
                  <td className="px-4 py-3 text-gray-800">${product.price}</td>
                  <td className="px-4 py-3">
                    <span className={`${product.stock < product.reorderLevel ? 'text-red-600' : 'text-gray-800'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.reorderLevel}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Reorder Level"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editProduct ? 'Update' : 'Add'}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditProduct(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Customers Page
const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0001', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0002', address: '456 Oak Ave' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} /> Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Address</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-semibold">{customer.name}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.address}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Sales Orders Page
const SalesOrdersPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, orderNo: 'SO-1001', customer: 'John Doe', status: 'Pending', total: 2500, date: '2024-11-15' },
    { id: 2, orderNo: 'SO-1002', customer: 'Jane Smith', status: 'Completed', total: 1800, date: '2024-11-18' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Sales Orders</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} /> New Order
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Order #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-semibold">{order.orderNo}</td>
                  <td className="px-4 py-3 text-gray-600">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">${order.total}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const ERPSystem = () => {
  const { user, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'sales', label: 'Sales Orders', icon: ShoppingCart },
    { id: 'invoices', label: 'Invoices', icon: FileText },
  ];

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <ProductsPage />;
      case 'customers': return <CustomersPage />;
      case 'sales': return <SalesOrdersPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={32} />
            <span className="text-xl font-bold">ERP System</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="px-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-700"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-600 capitalize">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </div>
  );
};

// Root App with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <ERPSystem />
    </AuthProvider>
  );
}