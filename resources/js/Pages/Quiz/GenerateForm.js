import React from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import BlackButton from '@/Components/Button/BlackButton';
import Checkbox from '@/Components/Checkbox';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';

export default function GenerateForm(props){
    const{ data, setData, post, processing, errors } = useForm({
        totalQuestion: '',
        totalNumber: '',
        digitPerNumber: '',
        isMixDigit: '',
        isPositiveOnly: '',
        operator: [],
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleChangeCheckboxGroup = (event) => {
        if(event.target.checked){
            if(!data[event.target.name].includes(event.target.value)){
                data[event.target.name].push(event.target.value);
            }
        }
        else{
            if(data[event.target.name].includes(event.target.value)){
                data[event.target.name] = data[event.target.name].filter(function(value, index, arr){
                    return value != event.target.value;
                });
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('quiz.generate'));
    }

    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='7xl' lgWidth='4xl' smPadding='6' lgPadding ='8'>

                <div className="pb-8 flex justify-center">
                    <span className="text-4xl font-bold">Generate Quiz</span>
                </div>

                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <div>
                        <Label forInput="totalQuestion" value="Total Question" />

                        <Input
                            type="number"
                            name="totalQuestion"
                            min="1"
                            max="100"
                            value={data.totalQuestion}
                            className="mt-1 block w-full"
                            placeholder="Min: 1 | Max:100"
                            required="required"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="mt-4">
                            <Label forInput="totalNumber" value="Number in each question" />

                            <Input
                                type="number"
                                name="totalNumber"
                                min="2"
                                max="4"
                                value={data.totalNumber}
                                className="mt-1 block w-full"
                                placeholder="Min: 2 | Max:4"
                                required="required"
                                handleChange={onHandleChange}
                            />
                    </div>

                    <div className="mt-4">
                            <Label forInput="digitPerNumber" value="Digit per number" />

                            <Input
                                type="number"
                                name="digitPerNumber"
                                min="1"
                                max="2"
                                value={data.digitPerNumber}
                                className="mt-1 block w-full"
                                placeholder="Min: 1 | Max:2"
                                required="required"
                                handleChange={onHandleChange}
                            />
                    </div>

                    <div className="mt-2">
                        <hr/>
                    </div>

                    <div className="mt-2">
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Mix numbers of digit</span>

                            <Checkbox id="isMixDigit" name="isMixDigit" value="1" handleChange={onHandleChange} />
                        </label>
                    </div>

                    <div className="mt-2">
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Positive number answer only</span>

                            <Checkbox id="isPositiveOnly" name="isPositiveOnly" value="1" handleChange={onHandleChange} />
                        </label>
                    </div>

                    <div className="mt-2">
                        <hr/>
                    </div>

                    <div className="mt-2">
                        <span className="ml-2 text-sm font-bold text-gray-600">Operator</span>
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Addition</span>

                            <Checkbox id="plus" name="operator" value="+" handleChange={onHandleChangeCheckboxGroup} />
                        </label>
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Subtraction</span>

                            <Checkbox id="minus" name="operator" value="-" handleChange={onHandleChangeCheckboxGroup} />
                        </label>
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Multiplication</span>

                            <Checkbox id="multiply" name="operator" value="*" handleChange={onHandleChangeCheckboxGroup} />
                        </label>
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Division</span>

                            <Checkbox id="divide" name="operator" value="/" handleChange={onHandleChangeCheckboxGroup} />
                        </label>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <BlackButton px='6' py='3' processing={processing}>Generate</BlackButton>
                    </div>

                </form>

            </BodyCard>

        </div>
    );
}
