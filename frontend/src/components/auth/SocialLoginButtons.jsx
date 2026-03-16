export default function SocialLoginButtons() {
    return (
        <div className="space-y-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center lg:text-left mb-6">
                Sign in faster with social
            </p>
            <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-3 border border-gray-100 rounded-2xl hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-100 rounded-2xl hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                    <svg className="w-5 h-5 fill-gray-900 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-100 rounded-2xl hover:bg-white hover:border-black/5 hover:shadow-xl hover:shadow-black/5 transition-all group">
                    <svg className="w-5 h-5 fill-gray-900 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.96.95-2.06 1.72-3.31 2.29-1.4.63-2.81.93-4.22.93-1.4 0-2.82-.3-4.22-.93-1.25-.57-2.35-1.34-3.3-2.29C1.04 19.33.27 18.23.27 16.82v-2.31c0-1.4.27-2.5.83-3.31.56-.81 1.33-1.39 2.29-1.74 1.25-.45 2.66-.68 4.22-.68 1.56 0 2.97.23 4.22.68.96.35 1.73.93 2.29 1.74.56.81.83 1.91.83 3.31v2.31c0 1.41-.27 2.51-.83 3.46zM12 2.5C12 1.119 10.881 0 9.5 0S7 1.119 7 2.5 8.119 5 9.5 5 12 3.881 12 2.5z" />
                        <path d="M12.067 11.23a4.5 4.5 0 1 0-5.134 0c-2.38.486-4.08 2.28-4.08 4.437v3.31c0 .825.66 1.486 1.488 1.486h11.318A1.487 1.487 0 0 0 17.15 18.98v-3.31c0-2.158-1.7-3.951-4.083-4.44z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
