import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import BlackButton from '@/Components/Button/BlackButton';
import Menu from '@/Components/Parts/Menu';
import Logo from '@/Components/Logo';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='7xl' lgWidth='4xl' smPadding='6' lgPadding ='8'>

                <div className="pb-8 flex justify-center">
                    <Logo className="sm:w-3/4 md:w-2/3 lg:w-1/2"></Logo>
                </div>

                <div className="mb-2">
                    One of the causes of memory loss is Alzheimer's disease. As you get older, your chances of acquiring it increase.
                    There are numerous ways to delay the progression of Alzheimer's disease.
                </div>

                <div className="mb-2">
                    One of these approaches is to challenge yourself every day by attempting to solve a simple mathematic problem quickly.
                    This web application can generate sheets of simple mathematic question and answer with your choice of generator criteria.
                </div>

                <div className="flex justify-center mt-10">
                    <InertiaLink href={route('quiz.form')} className="text-sm text-gray-700">
                        <BlackButton px='6' py='4'>
                            Let's get started!
                        </BlackButton>
                    </InertiaLink>
                </div>

            </BodyCard>
        </div>

    );
}
