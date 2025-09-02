import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, User, Home, Plus, UserPlus, Wallet, PieChart, History, Settings, TrendingUp } from "lucide-react";

interface NavigationProps {
  activeMode: 'group' | 'personal';
  onModeChange: (mode: 'group' | 'personal') => void;
  activeSubNav: string;
  onSubNavChange: (nav: string) => void;
}

const Navigation = ({ activeMode, onModeChange, activeSubNav, onSubNavChange }: NavigationProps) => {
  const groupNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create-group', label: 'Create Group', icon: Plus },
    { id: 'join-group', label: 'Join Group', icon: UserPlus },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'history', label: 'History', icon: History },
  ];

  const personalNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'history', label: 'History', icon: History },
  ];

  const currentNavItems = activeMode === 'group' ? groupNavItems : personalNavItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Mode Toggle */}
        <div className="flex items-center justify-between py-3">
          {/* Logo and Mode Toggles */}
          <div className="flex items-center space-x-4">
            <div className="text-gradient-cyber font-bold text-lg hidden sm:block">
              Zenith Wallet
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant={activeMode === 'group' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onModeChange('group')}
                className={`${
                  activeMode === 'group' 
                    ? 'nav-active' 
                    : 'nav-inactive'
                } transition-all duration-300 hover-lift`}
              >
                <Users className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Group Expenses</span>
                <span className="sm:hidden">Group</span>
              </Button>
              <Button
                variant={activeMode === 'personal' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onModeChange('personal')}
                className={`${
                  activeMode === 'personal' 
                    ? 'nav-active' 
                    : 'nav-inactive'
                } transition-all duration-300 hover-lift`}
              >
                <User className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Personal</span>
                <span className="sm:hidden">Personal</span>
              </Button>
            </div>
          </div>

          {/* Profile Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSubNavChange('profile')}
            className={`${
              activeSubNav === 'profile' 
                ? 'nav-active' 
                : 'nav-inactive'
            } transition-all duration-300 hover-lift`}
          >
            <Settings className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Profile</span>
          </Button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center space-x-1 pb-3 overflow-x-auto scrollbar-hide">
          {currentNavItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onSubNavChange(item.id)}
                className={`${
                  activeSubNav === item.id 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                } transition-all duration-300 whitespace-nowrap hover-lift animate-slide-in-left`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="text-responsive-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;