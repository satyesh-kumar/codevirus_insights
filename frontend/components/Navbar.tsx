
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  onOpenModal: () => void;
  onSearch: (query: string) => void;
  currentUser: User | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onSearch, currentUser, theme, onToggleTheme }) => {
  return (
    <nav className={`fixed top-0 w-full h-16 border-b z-50 px-4 shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="max-w-6xl mx-auto h-full flex items-center gap-4 lg:gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className={`text-xl font-black tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Codevirus <span className="text-blue-500">Insights</span>
          </span>
        </Link>

        <div className={`hidden md:flex gap-6 h-full items-center ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          <Link to="/" className="hover:text-blue-500 h-full flex items-center border-b-2 border-transparent hover:border-blue-500 transition-all">
            <i className="fa-solid fa-terminal"></i>
          </Link>
          <button className="hover:text-blue-500 h-full flex items-center border-b-2 border-transparent hover:border-blue-500 transition-all">
            <i className="fa-solid fa-shield-halved"></i>
          </button>
        </div>

        <div className="flex-1 relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input
            type="text"
            placeholder="Search security archives..."
            className={`w-full border rounded px-10 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 ${theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-600'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          {currentUser && (
            <>
              <img src={currentUser.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-blue-500/50" />
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition-all shadow-md shadow-blue-900/20 active:scale-95"
                onClick={onOpenModal}
              >
                Inquiry
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
