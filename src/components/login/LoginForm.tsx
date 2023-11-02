import React, { useEffect } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Cookies from 'js-cookie';
type FormValues = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    useEffect(() => {
        console.log("token", Cookies.get('token'))
        if (Cookies.get('token')) {
            window.location.href = '/dashboard';
        }
    }
        , []);


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        async function Login() {
            const res = await axios.post('https://elliot-server.ngrok.dev/login', { email: data.email, password: data.password });
            console.log(res.data);



            if (res.data.status) {
                Cookies.set('token', res.data.token);
                Cookies.set('email', res.data.email);

                window.location.href = '/dashboard';
            }
        }
        Login();
        console.log(data);
    };

    return (
        <div className="w-[452px] text-lg mx-auto">
            <div className="font-bold text-center mb-6">Welcome Back!</div>
            <div className="mb-6">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        Login
                    </button>
                </form>
            </div>
            <div className="text-center">
                <Link href="/register">
                    {"Don't have an account?"}<span className="font-bold">Register.</span>
                </Link>
            </div>
        </div>
    );
}
