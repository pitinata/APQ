import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import BlackButton from '@/Components/Button/BlackButton';
import Pagination from '@/Components/Pagination'
import Moment from 'moment';

export default function List(props){
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='max' lgWidth='max' smPadding='6' lgPadding ='8'>

                <div className="pb-2 flex justify-center">
                    <span className="text-4xl font-bold">Quiz Paper List</span>
                </div>

                <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                    <tr className="text-left border-b-2 border-gray-300">
                        <th className="px-4 py-3">Paper ID</th>
                        <th className="px-4 py-3">Total Quiz</th>
                        <th className="px-4 py-3">Generated At</th>
                        <th className="px-4 py-3">Download</th>
                    </tr>

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

                </table>

                <div className="flex justify-center">
                    <Pagination paginate={props.paperLists}></Pagination>
                </div>

            </BodyCard>



        </div>
    );
}
