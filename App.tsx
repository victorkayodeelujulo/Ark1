import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './components/HomePage';
import NowPlayingBar from './components/NowPlayingBar';
import CategoryPage from './components/CategoryPage';
import PlaylistPage from './components/PlaylistPage';
import CheckoutPage from './components/CheckoutPage';
import ProfilePage from './components/ProfilePage';
import WishlistPage from './components/WishlistPage';
import ChatPage from './components/ChatPage';
import SearchPage from './components/SearchPage';
import SearchWithAttachmentsPage from './components/SearchWithAttachmentsPage';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import StoryModal from './components/StoryModal';
import GenrePage from './components/GenrePage';
import WrappedPage from './components/WrappedPage';
import UploadReelModal from './components/UploadReelModal';
import ClosetPage from './components/ClosetPage';
import AIStudioPage from './components/AIStudioPage';
import AIModelPage from './components/AIModelPage';
import WhatsNewPage from './components/WhatsNewPage';
import NewArrivalsPage from './components/NewArrivalsPage';
import WeeklyGemsPage from './components/WeeklyGemsPage';
import TrackPackagePage from './components/TrackPackagePage';
import { Product, QuickLink, Playlist, User, Reel, Genre } from './types';
import { PRODUCTS, INITIAL_STORIES, PURCHASE_HISTORY } from './constants';

