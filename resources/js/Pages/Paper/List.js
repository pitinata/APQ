import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import BlackButton from '@/Components/Button/BlackButton';
import MiniPagination from '@/Components/MiniPagination';
import Moment from 'moment';

export default function List(props){
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='max' lgWidth='max' smPadding='6' lgPadding ='8'>

                <div className="pb-2 flex justify-center">
                    <span className="text-4xl font-bold">Quiz Paper List</span>
                </div>

                <div className="m-5 block md:hidden">
                {
                    props.paperLists.data.map((paper,key) => (
                    <div className="flex flex-col flex-wrap w-full rounded-lg border border-gray-200 mt-5 p-5" key={key}>
                        <div className="my-3 flex justify-center">
                            <a href={route('paper.generate', {
                                paperId: paper.paper_id
                            })}>
                                <BlackButton px="4" py="2" textSize='text-sm' type='button'>
                                Download #{paper.paper_id}
                                </BlackButton>
                            </a>
                        </div>
                        <div className="my-1 flex justify-center">{(paper.quiz).length} Question(s)</div>
                        <div className="my-1 flex justify-center">{Moment(paper.created_at).format('DD/MM/YYYY HH:mm:ss')}</div>
                    </div>
                    ))
                }
                </div>

                <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800 hidden md:table">
                    <thead>
                        <tr className="text-left border-b-2 border-gray-300">
                            <th className="px-4 py-3">Paper ID</th>
                            <th className="px-4 py-3">Total Quiz</th>
                            <th className="px-4 py-3">Generated At</th>
                            <th className="px-4 py-3">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        props.paperLists.data.map((paper,key) => (
                            <tr className="bg-gray-100 border-b border-gray-200" key={key}>
                                <td className="px-4 py-3">{paper.paper_id}</td>
                                <td className="px-4 py-3">{(paper.quiz).length}</td>
                                <td className="px-4 py-3">{Moment(paper.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                                <td className="px-4 py-3">
                                    <a href={route('paper.generate', {
                                        paperId: paper.paper_id
                                    })}>
                                        <BlackButton px="2" py="1" type='button'>
                                            Download
                                        </BlackButton>
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>

                </table>

                <div className="flex justify-center">
                    <MiniPagination paginate={props.paperLists}></MiniPagination>
                </div>

            </BodyCard>



        </div>
    );
}
