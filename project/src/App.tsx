import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Settings, 
  User, 
  X, 
  Check, 
  AlertCircle, 
  RefreshCw,
  ChevronRight,
  Search,
  ShoppingCart,
  Mail,
  MessageCircle,
  Send
} from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import NotificationPanel from './components/NotificationPanel';
import AddProductModal from './components/AddProductModal';
import ToastNotification from './components/ToastNotification';
import HomePage from './components/HomePage';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    title: "Sony PlayStation 5 Digital Edition Console",
    price: "$399.99",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    inStock: true,
    platform: "amazon",
    lastChecked: "2 mins ago"
  },
  {
    id: 2,
    title: "Nike Air Jordan 1 Retro High OG 'Chicago' - Limited Edition Sneakers",
    price: "$170.00",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80",
    inStock: false,
    platform: "nike",
    lastChecked: "5 mins ago"
  },
  {
    id: 3,
    title: "Apple AirPods Pro (2nd Generation)",
    price: "$249.00",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1363&q=80",
    inStock: true,
    platform: "bestbuy",
    lastChecked: "Just now"
  },
  {
    id: 4,
    title: "Xbox Series X 1TB SSD Console",
    price: "$499.99",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    inStock: false,
    platform: "target",
    lastChecked: "15 mins ago"
  },
  {
    id: 5,
    title: "Samsung 55\" Class QLED 4K Smart TV",
    price: "$799.99",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
    inStock: true,
    platform: "walmart",
    lastChecked: "1 hour ago"
  },
  {
    id: 6,
    title: "Dyson V15 Detect Absolute Cordless Vacuum",
    price: "$749.99",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    inStock: true,
    platform: "amazon",
    lastChecked: "30 mins ago"
  }
];

function App() {
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');
  const [products, setProducts] = useState(sampleProducts);
  const [userSettings, setUserSettings] = useState({
    emailEnabled: true,
    whatsappEnabled: false,
    telegramEnabled: true,
    frequency: 'immediate'
  });

  const toggleNotificationPanel = () => {
    setNotificationPanelOpen(!notificationPanelOpen);
  };

  const toggleAddProductModal = () => {
    setAddProductModalOpen(!addProductModalOpen);
  };

  const displayToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddProduct = (url: string) => {
    // Create a new product based on the URL
    const newProduct = {
      id: products.length + 1,
      title: "New Product from " + url.split('//')[1].split('/')[0],
      price: "$" + (Math.floor(Math.random() * 500) + 100) + ".99",
      image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      inStock: Math.random() > 0.5,
      platform: url.includes('amazon') ? 'amazon' : 
                url.includes('nike') ? 'nike' : 
                url.includes('bestbuy') ? 'bestbuy' : 
                url.includes('target') ? 'target' : 
                url.includes('walmart') ? 'walmart' : 'amazon',
      lastChecked: "Just now"
    };
    
    setProducts([...products, newProduct]);
    displayToast('Product added successfully!', 'success');
    setAddProductModalOpen(false);
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    displayToast('Product removed successfully!', 'success');
  };

  const handleRefreshProduct = (id: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          lastChecked: "Just now",
          inStock: Math.random() > 0.5 // Randomly change stock status for demo
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    const product = products.find(p => p.id === id);
    displayToast(`Refreshed ${product?.title}`, 'success');
  };

  const handleSaveNotificationSettings = (settings: any) => {
    setUserSettings(settings);
    displayToast('Notification settings saved!', 'success');
    setNotificationPanelOpen(false);
  };

  const handleRefreshAll = () => {
    const updatedProducts = products.map(product => ({
      ...product,
      lastChecked: "Just now"
    }));
    
    setProducts(updatedProducts);
    displayToast('All products refreshed!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      <Header 
        onNotificationClick={toggleNotificationPanel} 
        onAddProductClick={toggleAddProductModal}
        onRefreshAll={handleRefreshAll}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' ? (
          <HomePage onGetStarted={() => setCurrentPage('dashboard')} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onRefresh={() => handleRefreshProduct(product.id)}
                onRemove={() => handleRemoveProduct(product.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={notificationPanelOpen} 
        onClose={() => setNotificationPanelOpen(false)}
        settings={userSettings}
        onSave={handleSaveNotificationSettings}
      />

      {/* Add Product Modal */}
      <AddProductModal 
        isOpen={addProductModalOpen} 
        onClose={() => setAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Toast Notification */}
      <ToastNotification 
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;