"use client";

import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { ClassNameValue, twMerge } from "tailwind-merge";

export default function TextInput({
  label,
  uniqueId,
  inputOptions,
  className,
  placeholder,
}: {
  className?: ClassNameValue;
  label?: string;
  uniqueId: string;
  placeholder?: string;
  inputOptions?: RegisterOptions<FieldValues, string> | undefined;
}) {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="">
      {label && (
        <label
          htmlFor="uniqueId"
          className="block font-medium leading-6 text-gray-900 mb-4"
        >
          {label}
        </label>
      )}
      <div className={label && "mt-2"}>
        <input
          type="text"
          id={uniqueId}
          className={twMerge(
            "bg-indigo-100 mb-5 px-4 rounded-full py-2 block w-full border border-indigo-500 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500",
            className
          )}
          placeholder={placeholder}
          defaultValue=""
          {...register(uniqueId, inputOptions)}
        />
      </div>
    </div>
  );
}
//
