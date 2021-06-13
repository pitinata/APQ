import React from 'react';
import { decode } from 'html-entities';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Pagination(paginate) {
    let previousBtn;
    let nextBtn;
    let btnGroup = [];

    console.log(paginate);

    paginate.paginate.links.forEach((item, index) => {
        if(item.url !== null){
            btnGroup.push(<li key={index} className=
            {`relative block py-2 px-3 leading-tight border border-gray-300
            ${index == 0 ? 'ml-0 rounded-l' : ''}
            ${index == paginate.paginate.links.length-1 ? 'rounded-r' : 'border-r-0'}
            ${item.active ? 'bg-blue-300' : 'hover:bg-gray-200 bg-white'}`}>
            <InertiaLink href={item.url}>{decode(item.label)}</InertiaLink>
            </li>);
        }
        else{
            btnGroup.push(<li key={index} className=
                {`relative block py-2 px-3 leading-tight border border-gray-300 opacity-50
                ${index == 0 ? 'ml-0 rounded-l' : ''}
                ${index == paginate.paginate.links.length-1 ? 'rounded-r' : 'border-r-0'}`}>
                {decode(item.label)}
            </li>);
        }
    });


    return (
        <ul className="flex pl-0 list-none rounded my-2">
            {btnGroup}
        </ul>
    );
}
