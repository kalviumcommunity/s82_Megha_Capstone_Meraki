import { Calendar, Download, ExternalLink } from "lucide-react";

export default function CalendarSync({ eventTitle, description, location, startDate, endDate }) {
    const formatGoogleDate = (d) => {
        const dateObj = new Date(d || Date.now());
        return dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle || "Meraki Event")}&details=${encodeURIComponent(description || "")}&location=${encodeURIComponent(location || "")}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate || new Date(Date.now() + 2 * 3600 * 1000))}`;

    const downloadIcs = () => {
        const csContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Meraki Volunteer Platform//NONSGML Event//EN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${formatGoogleDate(startDate)}
DTEND:${formatGoogleDate(endDate || new Date(Date.now() + 2 * 3600 * 1000))}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([csContent], { type: 'text/calendar;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `${(eventTitle || "event").toLowerCase().replace(/\s+/g, '_')}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex items-center gap-2">
            <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors"
            >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Add to Google Calendar
                <ExternalLink className="w-3 h-3 text-blue-400" />
            </a>
            <button
                onClick={downloadIcs}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-bold transition-colors"
                title="Download iCal .ics file"
            >
                <Download className="w-3.5 h-3.5 text-gray-500" />
                iCal File
            </button>
        </div>
    );
}
