import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Users, MapPin, Calendar, DollarSign, Settings, Eye, TrendingUp, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  currency: string;
  totalExpenses: number;
  memberCount: number;
  yourBalance: number;
  createdAt: string;
  isOwner: boolean;
  status: 'active' | 'settled' | 'inactive';
  recentActivity: string;
}

const Groups = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeMode, setActiveMode] = useState<'group' | 'personal'>('group');
  const [activeSubNav, setActiveSubNav] = useState('home');

  const handleNavigation = (nav: string) => {
    if (nav === 'create-group') {
      navigate('/create-group');
    } else if (nav === 'home') {
      navigate('/groups');
    } else {
      navigate('/');
    }
  };
  
  // Mock data - replace with actual data from backend
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Europe Trip 2024',
      description: 'Our amazing European adventure with friends',
      currency: 'EUR',
      totalExpenses: 2850.50,
      memberCount: 6,
      yourBalance: -120.50,
      createdAt: '2024-02-15',
      isOwner: true,
      status: 'active',
      recentActivity: '2 hours ago'
    },
    {
      id: '2', 
      name: 'Apartment Roommates',
      description: 'Shared expenses for our apartment',
      currency: 'USD',
      totalExpenses: 1200.00,
      memberCount: 3,
      yourBalance: 45.25,
      createdAt: '2024-01-10',
      isOwner: false,
      status: 'active',
      recentActivity: '1 day ago'
    },
    {
      id: '3',
      name: 'Weekend Getaway',
      description: 'Cabin trip expenses',
      currency: 'USD', 
      totalExpenses: 680.75,
      memberCount: 4,
      yourBalance: 0,
      createdAt: '2024-01-20',
      isOwner: false,
      status: 'settled',
      recentActivity: '1 week ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'settled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return 'text-emerald-400';
    if (balance < 0) return 'text-red-400';
    return 'text-gray-400';
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
        <div className="space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Users className="w-5 h-5 mr-2 text-primary" />
              <span className="text-white/80 text-sm font-medium">Group Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-cyber mb-4">
              My Groups
            </h1>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Manage your shared expenses and stay connected with your groups
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/create-group')}
              size="lg"
              className="group relative overflow-hidden px-8 py-4 bg-gradient-primary text-white hover:shadow-glow transition-all duration-300 hover-lift"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create New Group
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => {/* Handle join group */}}
              className="px-8 py-4 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm hover-lift transition-all duration-300"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Join Group
            </Button>
          </div>

          {/* Groups Grid */}
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group, index) => (
                <Card 
                  key={group.id} 
                  className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover-lift animate-slide-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/group/${group.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 border-2 border-white/20">
                          <AvatarImage src={group.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white font-bold">
                            {group.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white text-lg group-hover:text-primary transition-colors">
                            {group.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant={group.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {group.status}
                            </Badge>
                            {group.isOwner && (
                              <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                                Owner
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Settings className="w-4 h-4 text-white/60" />
                      </Button>
                    </div>
                    
                    <CardDescription className="text-white/60 mt-2 line-clamp-2">
                      {group.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
                        <div className="text-white font-semibold">
                          {group.currency} {group.totalExpenses.toFixed(2)}
                        </div>
                        <div className="text-white/60 text-xs">Total Expenses</div>
                      </div>
                      
                      <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <Users className="w-5 h-5 text-secondary mx-auto mb-1" />
                        <div className="text-white font-semibold">{group.memberCount}</div>
                        <div className="text-white/60 text-xs">Members</div>
                      </div>
                    </div>

                    {/* Your Balance */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-white/5 to-white/10 border border-white/10">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="text-white/80 text-sm">Your Balance</span>
                      </div>
                      <div className={`font-bold ${
                        group.yourBalance >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {group.yourBalance >= 0 ? '+' : ''}{group.currency} {Math.abs(group.yourBalance).toFixed(2)}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-2 text-white/60 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>Updated {group.recentActivity}</span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-white hover:bg-primary/20 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/group/${group.id}`);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Users className="w-12 h-12 text-white/40" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Groups Yet</h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                Create your first group to start sharing expenses with friends, family, or colleagues.
              </p>
              <Button 
                onClick={() => navigate('/create-group')}
                size="lg"
                className="bg-gradient-primary text-white hover:shadow-glow transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Group
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Groups;