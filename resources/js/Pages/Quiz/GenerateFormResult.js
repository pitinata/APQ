import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import BlackButton from '@/Components/Button/BlackButton';
import CustomButton from '@/Components/Button/CustomButton';
import { InertiaLink } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';


export default function GenerateForm(props){
    // const{ data, setData, post, processing, errors } = useForm({
    //     paperId: props.paperInfo['paperId'],
    // });

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route('paper.generate'), data);
    // }
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='7xl' lgWidth='3xl' smPadding='6' lgPadding ='8'>

                <div className="pb-2 flex justify-center">
                    <span className="text-4xl font-bold	">Generate Successful</span>
                </div>

                <div className="my-4 p-2 bg-white dark:bg-gray-800 overflow-hidden border border-gray-400 rounded-md">
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
