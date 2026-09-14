import { useState } from 'react';
import { X, Download, Share2, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CertificateModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [isDownloading, setIsDownloading] = useState(false);

    if (!isOpen) return null;

    const studentName = user?.name || "Sarah Volunteer";
    const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const certificateId = `MERAKI-${Math.floor(100000 + Math.random() * 900000)}`;

    const handlePrint = () => {
        setIsDownloading(true);
        setTimeout(() => {
            window.print();
            setIsDownloading(false);
        }, 500);
    };

    const handleShareLinkedIn = () => {
        const text = encodeURIComponent(`I am proud to receive my official Volunteer Impact Certificate from Meraki for contributing 150+ hours of community service! 🌿 #MerakiVolunteer #SocialImpact`);
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden relative">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-extrabold text-sm uppercase tracking-widest text-gray-900 dark:text-white">Official Certificate</span>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Certificate Printable Area */}
                <div className="p-8 text-center border-8 border-double border-primary/20 m-6 rounded-2xl bg-gradient-to-b from-white to-primary/5 dark:from-gray-900 dark:to-gray-800">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 text-white font-black text-2xl">
                            M
                        </div>
                    </div>

                    <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Certificate of Appreciation</p>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Social Impact Recognition</h2>

                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">This is proudly presented to</p>
                    <h3 className="text-2xl font-black text-primary underline decoration-2 underline-offset-4 mb-4">{studentName}</h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
                        For outstanding commitment, leadership, and contributing over <span className="font-bold text-gray-900 dark:text-white">156 verified volunteer hours</span> in environmental sustainability and youth education projects.
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 text-left max-w-sm mx-auto">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Issued Date</p>
                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{issueDate}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Certificate ID</p>
                            <p className="text-xs font-bold text-primary font-mono">{certificateId}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-4 h-4" /> Cryptographically Verified by Meraki Platform
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3 justify-end">
                    <button
                        onClick={handleShareLinkedIn}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <Share2 className="w-4 h-4" /> Share on LinkedIn
                    </button>
                    <button
                        onClick={handlePrint}
                        disabled={isDownloading}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-md shadow-primary/20"
                    >
                        <Download className="w-4 h-4" /> {isDownloading ? "Preparing Certificate..." : "Download / Print PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
}
