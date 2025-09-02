import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Dashboard from "./Dashboard";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import Wallet from "./Wallet";
import Analytics from "./Analytics";
import History from "./History";
import Profile from "./Profile";
import WelcomeHero from "@/components/WelcomeHero";
import FloatingActionButton from "@/components/FloatingActionButton";
import AddExpenseModal from "@/components/AddExpenseModal";
import CalculatorModal from "@/components/CalculatorModal";
import QRScannerModal from "@/components/QRScannerModal";
import PullToRefresh from "@/components/PullToRefresh";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<'group' | 'personal'>('group');
  const [activeSubNav, setActiveSubNav] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Check if user is new (this would typically come from auth/storage)
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsNewUser(false);
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeDismiss = () => {
    setShowWelcome(false);
    localStorage.setItem('hasVisited', 'true');
    setIsNewUser(false);
  };

  const handleNavigation = (nav: string) => {
    if (nav === 'create-group') {
      navigate('/create-group');
    } else if (activeMode === 'group' && nav === 'home') {
      navigate('/groups');
    } else {
      setActiveSubNav(nav);
    }
  };

  const handleFloatingAction = (action: string) => {
    switch (action) {
      case 'addExpense':
        setShowAddExpense(true);
        break;
      case 'sendMoney':
        setActiveSubNav('wallet');
        toast({
          title: "Send Money",
          description: "Navigating to wallet...",
        });
        break;
      case 'scanQR':
        setShowQRScanner(true);
        break;
      case 'calculate':
        setShowCalculator(true);
        break;
    }
  };

  const handleRefresh = async () => {
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Refreshed!",
      description: "Data has been updated.",
    });
  };

  const renderContent = () => {
    // Show welcome hero for new users
    if (isNewUser && showWelcome && activeSubNav === 'home') {
      return <WelcomeHero onDismiss={handleWelcomeDismiss} />;
    }

    switch (activeSubNav) {
      case 'home':
        return <Dashboard mode={activeMode} />;
      case 'create-group':
        return <CreateGroup />;
      case 'join-group':
        return <JoinGroup />;
      case 'wallet':
        return <Wallet />;
      case 'analytics':
        return <Analytics mode={activeMode} />;
      case 'history':
        return <History mode={activeMode} />;
      case 'expenses':
        return <Dashboard mode="personal" />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{activeSubNav} Page</h2>
              <p>This section is under construction</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation 
        activeMode={activeMode} 
        onModeChange={setActiveMode}
        activeSubNav={activeSubNav}
        onSubNavChange={handleNavigation}
      />
      
      <main className={`pt-24 pb-8 max-w-7xl mx-auto spacing-responsive ${
        isMobile ? 'px-2' : 'px-4 sm:px-6 lg:px-8'
      }`}>
        {isMobile ? (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </PullToRefresh>
        ) : (
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        )}
      </main>

      {/* Floating Action Button - Hidden on welcome screen */}
      {!(isNewUser && showWelcome && activeSubNav === 'home') && (
        <FloatingActionButton
          onAddExpense={() => handleFloatingAction('addExpense')}
          onSendMoney={() => handleFloatingAction('sendMoney')}
          onScanQR={() => handleFloatingAction('scanQR')}
          onCalculate={() => handleFloatingAction('calculate')}
        />
      )}

      {/* Add Expense Modal */}
      <AddExpenseModal 
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        mode={activeMode}
      />

      {/* Calculator Modal */}
      <CalculatorModal 
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      {/* QR Scanner Modal */}
      <QRScannerModal 
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
      />
    </div>
  );
};

export default Index;
