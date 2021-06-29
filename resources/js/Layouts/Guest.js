import Logo from '../Components/Logo';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-old-math">
            <div>
                <InertiaLink href="/">
                    <Logo className="w-48 fill-current text-gray-500" />
                </InertiaLink>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
