import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import QuestionStructure from '@/Components/Parts/QuestionStructure';
import NumberValue from '@/Components/Parts/NumberValue';
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
                    <span className="text-3xl md:text-4xl font-bold text-center">Generate Successful</span>
                </div>

                <div className="pb-4 flex justify-center">
                    <span className="text-lg font-bold">Quiz Paper #{ props.paperInfo['paperId'] }</span>
                </div>

                <div className="flex justify-center">
                    <hr className="w-4/5 lg:w-2/4"/>
                </div>

                <div className="my-4 flex justify-center">
                    <div className="flex flex-col w-full md:w-9/12">
                        <div className="mt-4 flex h-48">
                            <div className="flex flex-col justify-center border border-gray-400 w-full">
                                <div className="flex flex-col justify-center h-1/4">
                                    <div className="text-2xl font-bold text-center">Question Structure</div>
                                </div>
                                <div className="flex flex-col justify-center h-2/4">
                                    <div>
                                        <div className="text-2xl font-bold text-center">
                                            { <QuestionStructure totalNumber={props.paperInfo['totalNumber']} isPositiveOnly={props.paperInfo['isPositiveOnly']}></QuestionStructure> }
                                        </div>
                                        <div className="text-center">
                                            ( { props.paperInfo['totalQuestion'] } Question(s) )
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center h-1/4">
                                    <div className="text-center text-gray-300">N1, N2, N... : Number</div>
                                    <div className="text-center text-gray-300">* : Operator</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex h-20">
                            <div className="flex flex-col justify-center border border-gray-400 w-full">
                                <div className="text-2xl font-bold text-center">Available Number Value</div>
                                <div className="text-2xl font-bold text-center">
                                    <NumberValue digitPerNumber={props.paperInfo['digitPerNumber']} isMixDigit={props.paperInfo['isMixDigit']}></NumberValue>
                                </div>
                            </div>
                        </div>

                        <div className="my-4 p-2 bg-white dark:bg-gray-800 overflow-hidden border border-gray-400">
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
                </div>

                <div className="pb-4 flex justify-center">
                    <hr className="w-4/5 lg:w-2/4"/>
                </div>

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
