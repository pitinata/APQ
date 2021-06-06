import React from 'react';

export default function Button({ type = 'submit', px = '4', py = '2', color='bg-gray-900', border='',uppercase = false ,className = '', processing, children }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-${px} py-${py} ${color} ${border ? 'border '.concat(border) : 'border border-transparent'} rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
