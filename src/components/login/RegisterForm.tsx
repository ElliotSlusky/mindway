import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Cookies from 'js-cookie';


type FormValues = {
    fullname: string;
    email: string;

    password: string;
};

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {

        async function Register() {
            const res = await axios.post('https://elliot-server.ngrok.dev/register', { name: data.fullname, email: data.email, password: data.password });
            console.log(res.data.token);

            if (res.data.status) {
                Cookies.set('token', res.data.token);
                Cookies.set('email', res.data.email);

                window.location.href = '/dashboard';
            }
        }
        Register();
        console.log(data);
    };

    return (
        <div className="w-[452px] mx-auto text-lg">
            <div className="font-bold text-center mb-6">Fill Out Form To Register!</div>
            <div className="mb-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="fullname" className="block font-medium leading-6 text-gray-900 mb-4">
                            Full Name:
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            className="bg-indigo-100 mb-5 px-4 rounded-full py-2 block w-full border border-indigo-500 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                            placeholder="Full Name"
                            {...register("fullname", { required: true })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block font-medium leading-6 text-gray-900 mb-4">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-indigo-100 mb-5 px-4 rounded-full py-2 block w-full border border-indigo-500 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block font-medium leading-6 text-gray-900 mb-4">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-indigo-100 mb-5 px-4 rounded-full py-2 block w-full border border-indigo-500 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                    </div>

                    <div className="h-10"></div>
                    <button type="submit" className="flex w-full justify-center rounded-full bg-indigo-500 px-4 py-3 font-normal leading-6 text-indigo-100 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Register
                    </button>
                </form>
            </div>
            <div className="text-center">
                <Link href="/">Already have an account? <span className="font-bold">Login.</span></Link>
            </div>
        </div >
    );
}
