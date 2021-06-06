import { InertiaLink } from '@inertiajs/inertia-react';

export default function BodyCard({ smWidth = '7xl', lgWidth = '3xl', smPadding = '6', lgPadding = '8', children}){
    return (
        <div
        className={`sm:max-w-${smWidth} sm:px-${smPadding} lg:max-w-${lgWidth} lg:px-${lgPadding} mx-auto`}
        >
            <div className="my-20 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                <div className="p-12">
                    <div className="mx-12">
                        <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                            {children}
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}
