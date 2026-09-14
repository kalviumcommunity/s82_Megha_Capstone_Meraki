import { Sun, Moon, Globe, Award, Trophy, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ThemeLanguageBar({ onOpenCert, onOpenLeaderboard, onOpenChat }) {
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage, t } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            {/* Quick Action Triggers */}
            {onOpenCert && (
                <button
                    onClick={onOpenCert}
                    title="Certificate Generator"
                    className="p-2 rounded-xl text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
                >
                    <Award className="w-4 h-4 text-primary" />
                    <span className="hidden md:inline">{t('certificates')}</span>
                </button>
            )}

            {onOpenLeaderboard && (
                <button
                    onClick={onOpenLeaderboard}
                    title="Leaderboard"
                    className="p-2 rounded-xl text-gray-500 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
                >
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="hidden md:inline">{t('leaderboard')}</span>
                </button>
            )}

            {onOpenChat && (
                <button
                    onClick={onOpenChat}
                    title="Messages"
                    className="p-2 rounded-xl text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative flex items-center gap-1.5 text-xs font-bold"
                >
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" />
                    <span className="hidden md:inline">{t('messages')}</span>
                </button>
            )}

            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-[10px] font-black uppercase">
                <button
                    onClick={() => changeLanguage('en')}
                    className={`px-2 py-1 rounded-lg transition-all ${language === 'en' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs' : 'text-gray-400'}`}
                >
                    EN
                </button>
                <button
                    onClick={() => changeLanguage('hi')}
                    className={`px-2 py-1 rounded-lg transition-all ${language === 'hi' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs' : 'text-gray-400'}`}
                >
                    HI
                </button>
                <button
                    onClick={() => changeLanguage('es')}
                    className={`px-2 py-1 rounded-lg transition-all ${language === 'es' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs' : 'text-gray-400'}`}
                >
                    ES
                </button>
            </div>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
        </div>
    );
}
