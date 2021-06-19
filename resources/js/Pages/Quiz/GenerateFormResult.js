import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import BlackButton from '@/Components/Button/BlackButton';
import CustomButton from '@/Components/Button/CustomButton';
import StatusBox from '@/Components/StatusBox';
import { InertiaLink } from '@inertiajs/inertia-react';
import { decode } from 'html-entities';


export default function GenerateForm(props){
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='7xl' lgWidth='3xl' smPadding='6' lgPadding ='8'>

                <div className="pb-2 flex justify-center">
                    <span className="text-4xl font-bold">Generate Successful</span>
                </div>

                <div className="pb-4 flex justify-center">
                    <span className="text-lg font-bold">Quiz Paper #{ props.paperInfo['paperId'] }</span>
                </div>

                <div className="flex justify-center">
                    <hr className="sm:w-4/5 lg:w-2/4"/>
                </div>

                <div className="my-4 flex justify-center">
                    <div className="flex flex-col sm:w-full lg:w-9/12">
                        <div className="mt-4 flex lg:h-40">
                            <div className="flex flex-col justify-center border border-gray-400 sm:w-full lg:w-1/2">
                                <div className="text-4xl font-bold text-center">{ props.paperInfo['totalQuestion'] }</div>
                                <div className="text-lg text-center">Question(s)</div>
                            </div>
                            <div className="flex flex-col justify-center border border-gray-400 sm:w-full lg:w-1/2">
                                <div className="text-4xl font-bold text-center">{ props.paperInfo['totalNumber'] }</div>
                                <div className="text-lg text-center">Number(s) per question</div>
                            </div>
                        </div>
                        <div className="mb-4 flex lg:h-40">
                            <div className="flex flex-col justify-center border border-gray-400 sm:w-full lg:w-1/2">
                                <div className="text-4xl font-bold text-center">
                                    { props.paperInfo['isMixDigit'] ? '1' : Math.pow(10, props.paperInfo['digitPerNumber']-1) }
                                    -
                                    { Math.pow(10, props.paperInfo['digitPerNumber'])-1 }
                                </div>
                                <div className="text-lg text-center">Number Value</div>
                            </div>
                            <div className="flex flex-col justify-center border border-gray-400 sm:w-full lg:w-1/2">
                                <div className="text-4xl font-bold text-center">
                                    {props.paperInfo['isPositiveOnly']
                                    ? decode('&#8805;0')
                                    : 'Any'}
                                </div>
                                <div className="text-lg text-center">
                                    Answer Value
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-4 flex justify-center">
                    <div className="my-4 p-2 bg-white dark:bg-gray-800 overflow-hidden border border-gray-400 rounded-md sm:w-full lg:w-9/12">
                        <div className="pb-2 flex justify-center">
                            <span className="text-2xl font-bold">Available Operator</span>
                        </div>
                        <div className="pb-2 flex justify-around">
                            <StatusBox isEnabled={props.paperInfo['operator'].includes("+") ? true : false}>
                                {decode('&#43;')}
                            </StatusBox>
                            <StatusBox isEnabled={props.paperInfo['operator'].includes("-") ? true : false}>
                                {decode('&#8722;')}
                            </StatusBox>
                            <StatusBox isEnabled={props.paperInfo['operator'].includes("*") ? true : false}>
                                {decode('&#215;')}
                            </StatusBox>
                            <StatusBox isEnabled={props.paperInfo['operator'].includes("/") ? true : false}>
                                {decode('&#247;')}
                            </StatusBox>
                        </div>
                    </div>
                </div>



                <div className="pb-4 flex justify-center">
                    <hr className="sm:w-4/5 lg:w-2/4"/>
                </div>



                {/* <div className="my-4 p-2 bg-white dark:bg-gray-800 overflow-hidden border border-gray-400 rounded-md">
                    <div className="my-4 flex justify-center">
                        <span className="text-2xl font-bold	">Quiz Paper Information</span>
                    </div>
                    <table className="w-full table-auto text-center">
                        <tr>
                            <td className="text-1xl font-bold border border-gray-400">Quiz Paper Id</td>
                            <td className="text-1xl border border-gray-400">{ props.paperInfo['paperId'] }</td>
                        </tr>
                        <tr>
                            <td className="text-1xl font-bold border border-gray-400">Total Question</td>
                            <td className="text-1xl border border-gray-400">{ props.paperInfo['totalQuestion'] }</td>
                        </tr>
                        <tr>
                            <td className="text-1xl font-bold border border-gray-400">Total number in each question</td>
                            <td className="text-1xl border border-gray-400">{ props.paperInfo['totalNumber'] }</td>
                        </tr>
                        <tr>
                            <td className="text-1xl font-bold border border-gray-400">Maximum digit in each number</td>
                            <td className="text-1xl border border-gray-400">{ props.paperInfo['digitPerNumber'] }</td>
                        </tr>
                        <tr>
                            <td className="text-1xl font-bold border border-gray-400">Mix digit number</td>
                            <td className="text-1xl border border-gray-400">{ props.paperInfo['isMixDigit'] == true ? 'Yes' : 'No' }</td>
                        </tr>
                        <tr>
                            <td className="text-1xl font-bold border border-gray-400">Positive number only</td>
                            <td className="text-1xl border border-gray-400">{ props.paperInfo['isPositiveOnly'] == true ? 'Yes' : 'No' }</td>
                        </tr>
                        <tr>
                            <td className="text-1xl font-bold border border-gray-400">Available operator</td>
                            <td className="text-1xl border border-gray-400">
                                <ul>
                                { props.paperInfo['operator'].map((element, index) => (
                                    <li key={index}>{element}</li>
                                )) }
                                </ul>
                            </td>
                        </tr>
                    </table>
                </div> */}

                <div className="pb-2 flex justify-center">
                    <a href={route('paper.generate', {
                        paperId: props.paperInfo['paperId']
                    })}>
                        <CustomButton type="button" px="5" py="4" color="bg-blue-500" border="border-blue-200">
                            Generate PDF File
                        </CustomButton>
                    </a>
                </div>

                <div className="pb-2 flex justify-center">
                    <InertiaLink href={route('quiz.form')} className="text-sm text-gray-700">
                        <BlackButton type="button" px="2" py="1">
                            Create another
                        </BlackButton>
                    </InertiaLink>
                </div>


            </BodyCard>



        </div>
    );
}
