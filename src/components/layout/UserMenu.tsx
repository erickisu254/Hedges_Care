
import React from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, LogIn, Settings, Crown, Calendar } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut, isUsingMockData } = useAuth();
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: isSwahili ? "Umetoka kwa mafanikio" : "Signed out successfully",
        description: isSwahili ? "Umetolewa kwenye akaunti yako" : "You have been logged out of your account"
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: isSwahili ? "Hitilafu wakati wa kutoka" : "Error signing out",
        description: isSwahili ? "Hitilafu ilitokea wakati wa kutoka" : "An error occurred while signing out",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <Button 
        variant="default"
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
        onClick={() => navigate("/auth")}
      >
        <LogIn className="mr-2 h-4 w-4" />
        {isSwahili ? "Ingia" : "Sign In"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-emerald-100 hover:bg-emerald-50 p-0 overflow-hidden">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={user.email || ""} />
            <AvatarFallback className="bg-emerald-100 text-emerald-800">
              {user.email?.charAt(0).toUpperCase() || <User className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border-emerald-100 shadow-xl">
        <DropdownMenuItem className="font-normal flex items-center focus:bg-emerald-50">
          <User className="mr-2 h-4 w-4 text-emerald-600" />
          <div className="flex flex-col">
            <span className="truncate font-medium">{user.email}</span>
            {isUsingMockData && (
              <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">Demo Mode</span>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-emerald-50" />
        
        <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer focus:bg-emerald-50">
          <User className="mr-2 h-4 w-4 text-emerald-600" />
          <span>{isSwahili ? "Wasifu" : "Profile"}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate("/subscription")} className="cursor-pointer focus:bg-emerald-50">
          <Crown className="mr-2 h-4 w-4 text-amber-500" />
          <span>{isSwahili ? "Usajili" : "Subscription"}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate("/plant-timeline")} className="cursor-pointer focus:bg-emerald-50">
          <Calendar className="mr-2 h-4 w-4 text-emerald-600" />
          <span>{isSwahili ? "Muda wa Mmea" : "Plant Timeline"}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-emerald-50" />
        
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isSwahili ? "Ondoka" : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
