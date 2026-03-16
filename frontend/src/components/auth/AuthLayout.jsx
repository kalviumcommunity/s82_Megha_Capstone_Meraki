export default function AuthLayout({ children, hero }) {
    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side: Hero/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 items-center justify-center p-12 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-lg">
                    {hero}
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 bg-gray-50/30">
                <div className="w-full max-w-md">
                    {children}
                </div>

                {/* Security Footer */}
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your data is securely encrypted
                </div>
            </div>
        </div>
    );
}
