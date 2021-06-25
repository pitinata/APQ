import React from 'react';
import Input from '@/Components/Input';
import WhiteButton from '@/Components/Button/WhiteButton';
import { useForm } from '@inertiajs/inertia-react';

export default function MiniPagination(paginate) {

    const { data, setData, get, processing, errors } = useForm({
        page: paginate.paginate.current_page,
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        get(paginate.paginate.path);
    }



    return (
        <form onSubmit={submit}>
            <div className="flex flex-col">
                <div className="text-center">Go to page</div>
                <div className="flex mt-2">
                    <input
                    className="border-gray-300 border-r-0 rounded-r-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md text-center"
                    type="number"
                    name="page"
                    min="1"
                    max={paginate.paginate.last_page}
                    onChange={onHandleChange}
                    value={data.page}></input>
                    <button className="relative block py-2 px-3 leading-tight border border-gray-300 rounded-r">Go</button>
                </div>
            </div>
        </form>

    );
}
