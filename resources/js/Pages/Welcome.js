import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import BlackButton from '@/Components/Button/BlackButton';
import Menu from '@/Components/Parts/Menu';
import Logo from '@/Components/Logo';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <div>
            <div className="relative flex items-top justify-center min-h-screen bg-welcome-page bg-no-repeat bg-origin-border">
                <Menu position='absolute' props={props}></Menu>
                <div className="flex flex-col items-center self-center bg-white bg-opacity-50 rounded-lg p-8">
                    <Logo className="sm:w-3/4 md:w-2/3 lg:w-1/2"></Logo>
                    <div className="text-center text-3xl mt-5">Generate Quiz Made Easy</div>
                    <div className="text-center mt-5 flex justify-around">
                        <InertiaLink href={route('quiz.form')} className="text-sm text-gray-700">
                            <BlackButton px='6' py='4'>
                                Let's get started!
                            </BlackButton>
                        </InertiaLink>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col flex-wrap items-top justify-evenly content-center min-h-0 bg-white py-20">
                <div className="relative flex flex-col self-center w-full p-10 md:w-2/3 md:p-1 md:pb-10">
                    <div className="text-3xl text-center mb-5">Why Us?</div>
                    <div className="mb-2">
                        One of the causes of memory loss is Alzheimer's disease. As you get older, your chances of acquiring it increase.
                        There are numerous ways to delay the progression of Alzheimer's disease.
                    </div>

                    <div className="mb-2">
                        One of these approaches is to challenge yourself every day by attempting to solve a simple mathematic problem quickly.
                        This web application can generate sheets of simple mathematic question and answer with your choice of generator criteria.
                    </div>
                </div>
                <hr/>
                <div className="flex flex-col mb-16 md:mb-0 md:pt-10 xl:w-3/4">
                    <div className="text-3xl text-center mb-12 mt-12 md:mt-0">Features</div>
                    <div className="relative flex flex-wrap justify-around mb-10">
                        <div className="relative flex w-full px-10 mb-10 md:mb-0 md:w-1/2">
                            <div className="self-center mr-5 p-2 border border-gray-400 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div className="relative flex flex-col">
                                <div className="text-2xl">Easy to use</div>
                                <div>Form that require user to fill is design to be organized so it is easy to use. </div>
                            </div>
                        </div>
                        <div className="relative flex w-full md:w-1/2 px-10">
                            <div className="self-center mr-5 p-2 border border-gray-400 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="relative flex flex-col">
                                <div className="text-2xl">Light Weight</div>
                                <div>It contains only most important feature. So it does not take long for user to find something that users want.</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-wrap justify-around">
                        <div className="relative flex w-full mb-10 md:mb-0 md:w-1/2 px-10">
                            <div className="self-center mr-5 p-2 border border-gray-400 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <div className="relative flex flex-col">
                                <div className="text-2xl">Open Source</div>
                                <div>Source code is available <a href="https://github.com/pitinata/APQ" className="text-blue-600 underline">here</a>.</div>
                            </div>
                        </div>
                        <div className="relative flex w-full md:w-1/2 px-10">
                            <div className="self-center mr-5 p-2 border border-gray-400 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div className="relative flex flex-col">
                                <div className="text-2xl">It's Free!</div>
                                <div>No hidden fee. You can use as much as you wish for.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="relative flex flex-col flex-wrap place-content-center items-center h-32 bg-gray-400">
                <div>© 2021–2021 Developed by Pitinat A.</div>
                <div className="pb-2 text-center">
                    Content available under a Creative Commons license.
                </div>
                <div>
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                        <img alt="Creative Commons License" className="border-0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
                    </a>
                </div>

            </div>

            {/* <Menu props={props}></Menu>

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

            </BodyCard> */}
        </div>

    );
}
