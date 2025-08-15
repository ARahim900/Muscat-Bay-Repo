import React from 'react';
import { Icons } from '../constants';

interface HeaderProps {
    title: string;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, setSidebarOpen }) => {
    return (
        <header className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
            <div className="flex items-center">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-slate-600">
                    <Icons.menu className="w-6 h-6" />
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative hidden md:block">
                    <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full px-4 py-2 pl-10 text-sm text-slate-700 bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4E4456]/50"
                    />
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
                    <Icons.notification className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
                    <Icons.settings className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-3">
                    <img 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ring-[#A8D8D4]" 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" 
                        alt="User profile" 
                    />
                    <div className="hidden sm:block">
                        <p className="font-semibold text-sm text-slate-700">Admin</p>
                        <p className="text-xs text-slate-500">Facility Manager</p>
                    </div>
                </div>
            </div>
        </header>
    );
};