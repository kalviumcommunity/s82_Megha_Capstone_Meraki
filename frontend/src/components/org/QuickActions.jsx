import { Plus, MessageSquare, Calendar, Download } from "lucide-react";

export default function QuickActions() {
    return (
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/10">
            <h3 className="font-extrabold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all text-left flex items-center gap-3 group">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">Post Opportunity</span>
                </button>
                <button className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all text-left flex items-center gap-3 group">
                    <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors">
                        <Calendar className="w-5 h-5 text-secondary group-hover:text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">Schedule Event</span>
                </button>
                <button className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all text-left flex items-center gap-3 group">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                        <MessageSquare className="w-5 h-5 text-accent group-hover:text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">Message Volunteers</span>
                </button>
                <button className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all text-left flex items-center gap-3 group">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-800 group-hover:text-white transition-colors">
                        <Download className="w-5 h-5 text-gray-500 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">Export Reports</span>
                </button>
            </div>
        </div>
    );
}
