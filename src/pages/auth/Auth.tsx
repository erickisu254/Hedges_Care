
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Leaf, Lock, Mail, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { mockDataService } from "@/services/mockDataService";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/contexts/LanguageContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isUsingMockData } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: isSwahili ? "Mioja inayokosekana" : "Missing fields",
        description: isSwahili ? "Tafadhali ingiza barua pepe na nywila" : "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      if (isUsingMockData) {
        const { user, error } = await mockDataService.signIn(email, password);
        if (error) throw new Error(error);
        
        toast({
          title: isSwahili ? "Ingia kwa mafanikio (Njia ya Demo)" : "Login successful (Demo Mode)",
          description: isSwahili ? "Karibu! Unatumia njia ya demo na data ya mfano." : "Welcome! You're using demo mode with sample data.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        toast({
          title: isSwahili ? "Ingia kwa mafanikio" : "Login successful",
          description: isSwahili ? "Karibu tena!" : "Welcome back!",
        });
      }
      
      navigate("/scan");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during login";
      toast({
        title: isSwahili ? "Ingia imeshindikana" : "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) {
      toast({
        title: isSwahili ? "Mioja inayokosekana" : "Missing fields",
        description: isSwahili ? "Tafadhali jaza nyanja zote zinazohitajika" : "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      if (isUsingMockData) {
        const { user, error } = await mockDataService.signUp(email, password, username, fullName);
        if (error) throw new Error(error);
        
        toast({
          title: isSwahili ? "Jisajili kwa mafanikio (Njia ya Demo)" : "Registration successful (Demo Mode)",
          description: isSwahili ? "Akaunti imetengenezwa! Sasa unaweza kuingia." : "Account created! You can now sign in with your credentials.",
        });
        
        setActiveTab("login");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              full_name: fullName,
            },
          },
        });

        if (error) throw error;
        
        toast({
          title: isSwahili ? "Jisajili kwa mafanikio" : "Registration successful",
          description: isSwahili ? "Akaunti yako imetengenezwa. Tafadhali kagua barua pepe yako." : "Your account has been created. Please check your email for verification.",
        });
        
        setActiveTab("login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during registration";
      toast({
        title: isSwahili ? "Jisajili imeshindikana" : "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-emerald-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-emerald-700">
              <span className="text-2xl animate-float">🌿</span>
              <span className="text-xl font-bold">Hedges Care</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-emerald-100 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-4 rounded-full shadow-inner">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-900">{t('auth.welcome')}</CardTitle>
            <CardDescription className="text-emerald-700">
              {t('auth.tagline')}
            </CardDescription>
          </CardHeader>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-emerald-50 p-1">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-emerald-700">{t('auth.login')}</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-emerald-700">{t('auth.signup')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-emerald-900">{t('auth.email')}</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">{t('auth.password')}</Label>
                      <Link to="#" className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline">
                        {t('auth.forgotPassword')}
                      </Link>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? t('auth.loggingIn') : t('auth.login')}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t('auth.email')}</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 border-emerald-100 focus:border-emerald-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">{t('auth.username')}</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        className="pl-10 border-emerald-100 focus:border-emerald-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullname">{t('auth.fullName')} ({isSwahili ? "Hiari" : "Optional"})</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 border-emerald-100 focus:border-emerald-500"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t('auth.password')}</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-emerald-100 focus:border-emerald-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? t('auth.creatingAccount') : t('auth.createAccount')}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-8 border-t border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-emerald-800">
              <span className="font-bold">© {new Date().getFullYear()} Hedges Care</span>
            </div>
            <div className="flex space-x-8">
              <Link to="/" className="text-emerald-600 hover:text-emerald-900 transition-colors font-medium">{isSwahili ? "Nyumbani" : "Home"}</Link>
              <Link to="/scan" className="text-emerald-600 hover:text-emerald-900 transition-colors font-medium">{isSwahili ? "Scan" : "Scan"}</Link>
              <Link to="/about" className="text-emerald-600 hover:text-emerald-900 transition-colors font-medium">{isSwahili ? "Kuhusu" : "About"}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
