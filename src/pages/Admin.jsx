import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, LayoutDashboard, Package, Settings, MessageSquare, LogOut, Plus, Eye, EyeOff } from 'lucide-react';
import ProductForm from '../components/ProductForm';
import SettingsForm from '../components/SettingsForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const Admin = ({ setCurrentPage }) => {
  const { settings, products, interestRequests, visitorCount, updateSettings, addProduct, updateProduct, deleteProduct, toggleProductAvailability, markRequestAsSeen, deleteInterestRequest, deleteAllInterestRequests } = useShop();
  const { t, language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, title: '', message: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === settings.adminPassword) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setToast({ show: true, message: language === 'ar' ? 'كلمة المرور غير صحيحة' : 'Mot de passe incorrect', type: 'error' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (product) => {
    setConfirmDialog({
      isOpen: true,
      title: t('deleteProduct'),
      message: language === 'ar' ? `هل أنت متأكد من حذف "${product.name}"؟` : `Êtes-vous sûr de supprimer "${product.name}" ?`,
      onConfirm: () => {
        deleteProduct(product.id);
        setToast({ show: true, message: language === 'ar' ? 'تم حذف المنتج' : 'Produit supprimé', type: 'delete' });
      }
    });
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setToast({ show: true, message: language === 'ar' ? 'تم تحديث المنتج' : 'Produit mis à jour', type: 'success' });
    } else {
      addProduct(productData);
      setToast({ show: true, message: language === 'ar' ? 'تم إضافة المنتج' : 'Produit ajouté', type: 'success' });
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleSaveSettings = (settingsData) => {
    updateSettings(settingsData);
    setToast({ show: true, message: language === 'ar' ? 'تم تحديث الإعدادات' : 'Paramètres mis à jour', type: 'success' });
    setShowSettingsForm(false);
  };

  const handleDeleteAllRequests = () => {
    setConfirmDialog({
      isOpen: true,
      title: t('deleteAll'),
      message: language === 'ar' ? 'هل أنت متأكد من حذف جميع الطلبات؟' : 'Êtes-vous sûr de supprimer toutes les demandes ?',
      onConfirm: () => {
        deleteAllInterestRequests();
        setToast({ show: true, message: language === 'ar' ? 'تم حذف جميع الطلبات' : 'Toutes les demandes supprimées', type: 'delete' });
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-emerald-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t('adminPanel')}</h1>
            <p className="text-gray-600 mt-2">{t('login')}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enterPassword')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg"
            >
              {t('login')}
            </button>
          </form>
        </div>
        {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Admin Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{t('adminPanel')}</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              <LogOut size={20} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-md p-4 sticky top-24">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <LayoutDashboard size={20} />
                    <span>{t('dashboard')}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'products' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Package size={20} />
                    <span>{t('products')}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'requests' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <MessageSquare size={20} />
                    <span>{t('requests')}</span>
                    {interestRequests.filter(r => !r.seen).length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {interestRequests.filter(r => !r.seen).length}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Settings size={20} />
                    <span>{t('settings')}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">{t('dashboard')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">{t('visitorCount')}</p>
                        <p className="text-3xl font-bold text-emerald-600 mt-2">{visitorCount}</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <LayoutDashboard className="text-emerald-600" size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">{t('totalProducts')}</p>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{products.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">{t('totalRequests')}</p>
                        <p className="text-3xl font-bold text-purple-600 mt-2">{interestRequests.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{t('products')}</h2>
                  <button
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                  >
                    <Plus size={20} />
                    <span>{t('addProduct')}</span>
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('productName')}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('productPrice')}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('productCategory')}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('available')}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('edit')}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('delete')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-300">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                <span className="font-medium text-gray-800">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-800">{product.price.toLocaleString()} {settings.currency}</td>
                            <td className="px-6 py-4 text-gray-600">{product.category}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => toggleProductAvailability(product.id)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${product.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                              >
                                {product.available ? t('available') : t('unavailable')}
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-300"
                              >
                                <Settings size={20} />
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleDeleteProduct(product)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18" />
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{t('requests')}</h2>
                  {interestRequests.length > 0 && (
                    <button
                      onClick={handleDeleteAllRequests}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      {t('deleteAll')}
                    </button>
                  )}
                </div>
                {interestRequests.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                    <MessageSquare className="text-gray-400 mx-auto mb-4" size={48} />
                    <p className="text-gray-600">{t('noRequests')}</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('requestDate')}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('fullName')}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('phoneNumber')}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('requestStatus')}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('markAsSeen')}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('delete')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {interestRequests.map((request) => (
                            <tr key={request.id} className={`hover:bg-gray-50 transition-colors duration-300 ${!request.seen ? 'bg-emerald-50' : ''}`}>
                              <td className="px-6 py-4 text-gray-600">{new Date(request.date).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR')}</td>
                              <td className="px-6 py-4 font-medium text-gray-800">{request.name}</td>
                              <td className="px-6 py-4 text-gray-600" dir="ltr">{request.phone}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${request.seen ? 'bg-gray-100 text-gray-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                  {request.seen ? t('seen') : t('notSeen')}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {!request.seen && (
                                  <button
                                    onClick={() => markRequestAsSeen(request.id)}
                                    className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors duration-300"
                                  >
                                    <Eye size={20} />
                                  </button>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => {
                                    setConfirmDialog({
                                      isOpen: true,
                                      title: t('delete'),
                                      message: language === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب؟' : 'Êtes-vous sûr de supprimer cette demande ?',
                                      onConfirm: () => {
                                        deleteInterestRequest(request.id);
                                        setToast({ show: true, message: language === 'ar' ? 'تم حذف الطلب' : 'Demande supprimée', type: 'delete' });
                                      }
                                    });
                                  }}
                                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-300"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">{t('settings')}</h2>
                <button
                  onClick={() => setShowSettingsForm(true)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                >
                  {t('edit')}
                </button>
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">{t('shopName')}</p>
                        <p className="font-medium text-gray-800">{settings.shopName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('shopTagline')}</p>
                        <p className="font-medium text-gray-800">{settings.tagline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('shopCurrency')}</p>
                        <p className="font-medium text-gray-800">{settings.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('shopWhatsApp')}</p>
                        <p className="font-medium text-gray-800" dir="ltr">{settings.whatsapp}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('shopAddress')}</p>
                        <p className="font-medium text-gray-800">{settings.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('mapsUrl')}</p>
                        <p className="font-medium text-gray-800" dir="ltr">{settings.mapsUrl}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t('socialLinks')}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">{t('facebook')}</p>
                          <p className="font-medium text-gray-800 text-sm" dir="ltr">{settings.facebook}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('instagram')}</p>
                          <p className="font-medium text-gray-800 text-sm" dir="ltr">{settings.instagram}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('tiktok')}</p>
                          <p className="font-medium text-gray-800 text-sm" dir="ltr">{settings.tiktok}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('snapchat')}</p>
                          <p className="font-medium text-gray-800 text-sm" dir="ltr">{settings.snapchat}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {showSettingsForm && (
        <SettingsForm
          settings={settings}
          onSave={handleSaveSettings}
          onCancel={() => setShowSettingsForm(false)}
        />
      )}

      {confirmDialog.isOpen && (
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          onConfirm={() => {
            confirmDialog.onConfirm();
            setConfirmDialog({ ...confirmDialog, isOpen: false });
          }}
          title={confirmDialog.title}
          message={confirmDialog.message}
        />
      )}

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
    </div>
  );
};

export default Admin;
