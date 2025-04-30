import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Moon, Sun, Menu, X, LogOut, User, Settings, Key } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const profileSchema = z.object({
  displayName: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Current password is required" }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your new password" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ProfileSettingsDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [isLoading, setIsLoading] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: currentUser?.displayName || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      setIsLoading(true);
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: data.displayName,
        });
        toast.success("Profile updated successfully!");
        onClose();
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      setIsLoading(true);
      if (currentUser && currentUser.email) {
        // Reauthenticate user
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          data.currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
        
        // Update password
        await updatePassword(currentUser, data.newPassword);
        toast.success("Password updated successfully!");
        onClose();
      }
    } catch (error: any) {
      console.error("Password update error:", error);
      toast.error(error.message || "Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'password' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
        </div>
        {activeTab === 'profile' ? (
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <FormField
                control={profileForm.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Header: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Initial check for hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <header
      className={`border-b border-border fixed top-0 left-0 right-0 z-50 ${
        theme === "dark" ? "bg-background" : "bg-background"
      }`}
    >
      <div className="container flex items-center justify-between h-16 max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hidden md:flex">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="hidden md:inline-flex"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  className="hidden md:inline-flex"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-muted/50"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 ${
          isMobileMenuOpen ? "block" : "hidden"
        } ${
          theme === "dark" ? "bg-background/95 backdrop-blur-sm" : "bg-background/95 backdrop-blur-sm"
        }`}
      >
        <div className="container h-[calc(100dvh-4rem)]">
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-5 pt-6 mt-10 items-center">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-foreground/90 hover:text-foreground transition-colors px-6 py-4 rounded-lg hover:bg-accent/50 text-base font-medium flex items-center justify-between group"
              >
                <span>Home</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-foreground/90 hover:text-foreground transition-colors px-6 py-4 rounded-lg hover:bg-accent/50 text-base font-medium flex items-center justify-between group"
              >
                <span>Features</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-foreground/90 hover:text-foreground transition-colors px-6 py-4 rounded-lg hover:bg-accent/50 text-base font-medium flex items-center justify-between group"
              >
                <span>Pricing</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              <Link 
                to="/about"
                className="text-foreground/90 hover:text-foreground transition-colors px-6 py-4 rounded-lg hover:bg-accent/50 text-base font-medium flex items-center justify-between group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>About</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            </nav>

            {/* User Section */}
            <div className="mt-auto pb-8 safe-bottom">
              {currentUser ? (
                <div className="space-y-4 px-4">
                  <div className="px-4 py-3 rounded-lg bg-accent/20">
                    <p className="text-sm text-muted-foreground">Signed in as</p>
                    <p className="font-medium">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-center text-base rounded-lg" 
                      onClick={() => {
                        setIsProfileDialogOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full justify-center text-base rounded-lg" 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 px-4">
                  <Button
                    variant="outline"
                    className="w-full justify-center text-base rounded-lg"
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full justify-center text-base rounded-lg"
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProfileSettingsDialog 
        isOpen={isProfileDialogOpen} 
        onClose={() => setIsProfileDialogOpen(false)} 
      />
    </header>
  );
};

export default Header;
