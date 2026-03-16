import { CalendarX, Search } from "lucide-react";

export default function EmptyState({ onReset }) {
    return (
        <div className="col-span-full py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarX className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">
                No events match your current search or filters. Try adjusting them.
            </p>
            <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
                <Search className="w-4 h-4" />
                Reset All Filters
            </button>
        </div>
    );
}
