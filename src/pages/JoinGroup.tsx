import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Globe, Lock, UserPlus, Star, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockGroups = [{
  id: 1,
  name: "Weekend Trip",
  description: "Our amazing weekend getaway expenses",
  members: 5,
  totalExpenses: 1250.50,
  currency: "USD",
  privacy: "private",
  image: null,
  recentActivity: "2 hours ago",
  category: "Travel"
}, {
  id: 2,
  name: "Office Lunch Group",
  description: "Daily office lunch orders and team meals",
  members: 12,
  totalExpenses: 890.25,
  currency: "USD",
  privacy: "public",
  image: null,
  recentActivity: "30 minutes ago",
  category: "Food"
}, {
  id: 3,
  name: "House Expenses",
  description: "Shared household costs and utilities",
  members: 4,
  totalExpenses: 2100.75,
  currency: "USD",
  privacy: "private",
  image: null,
  recentActivity: "1 day ago",
  category: "Housing"
}];
const JoinGroup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(mockGroups);
  const {
    toast
  } = useToast();
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredGroups(mockGroups);
    } else {
      const filtered = mockGroups.filter(group => group.name.toLowerCase().includes(query.toLowerCase()) || group.description.toLowerCase().includes(query.toLowerCase()) || group.category.toLowerCase().includes(query.toLowerCase()));
      setFilteredGroups(filtered);
    }
  };
  const handleJoinByCode = () => {
    if (!joinCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid join code",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Successfully joined the group"
    });
    setJoinCode("");
  };
  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Join Request Sent",
      description: `Your request to join "${groupName}" has been sent`
    });
  };
  return <div className="min-h-screen pt-32 pb-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Join a Group</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Find and join existing expense groups or use an invitation code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Join Methods */}
          <div className="space-y-6">
            {/* Join by Code */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Join by Code
                </CardTitle>
                <CardDescription>Enter an invitation code from a group admin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="join-code" className="text-primary font-medium">Invitation Code</Label>
                  <Input id="join-code" placeholder="e.g., GRP-ABC123" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} className="border-primary/30 focus:border-primary font-mono" />
                </div>
                <Button onClick={handleJoinByCode} className="w-full bg-gradient-primary hover:bg-primary text-white">
                  Join Group
                </Button>
              </CardContent>
            </Card>

            {/* Search Filter */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Groups
                </CardTitle>
                <CardDescription>Find public groups to join</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-primary font-medium">Search</Label>
                  <Input id="search" placeholder="Search by name, description..." value={searchQuery} onChange={e => handleSearch(e.target.value)} className="border-primary/30 focus:border-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-primary text-sm">Public Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Available:</span>
                  <span className="font-medium text-primary">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Most Popular:</span>
                  <span className="font-medium text-primary">Office Lunch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categories:</span>
                  <span className="font-medium text-primary">8</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Groups */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Available Groups</h2>
              <Badge variant="outline" className="border-primary text-primary">
                {filteredGroups.length} Groups Found
              </Badge>
            </div>

            <div className="grid gap-6">
              {filteredGroups.map(group => <Card key={group.id} className="glass-card hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16 border-4 border-primary/20">
                        <AvatarImage className="bg-gradient-primary" />
                        <AvatarFallback className="bg-primary text-white text-lg">
                          {group.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold text-card-foreground">{group.name}</h3>
                              {group.privacy === "private" ? <Lock className="w-4 h-4 text-muted-foreground" /> : <Globe className="w-4 h-4 text-primary" />}
                            </div>
                            <p className="text-muted-foreground">{group.description}</p>
                          </div>
                          <Badge variant="outline" className="border-primary text-primary">
                            {group.category}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{group.members} members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">
                              {group.currency} {group.totalExpenses.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{group.recentActivity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-accent" />
                            <span className="text-muted-foreground">4.8 rating</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={group.privacy === "public" ? "default" : "secondary"} className={group.privacy === "public" ? "bg-primary text-white" : ""}>
                              {group.privacy === "public" ? "Public" : "Private"}
                            </Badge>
                            {group.privacy === "public" && <Badge variant="outline" className="border-accent text-accent">
                                Instant Join
                              </Badge>}
                          </div>
                          <Button onClick={() => handleJoinGroup(group.name)} className="bg-gradient-primary hover:bg-primary text-white">
                            {group.privacy === "public" ? "Join Now" : "Request to Join"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}

              {filteredGroups.length === 0 && <Card className="glass-card">
                  <CardContent className="p-12 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">No Groups Found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or ask for an invitation code
                    </p>
                  </CardContent>
                </Card>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default JoinGroup;