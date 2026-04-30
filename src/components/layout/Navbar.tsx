import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Vote, LogOut, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, login, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-['Outfit'] tracking-tight">ElectiVate</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/simulator" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Simulator</Link>
            <Link to="/map" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Polling Map</Link>
            <Link to="/learn" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Learn</Link>
            <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Insights</Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 glass-card">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full border border-white/20" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium hidden sm:inline">{user.displayName?.split(' ')[0]}</span>
                </div>
                <button onClick={logout} className="p-2 text-gray-400 hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                className="btn-google"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.svg" alt="Google" className="w-4 h-4" />
                <span className="text-sm">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
