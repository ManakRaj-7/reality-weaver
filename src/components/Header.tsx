import { motion } from 'framer-motion';
import { Sparkles, LogIn, UserPlus, LogOut, History, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Sparkles className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
          </div>
          <span className="font-display text-xl font-bold text-gradient-primary">
            What If?
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/gallery">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </Link>
          </Button>
          
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/history">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">My Realities</span>
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground hidden md:inline">
                {user.email?.split('@')[0]}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </Button>
              <Button variant="cosmic" size="sm" asChild>
                <Link to="/auth?mode=signup">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
