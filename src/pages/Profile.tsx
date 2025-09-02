import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, QrCode, Building2, Mail, Phone, Shield, Settings } from "lucide-react";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import UPIManagement from "@/components/profile/UPIManagement";
import QRCodeSection from "@/components/profile/QRCodeSection";
import BankAccountsManager from "@/components/profile/BankAccountsManager";
import ContactInformation from "@/components/profile/ContactInformation";
import SecuritySettings from "@/components/profile/SecuritySettings";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gradient-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-white/70">Manage your personal information, payment methods, and security settings</p>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-white/10 backdrop-blur-sm">
            <TabsTrigger 
              value="personal" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="upi" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">UPI</span>
            </TabsTrigger>
            <TabsTrigger 
              value="qr" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70"
            >
              <QrCode className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">QR Code</span>
            </TabsTrigger>
            <TabsTrigger 
              value="bank" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70"
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Banks</span>
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white/70"
            >
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <PersonalInfoForm />
          </TabsContent>

          <TabsContent value="upi" className="space-y-6">
            <UPIManagement />
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <QRCodeSection />
          </TabsContent>

          <TabsContent value="bank" className="space-y-6">
            <BankAccountsManager />
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <ContactInformation />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;