"use client"
import { useState, useEffect } from "react"

// ============================================
// L'OEUFSTORY - Design Luxe Noir + Or
// Avec BD, Catégories, Employés, Admins
// ============================================

// Styles CSS intégrés
function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');
      
      .font-display { font-family: 'Cormorant Garamond', serif; }
      .font-body { font-family: 'Outfit', sans-serif; }
      
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(3deg); }
      }
      
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(212, 168, 75, 0.3); }
        50% { box-shadow: 0 0 40px rgba(212, 168, 75, 0.5); }
      }
      
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
      .animate-shimmer { 
        background: linear-gradient(90deg, #D4A84B 0%, #F5E6B8 50%, #D4A84B 100%);
        background-size: 200% auto;
        animation: shimmer 3s linear infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      
      .gold-gradient {
        background: linear-gradient(135deg, #D4A84B 0%, #F5E6B8 50%, #D4A84B 100%);
      }
      
      .text-gold { color: #D4A84B; }
      .bg-gold { background-color: #D4A84B; }
      .border-gold { border-color: #D4A84B; }
      
      .hero-bg {
        background: 
          radial-gradient(ellipse at 20% 80%, rgba(212, 168, 75, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(212, 168, 75, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(28, 25, 23, 1) 0%, rgba(12, 10, 9, 1) 100%);
      }
      
      .glass-card {
        background: rgba(41, 37, 36, 0.5);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(212, 168, 75, 0.15);
      }
      
      .menu-item {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .menu-item:hover {
        transform: translateX(8px);
        background: rgba(212, 168, 75, 0.05);
      }
      
      .egg-shadow {
        filter: drop-shadow(0 15px 30px rgba(212, 168, 75, 0.25));
      }
      
      .input-field {
        width: 100%;
        background: transparent;
        border-bottom: 1px solid #44403c;
        padding: 0.75rem 0;
        font-family: 'Outfit', sans-serif;
        font-size: 0.875rem;
        color: #e7e5e4;
        transition: border-color 0.3s;
      }
      
      .input-field:focus {
        outline: none;
        border-color: #D4A84B;
      }
      
      .input-field::placeholder {
        color: #78716c;
      }
      
      .admin-card {
        background: rgba(28, 25, 23, 0.8);
        border: 1px solid #292524;
        border-radius: 8px;
      }
      
      .admin-input {
        width: 100%;
        background: #1c1917;
        border: 1px solid #292524;
        border-radius: 4px;
        padding: 0.5rem 0.75rem;
        font-family: 'Outfit', sans-serif;
        font-size: 0.875rem;
        color: #e7e5e4;
        transition: border-color 0.3s;
      }
      
      .admin-input:focus {
        outline: none;
        border-color: #D4A84B;
      }
      
      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.7rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .status-pending { background: #422006; color: #fbbf24; }
      .status-confirmed { background: #052e16; color: #4ade80; }
      .status-cancelled { background: #450a0a; color: #f87171; }
    `}</style>
  );
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function LOeufstoryApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notification, setNotification] = useState(null);

  // Afficher une notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Transformer items plats en structure par catégorie
  const getMenuData = () => {
    const menuData = {};
    categories.forEach(cat => {
      menuData[cat.key] = {
        id: cat.id,
        title: cat.title,
        description: cat.description || '',
        items: menuItems.filter(item => item.category === cat.key).map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          description: item.description || ''
        }))
      };
    });
    return menuData;
  };
  
  const menuData = getMenuData();

  // Charger les catégories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0 && !selectedCategory) {
            setSelectedCategory(data[0].key);
          }
        }
      })
      .catch(err => console.error('Erreur catégories:', err));
  }, []);

  // Charger le menu
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMenuItems(data);
        setMenuLoading(false);
      })
      .catch(err => {
        console.error('Erreur menu:', err);
        setMenuLoading(false);
      });
  }, []);

  // Charger les réservations
  useEffect(() => {
    fetch('/api/reservations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setReservations(data);
      })
      .catch(err => console.error('Erreur réservations:', err));
  }, []);

  const pendingReservations = reservations.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-display">
      <Styles />
      
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-[100] px-6 py-4 rounded shadow-lg animate-slideIn font-body text-sm ${
          notification.type === 'success' ? 'bg-emerald-900/90 border border-emerald-700' : 
          notification.type === 'error' ? 'bg-red-900/90 border border-red-700' : 
          'bg-stone-800/90 border border-stone-700'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Navigation */}
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        pendingCount={pendingReservations}
      />

      {/* Contenu */}
      {currentPage === 'home' && (
        <HomePage 
          menuData={menuData} 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          menuLoading={menuLoading}
          reservations={reservations}
          setReservations={setReservations}
          showNotification={showNotification}
        />
      )}
      
      {currentPage === 'admin' && !isAdmin && (
        <LoginPage setIsAdmin={setIsAdmin} setCurrentAdmin={setCurrentAdmin} />
      )}
      
      {currentPage === 'admin' && isAdmin && (
        <AdminPage 
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          categories={categories}
          setCategories={setCategories}
          reservations={reservations}
          setReservations={setReservations}
          setIsAdmin={setIsAdmin}
          currentAdmin={currentAdmin}
          showNotification={showNotification}
        />
      )}
    </div>
  );
}

// ============================================
// NAVIGATION
// ============================================
function Navigation({ currentPage, setCurrentPage, isAdmin, setIsAdmin, pendingCount }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-md py-3 border-b border-stone-800/50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 group">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 40 40" className="w-full h-full transform group-hover:scale-110 transition-transform duration-300">
              <ellipse cx="20" cy="22" rx="14" ry="16" fill="#F5F0E6"/>
              <ellipse cx="20" cy="22" rx="8" ry="9" fill="#D4A84B"/>
            </svg>
          </div>
          <span className="text-xl font-display font-semibold tracking-wide text-gold">L'Oeufstory</span>
        </button>
        
        <div className="flex items-center gap-6">
          {currentPage === 'home' && (
            <>
              <a href="#menu" className="hidden md:block font-body text-xs tracking-widest uppercase text-stone-400 hover:text-gold transition-colors">Menu</a>
              <a href="#reservation" className="hidden md:block font-body text-xs tracking-widest uppercase text-stone-400 hover:text-gold transition-colors">Réservation</a>
            </>
          )}
          
          <button 
            onClick={() => {
              if (currentPage === 'admin' && isAdmin) {
                setCurrentPage('home');
              } else if (currentPage === 'admin') {
                setCurrentPage('home');
              } else {
                setCurrentPage('admin');
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded font-body text-xs tracking-widest uppercase transition-all ${
              currentPage === 'admin' 
                ? 'bg-gold text-stone-950' 
                : 'border border-stone-700 text-stone-400 hover:border-gold hover:text-gold'
            }`}
          >
            {currentPage === 'admin' ? (
              <>
                <span>←</span>
                <span>Retour</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden sm:inline">Admin</span>
                {pendingCount > 0 && (
                  <span className="w-5 h-5 bg-amber-500 text-stone-950 rounded-full text-[10px] flex items-center justify-center font-bold">
                    {pendingCount}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ============================================
// PAGE D'ACCUEIL
// ============================================
function HomePage({ menuData, categories, selectedCategory, setSelectedCategory, menuLoading, reservations, setReservations, showNotification }) {
  
  const addReservation = async (formData) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'pending'
        })
      });
      const data = await response.json();
      if (response.ok) {
        setReservations([...reservations, data]);
        showNotification('Réservation confirmée ! Vous recevrez une confirmation.', 'success');
        return true;
      }
    } catch (err) {
      console.error('Erreur réservation:', err);
      showNotification('Erreur lors de la réservation', 'error');
    }
    return false;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden pt-16">
        <div className="absolute top-24 left-8 w-16 h-16 opacity-10 animate-float">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="55" rx="35" ry="40" fill="#D4A84B"/>
          </svg>
        </div>
        <div className="absolute bottom-24 right-12 w-12 h-12 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="55" rx="35" ry="40" fill="#D4A84B"/>
          </svg>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center animate-fadeInUp">
            <div className="relative egg-shadow pulse-glow rounded-full">
              <svg viewBox="0 0 120 140" className="w-24 h-28 md:w-32 md:h-36">
                <ellipse cx="60" cy="75" rx="45" ry="55" fill="#F5F0E6"/>
                <ellipse cx="60" cy="75" rx="25" ry="30" fill="#D4A84B"/>
              </svg>
            </div>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-4 animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            <span className="animate-shimmer">L'Oeufstory</span>
          </h1>
          
          <p className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-stone-500 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            Déjeuner • Dîner
          </p>
          
          <p className="font-display text-lg md:text-2xl text-stone-300 font-light italic mb-10 animate-fadeInUp max-w-xl mx-auto leading-relaxed" style={{ animationDelay: '0.45s' }}>
            Une histoire de saveurs,<br/>racontée à chaque bouchée
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <a href="#menu" className="group relative px-8 py-3 bg-transparent border border-gold/70 text-gold font-body text-xs tracking-widest uppercase overflow-hidden transition-all duration-500 hover:border-gold hover:text-stone-950">
              <span className="relative z-10">Découvrir le Menu</span>
              <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
            <a href="#reservation" className="px-8 py-3 gold-gradient text-stone-950 font-body text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30">
              Réserver une Table
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-body text-[10px] tracking-widest text-stone-500 uppercase">Découvrir</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent"></div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="relative py-20 px-4 bg-stone-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold mb-4 block">Nos Créations</span>
            <h2 className="font-display text-4xl md:text-5xl font-light">Le Menu</h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6"></div>
          </div>
          
          {menuLoading || categories.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-float">🍳</div>
              <p className="text-gold text-xl font-display">Chargement du menu...</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar catégories */}
              <div className="md:w-56 flex-shrink-0">
                <div className="glass-card p-4 rounded md:sticky md:top-24">
                  <h3 className="font-body text-[10px] tracking-widest uppercase text-stone-500 mb-4">Catégories</h3>
                  <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                    {categories.filter(c => c.is_active).map(cat => (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`px-4 py-3 rounded text-left font-body text-xs tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
                          selectedCategory === cat.key 
                            ? 'border border-gold text-gold bg-gold/10' 
                            : 'border border-stone-700 text-stone-500 hover:border-stone-500'
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Items du menu */}
              <div className="flex-1">
                {selectedCategory && menuData[selectedCategory] && (
                  <div className="glass-card p-6 md:p-8 rounded">
                    <div className="border-b border-stone-700/50 pb-4 mb-6">
                      <h3 className="font-display text-2xl md:text-3xl text-gold">{menuData[selectedCategory].title}</h3>
                      {menuData[selectedCategory].description && (
                        <p className="font-body text-stone-500 text-sm mt-2">{menuData[selectedCategory].description}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {menuData[selectedCategory].items.length > 0 ? (
                        menuData[selectedCategory].items.map(item => (
                          <div key={item.id} className="menu-item flex flex-col sm:flex-row sm:items-end justify-between py-5 px-4 border-b border-stone-800/50 rounded">
                            <div className="flex-1">
                              <h4 className="font-display text-xl mb-1 text-stone-100">{item.name}</h4>
                              <p className="font-body text-xs text-stone-500">{item.description}</p>
                            </div>
                            <div className="mt-3 sm:mt-0">
                              <span className="font-display text-2xl text-gold">{item.price.toFixed(2)}$</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-stone-600 py-8 font-body">Aucun item dans cette catégorie</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="relative py-20 px-4 bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gold blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold blur-3xl"></div>
        </div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold mb-4 block">Nous Rejoindre</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">Réservez Votre Table</h2>
            <p className="font-body text-stone-400 text-sm">Pour une expérience culinaire inoubliable</p>
          </div>
          
          <ReservationForm onSubmit={addReservation} />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 px-4 bg-stone-900 border-t border-stone-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 40 40" className="w-6 h-6">
                <ellipse cx="20" cy="22" rx="14" ry="16" fill="#F5F0E6"/>
                <ellipse cx="20" cy="22" rx="8" ry="9" fill="#D4A84B"/>
              </svg>
              <span className="font-display text-lg text-gold">L'Oeufstory</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 text-stone-500 font-body text-xs">
              <span>📍 123 Rue Principale, Québec</span>
              <span>📞 +1 (418) 123-4567</span>
            </div>
            
            <p className="font-body text-[10px] text-stone-600">© 2024 L'Oeufstory</p>
          </div>
        </div>
      </footer>
    </>
  );
}

// ============================================
// FORMULAIRE DE RÉSERVATION
// ============================================
function ReservationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nom requis';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!formData.date) newErrors.date = 'Date requise';
    if (!formData.time) newErrors.time = 'Heure requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' });
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 rounded">
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div className="space-y-1">
          <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Nom complet *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Jean Dupont"/>
          {errors.name && <span className="text-red-400 text-xs font-body">{errors.name}</span>}
        </div>
        
        <div className="space-y-1">
          <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="jean@email.com"/>
          {errors.email && <span className="text-red-400 text-xs font-body">{errors.email}</span>}
        </div>
        
        <div className="space-y-1">
          <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Téléphone *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+1 (418) 000-0000"/>
          {errors.phone && <span className="text-red-400 text-xs font-body">{errors.phone}</span>}
        </div>
        
        <div className="space-y-1">
          <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Personnes</label>
          <select name="guests" value={formData.guests} onChange={handleChange} className="input-field bg-transparent">
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n} className="bg-stone-900">{n} personne{n > 1 ? 's' : ''}</option>
            ))}
            <option value="9+" className="bg-stone-900">9+ (nous contacter)</option>
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Date *</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} min={minDate} className="input-field"/>
          {errors.date && <span className="text-red-400 text-xs font-body">{errors.date}</span>}
        </div>
        
        <div className="space-y-1">
          <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Heure *</label>
          <select name="time" value={formData.time} onChange={handleChange} className="input-field bg-transparent">
            <option value="" className="bg-stone-900">Sélectionner</option>
            {timeSlots.map(time => (
              <option key={time} value={time} className="bg-stone-900">{time}</option>
            ))}
          </select>
          {errors.time && <span className="text-red-400 text-xs font-body">{errors.time}</span>}
        </div>
      </div>
      
      <div className="space-y-1 mb-8">
        <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Message (optionnel)</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} className="input-field resize-none" rows={3} placeholder="Allergies, occasion spéciale..."/>
      </div>
      
      <button type="submit" disabled={isSubmitting} className={`w-full py-4 gold-gradient text-stone-950 font-body text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
        {isSubmitting ? 'Envoi en cours...' : 'Confirmer la Réservation'}
      </button>
      
      <p className="text-center text-stone-600 text-xs font-body mt-4">
        Vous recevrez une confirmation par email dans les 24h
      </p>
    </form>
  );
}

// ============================================
// PAGE DE CONNEXION ADMIN
// ============================================
function LoginPage({ setIsAdmin, setCurrentAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setCurrentAdmin(data.admin);
        setIsAdmin(true);
      } else {
        setError(data.error || 'Identifiants incorrects');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-bg pt-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <svg viewBox="0 0 40 40" className="w-12 h-12 mx-auto mb-4">
            <ellipse cx="20" cy="22" rx="14" ry="16" fill="#F5F0E6"/>
            <ellipse cx="20" cy="22" rx="8" ry="9" fill="#D4A84B"/>
          </svg>
          <h1 className="font-display text-3xl text-gold mb-2">Administration</h1>
          <p className="font-body text-stone-500 text-sm">Connectez-vous pour accéder au panneau</p>
        </div>
        
        <form onSubmit={handleLogin} className="glass-card p-8 rounded">
          {error && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-700 rounded text-red-400 text-sm font-body text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Nom d'utilisateur</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" placeholder="admin" required/>
            </div>
            
            <div className="space-y-1">
              <label className="font-body text-[10px] tracking-widest uppercase text-stone-500">Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" required/>
            </div>
          </div>
          
          <button type="submit" disabled={loading} className={`w-full mt-8 py-4 gold-gradient text-stone-950 font-body text-sm tracking-widest uppercase transition-all ${loading ? 'opacity-70' : 'hover:shadow-lg hover:shadow-amber-500/30'}`}>
            {loading ? 'Connexion...' : 'Se Connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================
// PANNEAU D'ADMINISTRATION
// ============================================
function AdminPage({ menuItems, setMenuItems, categories, setCategories, reservations, setReservations, setIsAdmin, currentAdmin, showNotification }) {
  const [activeTab, setActiveTab] = useState('reservations');
  const [editingCategory, setEditingCategory] = useState(null);
  
  // États pour le menu
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [editingItemData, setEditingItemData] = useState({ name: '', price: '', description: '' });
  
  // États pour les catégories
  const [newCategory, setNewCategory] = useState({ title: '', description: '' });
  const [editingCategoryData, setEditingCategoryData] = useState(null);
  
  // États pour les employés
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', phone: '', email: '', hourly_rate: '' });
  
  // États pour les horaires
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ employee_id: '', date: '', start_time: '', end_time: '', notes: '' });
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff)).toISOString().split('T')[0];
  });
  
  // États pour les admins
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', name: '' });
  
  const roles = ['Serveur', 'Cuisinier', 'Chef', 'Plongeur', 'Hôte', 'Gérant'];

  // Charger les employés
  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setEmployees(data); })
      .catch(err => console.error('Erreur employés:', err));
  }, []);

  // Charger les horaires
  useEffect(() => {
    fetch('/api/schedules')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setSchedules(data); })
      .catch(err => console.error('Erreur horaires:', err));
  }, []);

  // Charger les admins
  useEffect(() => {
    fetch('/api/admins')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setAdmins(data); })
      .catch(err => console.error('Erreur admins:', err));
  }, []);

  // Transformer items en structure par catégorie
  const getMenuData = () => {
    const menuData = {};
    categories.forEach(cat => {
      menuData[cat.key] = {
        title: cat.title,
        description: cat.description || '',
        items: menuItems.filter(item => item.category === cat.key)
      };
    });
    return menuData;
  };
  const menuData = getMenuData();

  // === FONCTIONS RÉSERVATIONS ===
  const updateReservationStatus = async (id, status) => {
    try {
      await fetch('/api/reservations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
      showNotification('Statut mis à jour', 'success');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const deleteReservation = async (id) => {
    if (!confirm('Supprimer cette réservation?')) return;
    try {
      await fetch(`/api/reservations?id=${id}`, { method: 'DELETE' });
      setReservations(reservations.filter(r => r.id !== id));
      showNotification('Réservation supprimée', 'success');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // === FONCTIONS MENU ===
  const handleAddMenuItem = async (category) => {
    if (!newItem.name || !newItem.price) return;
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newItem, category })
      });
      const data = await response.json();
      if (response.ok) {
        setMenuItems([...menuItems, data]);
        setNewItem({ name: '', price: '', description: '' });
        showNotification('Item ajouté', 'success');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleDeleteMenuItem = async (itemId) => {
    if (!confirm('Supprimer cet item?')) return;
    try {
      await fetch(`/api/menu?id=${itemId}`, { method: 'DELETE' });
      setMenuItems(menuItems.filter(i => i.id !== itemId));
      showNotification('Item supprimé', 'success');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleUpdateMenuItem = async (itemId) => {
    try {
      const response = await fetch('/api/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, ...editingItemData })
      });
      const data = await response.json();
      if (response.ok) {
        setMenuItems(menuItems.map(i => i.id === itemId ? data : i));
        setEditingItem(null);
        showNotification('Item modifié', 'success');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // === FONCTIONS CATÉGORIES ===
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.title) return;
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });
      const data = await response.json();
      if (response.ok) {
        setCategories([...categories, data]);
        setNewCategory({ title: '', description: '' });
        showNotification('Catégorie ajoutée', 'success');
      } else {
        showNotification(data.error || 'Erreur', 'error');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleUpdateCategory = async (cat) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      });
      const data = await response.json();
      if (response.ok) {
        setCategories(categories.map(c => c.id === data.id ? data : c));
        setEditingCategoryData(null);
        showNotification('Catégorie modifiée', 'success');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleDeleteCategory = async (id) => {
    const cat = categories.find(c => c.id === id);
    const itemCount = menuItems.filter(i => i.category === cat?.key).length;
    if (itemCount > 0) {
      showNotification(`Catégorie contient ${itemCount} items. Supprimez-les d'abord.`, 'error');
      return;
    }
    if (!confirm('Supprimer cette catégorie?')) return;
    try {
      await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      setCategories(categories.filter(c => c.id !== id));
      showNotification('Catégorie supprimée', 'success');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // === FONCTIONS EMPLOYÉS ===
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.role) return;
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee)
      });
      const data = await response.json();
      if (response.ok) {
        setEmployees([...employees, data]);
        setNewEmployee({ name: '', role: '', phone: '', email: '', hourly_rate: '' });
        showNotification('Employé ajouté', 'success');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!confirm('Supprimer cet employé?')) return;
    try {
      await fetch(`/api/employees?id=${id}`, { method: 'DELETE' });
      setEmployees(employees.filter(e => e.id !== id));
      showNotification('Employé supprimé', 'success');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // === FONCTIONS HORAIRES ===
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!newSchedule.employee_id || !newSchedule.date || !newSchedule.start_time || !newSchedule.end_time) return;
    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchedule)
      });
      const data = await response.json();
      if (response.ok) {
        const res = await fetch('/api/schedules');
        const schedData = await res.json();
        if (Array.isArray(schedData)) setSchedules(schedData);
        setNewSchedule({ employee_id: '', date: '', start_time: '', end_time: '', notes: '' });
        showNotification('Horaire ajouté', 'success');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await fetch(`/api/schedules?id=${id}`, { method: 'DELETE' });
      setSchedules(schedules.filter(s => s.id !== id));
      showNotification('Horaire supprimé', 'success');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // === FONCTIONS ADMINS ===
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password || !newAdmin.name) return;
    try {
      const response = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        setAdmins([...admins, data]);
        setNewAdmin({ username: '', password: '', name: '' });
        showNotification('Admin ajouté', 'success');
      } else {
        showNotification(data.error || 'Erreur', 'error');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (admins.length <= 1) {
      showNotification('Impossible de supprimer le dernier admin', 'error');
      return;
    }
    if (!confirm('Supprimer cet admin?')) return;
    try {
      await fetch(`/api/admins?id=${id}`, { method: 'DELETE' });
      setAdmins(admins.filter(a => a.id !== id));
      showNotification('Admin supprimé', 'success');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // Helper pour la semaine
  const getWeekDays = () => {
    const start = new Date(selectedWeek);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Stats
  const pendingCount = reservations.filter(r => r.status === 'pending').length;
  const todayReservations = reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="pt-20 pb-12 px-4 min-h-screen bg-stone-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-gold mb-2">Panneau d'Administration</h1>
            <p className="font-body text-stone-500 text-sm">Bienvenue, {currentAdmin?.name || 'Admin'}</p>
          </div>
          <button onClick={() => setIsAdmin(false)} className="px-4 py-2 border border-stone-700 text-stone-400 font-body text-xs tracking-widest uppercase rounded hover:border-red-700 hover:text-red-400 transition-colors">
            Déconnexion
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="admin-card p-4">
            <p className="font-body text-[10px] tracking-widest uppercase text-stone-500 mb-1">En attente</p>
            <p className="font-display text-3xl text-amber-400">{pendingCount}</p>
          </div>
          <div className="admin-card p-4">
            <p className="font-body text-[10px] tracking-widest uppercase text-stone-500 mb-1">Aujourd'hui</p>
            <p className="font-display text-3xl text-emerald-400">{todayReservations}</p>
          </div>
          <div className="admin-card p-4">
            <p className="font-body text-[10px] tracking-widest uppercase text-stone-500 mb-1">Employés</p>
            <p className="font-display text-3xl text-stone-300">{employees.length}</p>
          </div>
          <div className="admin-card p-4">
            <p className="font-body text-[10px] tracking-widest uppercase text-stone-500 mb-1">Plats</p>
            <p className="font-display text-3xl text-stone-300">{menuItems.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-800 pb-4">
          {[
            { id: 'reservations', label: 'Réservations', badge: pendingCount },
            { id: 'menu', label: 'Menu' },
            { id: 'employees', label: 'Employés' },
            { id: 'admins', label: 'Admins' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-body text-sm tracking-wide rounded transition-colors ${
                activeTab === tab.id ? 'bg-gold text-stone-950' : 'text-stone-400 hover:text-gold'
              }`}
            >
              {tab.label}
              {tab.badge > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-amber-500 text-stone-950 rounded-full text-xs">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* ONGLET RÉSERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="admin-card p-12 text-center">
                <p className="font-display text-2xl text-stone-600 mb-2">Aucune réservation</p>
                <p className="font-body text-stone-500 text-sm">Les réservations apparaîtront ici</p>
              </div>
            ) : (
              reservations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(r => (
                <div key={r.id} className="admin-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-xl text-stone-100">{r.name}</h3>
                        <span className={`status-badge status-${r.status}`}>
                          {r.status === 'pending' ? 'En attente' : r.status === 'confirmed' ? 'Confirmé' : 'Annulé'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-body text-sm">
                        <div>
                          <p className="text-stone-500 text-xs">Date</p>
                          <p className="text-stone-300">{r.date} à {r.time}</p>
                        </div>
                        <div>
                          <p className="text-stone-500 text-xs">Personnes</p>
                          <p className="text-stone-300">{r.guests}</p>
                        </div>
                        <div>
                          <p className="text-stone-500 text-xs">Email</p>
                          <p className="text-stone-300 text-xs">{r.email}</p>
                        </div>
                        <div>
                          <p className="text-stone-500 text-xs">Téléphone</p>
                          <p className="text-stone-300">{r.phone}</p>
                        </div>
                      </div>
                      {r.notes && <p className="mt-2 text-stone-400 text-sm font-body">📝 {r.notes}</p>}
                    </div>
                    
                    <div className="flex gap-2">
                      {r.status === 'pending' && (
                        <>
                          <button onClick={() => updateReservationStatus(r.id, 'confirmed')} className="px-4 py-2 bg-emerald-900/50 border border-emerald-700 text-emerald-400 font-body text-xs rounded hover:bg-emerald-900 transition-colors">
                            ✓ Confirmer
                          </button>
                          <button onClick={() => updateReservationStatus(r.id, 'cancelled')} className="px-4 py-2 bg-red-900/50 border border-red-700 text-red-400 font-body text-xs rounded hover:bg-red-900 transition-colors">
                            ✕ Annuler
                          </button>
                        </>
                      )}
                      <button onClick={() => deleteReservation(r.id)} className="px-3 py-2 text-stone-500 hover:text-red-400 transition-colors">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ONGLET MENU */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {/* Gestion des catégories */}
            <div className="admin-card p-6">
              <h2 className="font-display text-xl text-gold mb-4">Gestion des Catégories</h2>
              
              <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-3 mb-6 p-4 bg-stone-800/50 rounded">
                <input type="text" placeholder="Titre de la catégorie" value={newCategory.title} onChange={(e) => setNewCategory({...newCategory, title: e.target.value})} className="admin-input flex-1"/>
                <input type="text" placeholder="Description" value={newCategory.description} onChange={(e) => setNewCategory({...newCategory, description: e.target.value})} className="admin-input flex-1"/>
                <button type="submit" className="px-6 py-2 gold-gradient text-stone-950 font-body text-xs tracking-wide rounded hover:shadow-lg transition-all">
                  + Ajouter
                </button>
              </form>
              
              <div className="space-y-2">
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center justify-between p-3 bg-stone-800/30 rounded border border-stone-700">
                    {editingCategoryData?.id === cat.id ? (
                      <div className="flex-1 flex gap-3">
                        <input type="text" value={editingCategoryData.title} onChange={(e) => setEditingCategoryData({...editingCategoryData, title: e.target.value})} className="admin-input"/>
                        <input type="text" value={editingCategoryData.description || ''} onChange={(e) => setEditingCategoryData({...editingCategoryData, description: e.target.value})} className="admin-input" placeholder="Description"/>
                        <button onClick={() => handleUpdateCategory(editingCategoryData)} className="px-3 py-1 bg-emerald-900/50 text-emerald-400 rounded text-xs">✓</button>
                        <button onClick={() => setEditingCategoryData(null)} className="px-3 py-1 bg-stone-700 text-stone-400 rounded text-xs">✕</button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <span className="font-body text-stone-100">{cat.title}</span>
                          <span className="text-stone-500 text-xs ml-2">({cat.key})</span>
                          {cat.description && <p className="text-stone-500 text-xs">{cat.description}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-stone-600 text-xs">{menuItems.filter(i => i.category === cat.key).length} items</span>
                          <button onClick={() => setEditingCategoryData({...cat})} className="text-gold hover:text-amber-300">✏️</button>
                          <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-400 hover:text-red-300">🗑️</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sélection catégorie pour items */}
            <div className="admin-card p-6">
              <h2 className="font-display text-xl text-gold mb-4">Items du Menu</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                  <button key={cat.key} onClick={() => setEditingCategory(editingCategory === cat.key ? null : cat.key)} className={`px-4 py-2 rounded font-body text-xs transition-all ${editingCategory === cat.key ? 'bg-gold text-stone-950' : 'border border-stone-700 text-stone-400 hover:border-gold'}`}>
                    {cat.title} ({menuData[cat.key]?.items?.length || 0})
                  </button>
                ))}
              </div>

              {editingCategory && menuData[editingCategory] && (
                <div>
                  <div className="flex gap-3 mb-4 p-4 bg-stone-800/50 rounded">
                    <input type="text" placeholder="Nom" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="admin-input"/>
                    <input type="number" step="0.01" placeholder="Prix" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} className="admin-input w-24"/>
                    <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} className="admin-input flex-1"/>
                    <button onClick={() => handleAddMenuItem(editingCategory)} className="px-4 py-2 gold-gradient text-stone-950 font-body text-xs rounded">+ Ajouter</button>
                  </div>

                  <div className="space-y-2">
                    {menuData[editingCategory].items?.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-stone-800/30 rounded border border-stone-700">
                        {editingItem === item.id ? (
                          <>
                            <input type="text" value={editingItemData.name} onChange={(e) => setEditingItemData({...editingItemData, name: e.target.value})} className="admin-input"/>
                            <input type="number" step="0.01" value={editingItemData.price} onChange={(e) => setEditingItemData({...editingItemData, price: e.target.value})} className="admin-input w-24"/>
                            <input type="text" value={editingItemData.description} onChange={(e) => setEditingItemData({...editingItemData, description: e.target.value})} className="admin-input flex-1"/>
                            <button onClick={() => handleUpdateMenuItem(item.id)} className="text-emerald-400">✓</button>
                            <button onClick={() => setEditingItem(null)} className="text-stone-400">✕</button>
                          </>
                        ) : (
                          <>
                            <div className="flex-1">
                              <span className="font-body text-stone-100">{item.name}</span>
                              <p className="text-stone-500 text-xs">{item.description}</p>
                            </div>
                            <span className="text-gold font-display text-lg">{parseFloat(item.price).toFixed(2)}$</span>
                            <button onClick={() => { setEditingItem(item.id); setEditingItemData({ name: item.name, price: item.price, description: item.description || '' }); }} className="text-gold">✏️</button>
                            <button onClick={() => handleDeleteMenuItem(item.id)} className="text-red-400">🗑️</button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ONGLET EMPLOYÉS */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Liste employés */}
            <div className="admin-card p-6">
              <h2 className="font-display text-xl text-gold mb-4">Gestion des Employés ({employees.length})</h2>
              
              <form onSubmit={handleAddEmployee} className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6 p-4 bg-stone-800/50 rounded">
                <input type="text" placeholder="Nom *" value={newEmployee.name} onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})} className="admin-input"/>
                <select value={newEmployee.role} onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})} className="admin-input">
                  <option value="">Rôle *</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <input type="tel" placeholder="Téléphone" value={newEmployee.phone} onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})} className="admin-input"/>
                <input type="email" placeholder="Email" value={newEmployee.email} onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})} className="admin-input"/>
                <input type="number" step="0.01" placeholder="Taux/h" value={newEmployee.hourly_rate} onChange={(e) => setNewEmployee({...newEmployee, hourly_rate: e.target.value})} className="admin-input"/>
                <button type="submit" className="gold-gradient text-stone-950 font-body text-xs rounded">+ Ajouter</button>
              </form>

              <div className="space-y-2">
                {employees.map(emp => (
                  <div key={emp.id} className="flex items-center justify-between p-3 bg-stone-800/30 rounded border border-stone-700">
                    <div>
                      <span className="font-body text-stone-100">{emp.name}</span>
                      <span className="ml-2 px-2 py-0.5 bg-gold/20 text-gold text-xs rounded">{emp.role}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-stone-500 text-xs">{emp.phone}</span>
                      <span className="text-stone-500 text-xs">{emp.email}</span>
                      {emp.hourly_rate && <span className="text-gold text-xs">{emp.hourly_rate}$/h</span>}
                      <button onClick={() => handleDeleteEmployee(emp.id)} className="text-red-400">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendrier horaires */}
            <div className="admin-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-gold">Horaires de la Semaine</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    const d = new Date(selectedWeek);
                    d.setDate(d.getDate() - 7);
                    setSelectedWeek(d.toISOString().split('T')[0]);
                  }} className="px-3 py-1 border border-stone-700 text-stone-400 rounded">←</button>
                  <span className="text-stone-300 font-body text-sm">{selectedWeek}</span>
                  <button onClick={() => {
                    const d = new Date(selectedWeek);
                    d.setDate(d.getDate() + 7);
                    setSelectedWeek(d.toISOString().split('T')[0]);
                  }} className="px-3 py-1 border border-stone-700 text-stone-400 rounded">→</button>
                </div>
              </div>

              <form onSubmit={handleAddSchedule} className="flex flex-wrap gap-3 mb-6 p-4 bg-stone-800/50 rounded">
                <select value={newSchedule.employee_id} onChange={(e) => setNewSchedule({...newSchedule, employee_id: e.target.value})} className="admin-input w-40">
                  <option value="">Employé</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
                <input type="date" value={newSchedule.date} onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})} className="admin-input w-40"/>
                <input type="time" value={newSchedule.start_time} onChange={(e) => setNewSchedule({...newSchedule, start_time: e.target.value})} className="admin-input w-28"/>
                <input type="time" value={newSchedule.end_time} onChange={(e) => setNewSchedule({...newSchedule, end_time: e.target.value})} className="admin-input w-28"/>
                <input type="text" placeholder="Notes" value={newSchedule.notes} onChange={(e) => setNewSchedule({...newSchedule, notes: e.target.value})} className="admin-input flex-1"/>
                <button type="submit" className="px-4 py-2 gold-gradient text-stone-950 font-body text-xs rounded">+ Ajouter</button>
              </form>

              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, idx) => {
                  const daySchedules = schedules.filter(s => s.date && s.date.split('T')[0] === day);
                  const isToday = day === new Date().toISOString().split('T')[0];
                  return (
                    <div key={day} className={`p-3 rounded min-h-[120px] ${isToday ? 'bg-gold/10 border border-gold/30' : 'bg-stone-800/30 border border-stone-700'}`}>
                      <div className="text-center mb-2">
                        <span className="font-body text-xs text-stone-500">{dayNames[idx]}</span>
                        <p className={`font-display text-lg ${isToday ? 'text-gold' : 'text-stone-300'}`}>{day.split('-')[2]}</p>
                      </div>
                      <div className="space-y-1">
                        {daySchedules.map(s => (
                          <div key={s.id} className="p-1.5 bg-gold/20 rounded text-xs group relative">
                            <p className="text-gold font-body truncate">{s.employee_name}</p>
                            <p className="text-stone-400">{s.start_time?.slice(0,5)} - {s.end_time?.slice(0,5)}</p>
                            <button onClick={() => handleDeleteSchedule(s.id)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-400 text-xs">✕</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ONGLET ADMINS */}
        {activeTab === 'admins' && (
          <div className="admin-card p-6">
            <h2 className="font-display text-xl text-gold mb-4">Gestion des Administrateurs</h2>
            
            <form onSubmit={handleAddAdmin} className="flex gap-3 mb-6 p-4 bg-stone-800/50 rounded">
              <input type="text" placeholder="Nom d'utilisateur" value={newAdmin.username} onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})} className="admin-input"/>
              <input type="password" placeholder="Mot de passe" value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})} className="admin-input"/>
              <input type="text" placeholder="Nom complet" value={newAdmin.name} onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})} className="admin-input"/>
              <button type="submit" className="px-6 py-2 gold-gradient text-stone-950 font-body text-xs rounded">+ Ajouter</button>
            </form>

            <div className="space-y-2">
              {admins.map(admin => (
                <div key={admin.id} className="flex items-center justify-between p-3 bg-stone-800/30 rounded border border-stone-700">
                  <div>
                    <span className="font-body text-stone-100">{admin.name}</span>
                    <span className="ml-2 text-stone-500 text-xs">@{admin.username}</span>
                  </div>
                  <button onClick={() => handleDeleteAdmin(admin.id)} className="text-red-400 hover:text-red-300" disabled={admins.length <= 1}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
