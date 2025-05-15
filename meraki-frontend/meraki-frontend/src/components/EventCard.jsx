import React from 'react';

const EventCard = ({ event }) => {
    const {
        name,
        description,
        date,
        location,
        ngo,
        status,
        volunteers,
    } = event;

    // Format date to a readable string
    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <div className="rounded-2xl shadow-lg bg-soft-white border border-muted-gray p-4 hover:shadow-2xl transition duration-300">
            <h3 className="text-lg font-bold text-cobalt-blue mb-2">{name}</h3>
            <p className="text-sm text-muted-gray mb-4">{description}</p>
            <div className="flex items-center justify-between text-sm mb-4">
                <span className="font-medium text-teal">Date: {formattedDate}</span>
                <span className="font-medium text-warm-coral">Location: {location}</span>
            </div>
            <div className="mb-4">
                <p className="text-sm text-plum">
                    <strong>Organized by:</strong> {ngo.name}
                </p>
                <p className="text-sm text-golden-sunrise">
                    <strong>Status:</strong> {status}
                </p>
            </div>
            <div className="mb-4">
                <p className="text-sm text-lush-green">
                    <strong>Volunteers:</strong> {volunteers.length}
                </p>
            </div>
            <button className="bg-cobalt-blue text-soft-white px-4 py-2 rounded-xl hover:bg-plum transition duration-300">
                View Details
            </button>
        </div>
    );
};

export default EventCard;
