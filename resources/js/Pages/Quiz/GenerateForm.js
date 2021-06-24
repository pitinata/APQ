import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import BlackButton from '@/Components/Button/BlackButton';
import Checkbox from '@/Components/Checkbox';
import ValidationErrors from '@/Components/ValidationErrors';
import QuestionStructure from '@/Components/Parts/QuestionStructure';
import NumberValue from '@/Components/Parts/NumberValue';
import StatusBox from '@/Components/StatusBox';
import { useForm } from '@inertiajs/inertia-react';
import { decode } from 'html-entities';


export default function GenerateForm(props){
    const{ data, setData, post, processing, errors } = useForm({
        totalQuestion: '',
        totalNumber: '',
        digitPerNumber: '',
        isMixDigit: false,
        isPositiveOnly: false,
        operator: [],
    });


    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleChangeCheckboxGroup = (event) => {
        manuallySetOperator(event.target.name,event.target.value,event.target.checked);
    };

    const manuallySetOperator = (name, value, checked) => {
        let tempArr = data[name];

        if(checked){
            if(!tempArr.includes(value)){
                tempArr.push(value);
            }
        }
        else{
            if(tempArr.includes(value)){
                tempArr = tempArr.filter(function(tempValue, index, arr){
                    return tempValue != value;
                });
            }
        }
        setData(name, tempArr);
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('quiz.generate'));
    }

    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='7xl' lgWidth='4xl' smPadding='6' lgPadding ='8'>

                <div className="pb-4 flex justify-center">
                    <span className="text-4xl font-bold">Generate Quiz</span>
                </div>

                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>

                    <div className="mt-4">
                        <Label forInput="totalQuestion" value="Total Question" className="text-xl underline" />
                    </div>



                    <div className="mt-2">
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

                    <div className="mt-10 flex justify-center">
                        <hr className="w-4/5 lg:w-3/4"/>
                    </div>

                    <div className="my-4">
                        <Label value="Question Structure" className="text-xl underline" />
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden border border-gray-400 rounded-lg w-3/4">
                            <div className="py-2 flex flex-col flex-wrap place-content-center h-56 sm:h-48">
                                <div className="flex flex-col justify-center h-1/4">
                                    <div className="text-2xl font-bold text-center">Preview</div>
                                </div>
                                <div className="flex flex-col justify-center h-2/4 overflow-y-auto">
                                    <div className="text-2xl font-bold text-center">
                                        <QuestionStructure totalNumber={data.totalNumber} isPositiveOnly={data.isPositiveOnly} max="4"></QuestionStructure>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center h-1/4">
                                    <div className="text-center text-gray-300">N1, N2, N... : Number</div>
                                    <div className="text-center text-gray-300">* : Operator</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
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

                    <div className="mt-2">
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Positive number answer only</span>

                            <Switch
                                checked={data.isPositiveOnly}
                                onChange={(e) => {
                                    setData("isPositiveOnly", e);
                                }}
                                className={`${data.isPositiveOnly ? 'bg-green-600' : 'bg-gray-200'}
                                relative inline-flex items-center flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                aria-hidden="true"
                                className={`${data.isPositiveOnly ? 'translate-x-5' : 'translate-x-1'}
                                    pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                />
                            </Switch>

                        </label>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <hr className="w-4/5 lg:w-3/4"/>
                    </div>


                    <div className="my-4">
                        <Label value="Number Value" className="text-xl underline" />
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden border border-gray-400 rounded-lg w-3/4">
                            <div className="py-4 flex flex-col flex-wrap place-content-center h-40 sm:h-28">
                                <div className="flex flex-col justify-center h-1/4">
                                    <div className="text-2xl font-bold text-center">Preview</div>
                                </div>
                                <div className="flex flex-col justify-center h-3/4 overflow-y-auto">
                                    <div className="text-2xl font-bold text-center">
                                        <NumberValue digitPerNumber={data.digitPerNumber} isMixDigit={data.isMixDigit} max="2"></NumberValue>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <label className="flex justify-between">
                            <span className="ml-2 text-sm text-gray-600">Mix numbers of digit</span>

                            <Switch
                                checked={data.isMixDigit}
                                onChange={(e) => {
                                    setData("isMixDigit", e);
                                }}
                                className={`${data.isMixDigit ? 'bg-green-600' : 'bg-gray-200'}
                                relative inline-flex items-center flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                aria-hidden="true"
                                className={`${data.isMixDigit ? 'translate-x-5' : 'translate-x-1'}
                                    pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                />
                            </Switch>

                        </label>
                    </div>



                    <div className="mt-10 flex justify-center">
                        <hr className="w-4/5 lg:w-3/4"/>
                    </div>

                    <div className="my-4">
                        <Label value="Operator" className="text-xl underline" />
                    </div>

                    <div className="mt-2">
                        <div className="pb-2 flex justify-around">
                            <div className="flex flex-col flex-wrap content-center place-items-center">
                                <div>Plus</div>
                                <StatusBox className="my-2 cursor-pointer transition-colors ease-in-out duration-200" isEnabled={data.operator.includes("+") ? true : false} onClick={() => manuallySetOperator("operator", "+", !data.operator.includes("+"))}>
                                    {decode('&#43;')}
                                </StatusBox>
                                <Checkbox id="plus" name="operator" value="+" checked={data.operator.includes("+") ? "checked" : ""} handleChange={onHandleChangeCheckboxGroup} />
                            </div>
                            <div className="flex flex-col flex-wrap content-center place-items-center">
                                <div>Minus</div>
                                <StatusBox className="my-2 cursor-pointer transition-colors ease-in-out duration-200" isEnabled={data.operator.includes("-") ? true : false} onClick={() => manuallySetOperator("operator", "-", !data.operator.includes("-"))}>
                                    {decode('&#8722;')}
                                </StatusBox>
                                <Checkbox id="minus" name="operator" value="-" checked={data.operator.includes("-") ? "checked" : ""} handleChange={onHandleChangeCheckboxGroup} />
                            </div>
                            <div className="flex flex-col flex-wrap content-center place-items-center">
                                <div>Multiply</div>
                                <StatusBox className="my-2 cursor-pointer transition-colors ease-in-out duration-200" isEnabled={data.operator.includes("*") ? true : false} onClick={() => manuallySetOperator("operator", "*", !data.operator.includes("*"))}>
                                    {decode('&#215;')}
                                </StatusBox>
                                <Checkbox id="multiply" name="operator" value="*" checked={data.operator.includes("*") ? "checked" : ""} handleChange={onHandleChangeCheckboxGroup} />
                            </div>
                            <div className="flex flex-col flex-wrap content-center place-items-center">
                                <div>Divide</div>
                                <StatusBox className="my-2 cursor-pointer transition-colors ease-in-out duration-200" isEnabled={data.operator.includes("/") ? true : false} onClick={() => manuallySetOperator("operator", "/", !data.operator.includes("/"))}>
                                    {decode('&#247;')}
                                </StatusBox>
                                <Checkbox id="divide" name="operator" value="/" checked={data.operator.includes("/") ? "checked" : ""} handleChange={onHandleChangeCheckboxGroup} />
                            </div>

                        </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <hr className="w-4/5 lg:w-3/4"/>
                    </div>



                    <div className="mt-6 flex justify-center">
                        <BlackButton px='6' py='3' processing={processing}>Generate</BlackButton>
                    </div>

                </form>

            </BodyCard>

        </div>
    );
}
