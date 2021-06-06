import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Pagination(paginate) {
    let previousBtn;
    let nextBtn;
    let firstPageBtn;
    let LastPageBtn;
    let btnGroup = [];

    if(paginate.paginate.prev_page_url){
        previousBtn = <InertiaLink href={paginate.paginate.prev_page_url}>{"<"}</InertiaLink>;
    }
    else{
        previousBtn = "<";
    }

    if(paginate.paginate.next_page_url){
        nextBtn = <InertiaLink href={paginate.paginate.next_page_url}>{">"}</InertiaLink>;
    }
    else{
        nextBtn = ">";
    }

    if(paginate.paginate.prev_page_url){
        firstPageBtn = <InertiaLink href={paginate.paginate.first_page_url}>{"<<"}</InertiaLink>;
    }
    else{
        firstPageBtn = "<<";
    }

    if(paginate.paginate.next_page_url){
        LastPageBtn = <InertiaLink href={paginate.paginate.last_page_url}>{">>"}</InertiaLink>;
    }
    else{
        LastPageBtn = ">>";
    }

    if(paginate.paginate.last_page > 5){
        let pageNumber;
        if(paginate.paginate.current_page < 3){
            pageNumber=1;
        }
        else if(paginate.paginate.current_page+2 >= paginate.paginate.last_page){
            pageNumber=paginate.paginate.last_page-4;
        }
        else{
            pageNumber=paginate.paginate.current_page-2;
        }

        let i;
        for(i=pageNumber;i<pageNumber+5;i++){
            btnGroup.push(<li className=
            {`relative block py-2 px-3 leading-tight border border-gray-300 border-r-0
            ${paginate.paginate.current_page == i ? 'bg-blue-300' : 'hover:bg-gray-200 bg-white'}`}>
            <InertiaLink href={paginate.paginate.path+"?page="+i}>{i}</InertiaLink>
            </li>);
        }
    }
    else{
        let i;
        for(i=1;i<=paginate.paginate.last_page;i++){
            btnGroup.push(<li className=
            {`relative block py-2 px-3 leading-tight border border-gray-300 border-r-0
            ${paginate.paginate.current_page == i ? 'bg-blue-300' : 'hover:bg-gray-200 bg-white'}`}>
            <InertiaLink href={paginate.paginate.path+"?page="+i}>{i}</InertiaLink>
            </li>);
        }
    }

    return (
        <ul className="flex pl-0 list-none rounded my-2">
            <li className={
                `relative block py-2 px-3 mr-4 leading-tight bg-white border border-gray-300 text-blue-700 ml-0 rounded-l
                ${paginate.paginate.prev_page_url  ? 'hover:bg-gray-200' : 'opacity-50'}`
            }>
                {firstPageBtn}
            </li>
            <li className={
                `relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l
                ${paginate.paginate.prev_page_url ? 'hover:bg-gray-200' : 'opacity-50'}`
            }>
                {previousBtn}
            </li>

            {btnGroup}

            <li className={
                `relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r
                ${paginate.paginate.next_page_url ? 'hover:bg-gray-200' : 'opacity-50'}`
            }>
                {nextBtn}
            </li>
            <li className={
                `relative block py-2 px-3 ml-4 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r
                ${paginate.paginate.next_page_url ? 'hover:bg-gray-200' : 'opacity-50'}`
            }>
                {LastPageBtn}
            </li>
        </ul>
    );
}
