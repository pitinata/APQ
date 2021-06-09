import React from 'react';
import BlackButton from '@/Components/Button/BlackButton';
import WhiteButton from '@/Components/Button/WhiteButton';
import Dropdown from '@/Components/Dropdown';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Menu({props}){
    return(
        <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                {props.auth.user ? (
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                Menu

                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('quiz.form')} method="get" as="button">
                            Quiz Generator
                        </Dropdown.Link>
                        <Dropdown.Link href={route('paper.list')} method="get" as="button">
                            Quiz Paper List
                        </Dropdown.Link>
                        <Dropdown.Link href={route('user.password.form')} method="get" as="button">
                            Change Password
                        </Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
                ) : (
                    <>
                        <InertiaLink href={route('login')} className="text-sm text-gray-700">
                            <WhiteButton px="3" py="2" type={"button"}>
                                Login
                            </WhiteButton>
                        </InertiaLink>

                        <InertiaLink href={route('register')} className="ml-4 text-sm text-gray-700">
                            <BlackButton px="3" py="2" type={"button"} >
                                Register
                            </BlackButton>
                        </InertiaLink>


                    </>
                )}


        </div>
    );
}
