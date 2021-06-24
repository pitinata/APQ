import React, { useState, useEffect } from 'react';
import BodyCard from '@/Components/Parts/BodyCard';
import Menu from '@/Components/Parts/Menu';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import BlackButton from '@/Components/Button/BlackButton';
import FlashBox from '@/Components/FlashBox';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';

export default function ChangePassword(props){
    const{ data, setData, post, processing, errors, reset } = useForm({
        oldPassword: "",
        newPassword: "",
        newPassword_confirmation: "",
    });

    const [openFlash, setOpenFlash] = useState(true);

    const closeFn = () => {
        setOpenFlash(false);
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('user.password.store'),{
            onSuccess: () => {
                setOpenFlash(true);
                reset();
            }
        });
    }

    let flashMessage;

    if(props.flash.success){
        flashMessage = (
            <FlashBox bgColor="bg-green-100" borderColor="border-green-200" closeFn={closeFn}>
                <div className="text-green-600">{props.flash.success}</div>
            </FlashBox>
        );
    }
    else if(props.flash.failed){
        flashMessage = (
            <FlashBox bgColor="bg-red-100" borderColor="border-red-200" closeFn={closeFn}>
                <div className="text-red-600">{props.flash.failed}</div>
            </FlashBox>
        );
    }

    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

            <Menu props={props}></Menu>

            <BodyCard smWidth='7xl' lgWidth='2xl' smPadding='6' lgPadding ='8'>

                <div className="mb-8 flex justify-center">
                    <span className="text-3xl md:text-4xl font-bold	">Change Password</span>
                </div>

                <ValidationErrors errors={errors} />

                {openFlash && flashMessage}

                <form onSubmit={submit}>
                    <div>
                        <Label forInput="oldPassword" value="Current Password" />

                        <Input
                            type="password"
                            name="oldPassword"
                            value={data.oldPassword}
                            className="mt-1 block w-full"
                            required="required"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="mt-4">
                            <Label forInput="newPassword" value="New Password" />

                            <Input
                                type="password"
                                name="newPassword"
                                value={data.newPassword}
                                className="mt-1 block w-full"
                                required="required"
                                handleChange={onHandleChange}
                            />
                    </div>

                    <div className="mt-4">
                            <Label forInput="newPassword_confirmation" value="Confirm New Password" />

                            <Input
                                type="password"
                                name="newPassword_confirmation"
                                value={data.newPassword_confirmation}
                                className="mt-1 block w-full"
                                required="required"
                                handleChange={onHandleChange}
                            />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <BlackButton px='6' py='3' processing={processing}>Change Password</BlackButton>
                    </div>

                </form>
            </BodyCard>
        </div>
    );
}
