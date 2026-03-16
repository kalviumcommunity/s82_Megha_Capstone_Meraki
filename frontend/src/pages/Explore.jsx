import { Search, MapPin, Filter, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Explore() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Explore Opportunities</h1>
                    <p className="text-slate-500 mt-1">Find the perfect project that matches your skills and passion.</p>
                </div>
            </div>

            <Card className="p-4 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input placeholder="Search by keyword, cause, or organization..." className="pl-10 h-12 text-base" />
                </div>
                <div className="w-full md:w-64 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input placeholder="Location or Remote" className="pl-10 h-12 text-base" />
                </div>
                <Button size="lg" className="h-12 w-full md:w-auto px-8">Search</Button>
                <Button variant="outline" size="icon" className="h-12 w-12 flex-shrink-0">
                    <Filter className="h-5 w-5" />
                </Button>
            </Card>

            <div className="flex flex-wrap gap-2 mb-6">
                {['All Causes', 'Education', 'Environment', 'Healthcare', 'Disaster Relief', 'Animals'].map((cause, i) => (
                    <Badge key={cause} variant={i === 0 ? 'default' : 'outline'} className="px-4 py-2 cursor-pointer text-sm font-medium">
                        {cause}
                    </Badge>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow group flex flex-col h-full border-slate-200">
                        <div className="h-48 bg-slate-100 rounded-t-xl flex items-center justify-center relative group-hover:bg-highlight/40 transition-colors">
                            <Heart className="h-12 w-12 text-slate-300 group-hover:text-primary transition-colors" />
                            <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full hover:text-accent transition-colors">
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                            <div className="flex gap-2 mb-3">
                                <Badge variant="accent">Education</Badge>
                                <Badge variant="outline">Remote</Badge>
                            </div>
                            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">Digital Literacy Teacher</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">Help underprivileged students learn essential computer skills to bridge the digital divide.</p>

                            <div className="mt-auto pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center text-sm font-medium text-slate-600 mb-4">
                                    <span>Tech for Good Foundation</span>
                                    <span>15 hrs/wk</span>
                                </div>
                                <Button className="w-full" variant="outline">Learn More & Apply</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
