import { ShieldCheck, PieChart, FileText } from "lucide-react";

export default function TransparencySection() {
    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-4">
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">100% Transparency Guarantee</h2>
                <p className="text-gray-600">
                    We believe in complete accountability. Every dollar you donate is tracked, and you can see exactly how it's used to create impact.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visual Breakdown */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <PieChart className="w-32 h-32 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Where Your Money Goes</h3>

                    <div className="space-y-5 relative z-10">
                        {/* Direct Programs */}
                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-gray-800">Direct Programs & Services</span>
                                <span className="text-primary font-bold">85%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        {/* Operations */}
                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-gray-800">Operations & Logistics</span>
                                <span className="text-secondary font-bold">10%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>

                        {/* Fundraising */}
                        <div>
                            <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-gray-800">Fundraising & Growth</span>
                                <span className="text-accent font-bold">5%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-accent rounded-full" style={{ width: '5%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accountability Links */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Reports</h3>

                    <a href="#" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">2023 Annual Report</h4>
                                <p className="text-xs text-gray-500">PDF Document • 2.4 MB</p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-primary">Download</span>
                    </a>

                    <a href="#" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-secondary transition-colors">Third-Party Audit</h4>
                                <p className="text-xs text-gray-500">Independent finding by KPMG</p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-secondary">View</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
