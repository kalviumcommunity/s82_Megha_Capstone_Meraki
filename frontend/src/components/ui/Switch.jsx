import React from 'react';
import { cn } from '../../lib/utils';

const Switch = ({ checked, onChange, disabled, label, description }) => {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex-1 pr-4">
                {label && <p className="text-sm font-medium text-gray-900">{label}</p>}
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange && onChange(!checked)}
                className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    checked ? "bg-primary shadow-lg shadow-primary/20" : "bg-gray-200"
                )}
            >
                <span
                    className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out",
                        checked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </button>
        </div>
    );
};

export default Switch;