const App: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]); // Product IDs
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'playlist' | 'checkout' | 'profile' | 'wishlist' | 'chat' | 'search' | 'genre' | 'wrapped' | 'closet' | 'ai-studio' | 'ai-model' | 'whats-new' | 'new-arrivals' | 'weekly-gems' | 'search-with-attachments' | 'track-package'>('home');
  const [selectedCategory, setSelectedCategory] = useState<QuickLink | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Reel | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [stories, setStories] = useState<Reel[]>(INITIAL_STORIES);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userProfile, setUserProfile] = useState<User>({
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    phone: '+1 123 456 7890',
    avatarUrl: 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=150',
    sizes: {
        tops: 'M',
        denims: '32',
        dresses: 'US 8',
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
        const width = window.innerWidth;
        document.body.classList.remove('is-phone', 'is-tablet', 'is-laptop');
        if (width < 768) { // Typical phone breakpoint
            document.body.classList.add('is-phone');
        } else if (width < 1024) { // Typical tablet breakpoint
            document.body.classList.add('is-tablet');
        } else { // Larger screens
            document.body.classList.add('is-laptop');
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial class
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart(prevCart => [...prevCart, product]);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const handleAddToWishlist = (productId: string) => {
    setWishlist(prev => [...new Set([...prev, productId])]);
  };
  
  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const handleNavigateToCategory = (link: QuickLink) => {
    setSelectedCategory(link);
    setCurrentView('category');
  };
  
  const handleNavigateToPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView('playlist');
  };
    
  const handleNavigateToGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentView('genre');
  };
  
  const handleNavigateToCheckout = () => {
    setCurrentView('checkout');
  };

  const handleNavigateToProfile = () => {
    if (isLoggedIn) {
      setCurrentView('profile');
    }
  };
  
  const handleNavigateToWishlist = () => {
    setCurrentView('wishlist');
  };

  const handleNavigateToChat = () => {
    setCurrentView('chat');
  };
  
  const handleNavigateToSearch = () => {
    setCurrentView('search');
  };
  
  const handleNavigateToWrapped = () => {
    setCurrentView('wrapped');
  };

  const handleNavigateToCloset = () => {
    setCurrentView('closet');
  };

  const handleNavigateToAIStudio = () => {
    setCurrentView('ai-studio');
  };

  const handleNavigateToAIModel = () => {
    setCurrentView('ai-model');
  };

  const handleNavigateToWhatsNew = () => {
    setCurrentView('whats-new');
  };

  const handleNavigateToNewArrivals = () => {
      setCurrentView('new-arrivals');
  };

  const handleNavigateToWeeklyGems = () => {
      setCurrentView('weekly-gems');
  };

    const handleNavigateToTrackPackage = () => {
      setCurrentView('track-package');
  };

  const handleNavigateToSearchWithAttachments = () => {
    setCurrentView('search-with-attachments');
  };

  const handleUpdateProfile = (updatedProfile: User) => {
    setUserProfile(updatedProfile);
  };

  const handleNavigateHome = () => {
    setSelectedCategory(null);
    setSelectedPlaylist(null);
    setSelectedGenre(null);
    setCurrentView('home');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSuccessfulPayment = () => {
    setCart([]);
    setIsPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentSuccess(false);
      handleNavigateHome();
    }, 3000);
  };

  const handleSelectStory = (story: Reel) => {
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };
  
  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);
  
  const handleAddReel = (fileUrl: string, caption: string) => {
    const newReel: Reel = {
      id: `reel-${Date.now()}`,
      userName: userProfile.name,
      thumbnailUrl: fileUrl,
      fullImageUrl: fileUrl,
    };
    setStories(prevStories => [newReel, ...prevStories]);
    handleCloseUploadModal();
  };

  const renderContent = () => {
    if (currentView === 'track-package') {
        return <TrackPackagePage onBack={handleNavigateHome} />;
    }

    if (currentView === 'search-with-attachments') {
        return (
            <SearchWithAttachmentsPage
                products={PRODUCTS}
                wishlist={wishlist}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onBack={handleNavigateHome}
            />
        );
    }

    if (currentView === 'ai-model') {
        return (
            <AIModelPage
                products={PRODUCTS}
                onAddToCart={handleAddToCart}
                onBack={handleNavigateHome}
            />
        );
    }
    
    if (currentView === 'ai-studio') {
        const closetProducts = PURCHASE_HISTORY
            .map(id => PRODUCTS.find(p => p.id === id))
            .filter((p): p is Product => Boolean(p));
        const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

        return (
            <AIStudioPage
                closetProducts={closetProducts}
                wishlistProducts={wishlistProducts}
                wishlist={wishlist}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onBack={handleNavigateHome}
            />
        );
    }

    if (currentView === 'whats-new') {
        return (
            <WhatsNewPage
                products={PRODUCTS}
                wishlist={wishlist}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onBack={handleNavigateHome}
            />
        );
    }

    if (currentView === 'new-arrivals') {
        const newArrivalsProducts = PRODUCTS.slice(-4);
        return (
            <NewArrivalsPage
                products={newArrivalsProducts}
                wishlist={wishlist}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onBack={handleNavigateHome}
            />
        );
    }
    
    if (currentView === 'weekly-gems') {
        const weeklyGemsProducts = ['prod-001', 'prod-005', 'prod-008', 'prod-012']
            .map(id => PRODUCTS.find(p => p.id === id))
            .filter((p): p is Product => Boolean(p));
        return (
            <WeeklyGemsPage
                products={weeklyGemsProducts}
                wishlist={wishlist}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onBack={handleNavigateHome}
            />
        );
    }
    
    if (currentView === 'closet') {
        const closetProducts = PURCHASE_HISTORY
            .map(id => PRODUCTS.find(p => p.id === id))
            .filter((p): p is Product => Boolean(p));
        return (
            <ClosetPage
                products={closetProducts}
                wishlist={wishlist}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onBack={handleNavigateHome}
            />
        );
    }

    if (currentView === 'wrapped') {
        return <WrappedPage onBack={handleNavigateHome} onOpenUploadModal={handleOpenUploadModal} />;
    }
    
    if (currentView === 'genre' && selectedGenre) {
        const genreProducts = PRODUCTS.filter(p => selectedGenre.productIds.includes(p.id));
        return (
            <GenrePage
                genre={selectedGenre}
                products={genreProducts}
                wishlist={wishlist}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onBack={() => setCurrentView('search')}
            />
        );
    }
    
    if (currentView === 'search') {
      return (
        <SearchPage
          products={PRODUCTS}
          wishlist={wishlist}
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onNavigateToGenre={handleNavigateToGenre}
          onBack={handleNavigateHome}
        />
      );
    }

    if (currentView === 'chat') {
        return <ChatPage onBack={handleNavigateHome} />;
    }
    
    if (currentView === 'wishlist') {
      const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
      return (
        <WishlistPage
          products={wishlistProducts}
          wishlist={wishlist}
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onBack={handleNavigateHome}
        />
      );
    }

    if (currentView === 'profile') {
      return (
        <ProfilePage
          user={userProfile}
          onUpdateProfile={handleUpdateProfile}
          onBack={handleNavigateHome}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />
      );
    }

    if (currentView === 'checkout') {
      return (
        <CheckoutPage 
          cart={cart}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onSuccessfulPayment={handleSuccessfulPayment}
          onRemoveFromCart={handleRemoveFromCart}
          onBack={handleNavigateHome}
        />
      );
    }

    if (currentView === 'category' && selectedCategory) {
      const categoryProducts = PRODUCTS.filter(p => selectedCategory.productIds.includes(p.id));
      return (
        <CategoryPage
          category={selectedCategory}
          products={categoryProducts}
          wishlist={wishlist}
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onBack={handleNavigateHome}
        />
      );
    }
    
    if (currentView === 'playlist' && selectedPlaylist) {
      const playlistProducts = PRODUCTS.filter(p => selectedPlaylist.productIds.includes(p.id));
      return (
        <PlaylistPage
// FIX: The `playlist` prop was being passed the incorrect variable `playlist` which was undefined. This has been corrected to use `selectedPlaylist` which holds the currently selected playlist object.
          playlist={selectedPlaylist}
          products={playlistProducts}
          wishlist={wishlist}
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onBack={handleNavigateHome}
        />
      );
    }
    
    return (
      <HomePage
        stories={stories}
        wishlist={wishlist}
        onProductSelect={handleProductSelect}
        onAddToCart={handleAddToCart}
        onNavigateToCategory={handleNavigateToCategory}
        onNavigateToPlaylist={handleNavigateToPlaylist}
        onAddToWishlist={handleAddToWishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onSelectStory={handleSelectStory}
        onOpenUploadModal={handleOpenUploadModal}
      />
    );
  };

  return (
    <div className="h-screen bg-arkaenia-bg dark:bg-arkaenia-bg-dark text-arkaenia-text dark:text-arkaenia-text-dark font-sans flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            onToggle={handleToggleSidebar} 
            currentView={currentView}
            onNavigateHome={handleNavigateHome}
            onNavigateToWishlist={handleNavigateToWishlist}
            onNavigateToChat={handleNavigateToChat}
            onNavigateToSearch={handleNavigateToSearch}
            onNavigateToSearchWithAttachments={handleNavigateToSearchWithAttachments}
            onNavigateToWrapped={handleNavigateToWrapped}
            onNavigateToCloset={handleNavigateToCloset}
            onNavigateToAIStudio={handleNavigateToAIStudio}
            onNavigateToAIModel={handleNavigateToAIModel}
            onNavigateToWhatsNew={handleNavigateToWhatsNew}
            onNavigateToNewArrivals={handleNavigateToNewArrivals}
            onNavigateToWeeklyGems={handleNavigateToWeeklyGems}
            onNavigateToTrackPackage={handleNavigateToTrackPackage}
        />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Header 
            cartCount={cart.length} 
            isLoggedIn={isLoggedIn}
            user={userProfile}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigateHome={handleNavigateHome} 
            onNavigateToCheckout={handleNavigateToCheckout} 
            onNavigateToProfile={handleNavigateToProfile}
          />
          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </main>
      </div>
      {currentView !== 'wrapped' && <NowPlayingBar product={selectedProduct} onAddToCart={handleAddToCart} />}
      {isPaymentSuccess && <PaymentSuccessModal />}
      {selectedStory && <StoryModal story={selectedStory} onClose={handleCloseStory} />}
      {isUploadModalOpen && <UploadReelModal onClose={handleCloseUploadModal} onPost={handleAddReel} />}
    </div>
  );
};

export default App;