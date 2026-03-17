import React from 'react';
import { Download, Award, Share2 } from 'lucide-react';
import Button from '../ui/Button';

const ImpactSettings = () => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Volunteer Impact</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Track your contributions and share your journey with the community.
                </p>
            </header>

            <div className="grid gap-8">
                {/* Impact Report Card */}
                <section className="p-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] text-white shadow-2xl shadow-black/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors duration-700" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="space-y-4 text-center md:text-left">
                            <span className="px-5 py-1.5 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md border border-white/10">Year 2026</span>
                            <h3 className="text-3xl font-black tracking-tight">Annual Impact Report</h3>
                            <p className="text-gray-400 text-sm font-medium max-w-sm">
                                Download a detailed breakdown of your volunteering hours, projects, and the lives you've touched this year.
                            </p>
                        </div>
                        <Button className="bg-white text-gray-900 hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl px-10 py-5 h-auto shadow-2xl transition-all active:scale-95 group-hover:shadow-primary/20">
                            <Download className="h-4 w-4 mr-3" /> Download PDF
                        </Button>
                    </div>
                </section>

                {/* Share Impact */}
                <section className="space-y-6">
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                        <Share2 className="h-3 w-3" /> Share Your Story
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button className="group p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 text-left">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 w-fit mb-6 group-hover:scale-110 transition-transform">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Impact Card</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-3 leading-relaxed">Download a visual summary of your badges and achievements.</p>
                        </button>
                        <button className="group p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 text-left">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 w-fit mb-6 group-hover:scale-110 transition-transform">
                                <Share2 className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Public Link</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-3 leading-relaxed">Copy your unique profile link to share on social media.</p>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ImpactSettings;
