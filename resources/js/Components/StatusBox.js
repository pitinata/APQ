import React from 'react';

export default function StatusBox({ isEnabled, children }) {
    return (
        <div className={`inline-flex items-center px-4 py-2 text-4xl tracking-tighter leading-none
            ${
                isEnabled
                ? " bg-yellow-100 border border-yellow-500 font-bold text-yellow-500"
                : " bg-white border border-gray-400 font-bold text-black opacity-10"
            }`
        }
        >
            {children}
        </div>
    );
}
