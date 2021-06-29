import React from 'react';

export default function MainBody({children}){
    return(
        <div className="relative flex items-top justify-center min-h-screen bg-old-math dark:bg-gray-900 sm:items-center sm:pt-0">
            {children}
        </div>
    );
}
