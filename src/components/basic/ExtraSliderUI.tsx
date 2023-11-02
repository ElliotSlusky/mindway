import { useState } from "react";
import { useSwiper } from "swiper/react";
import { twMerge } from "tailwind-merge";

export default function ExtraSliderUI({ }: // pageCount,
    // currentPage,
    {
        // pageCount: number;
        // currentPage: number;
    }) {
    const swiper = useSwiper();
    const [trigger, setTrigger] = useState(0);
    return (
        <div>
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-[40%] -left-1 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer pointer-events-auto"
                        onClick={() => {
                            swiper.slidePrev();
                            setTrigger(trigger + 1);
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </div>
                <div className="absolute top-[40%] -right-1  pointer-events-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                            swiper.slideNext();
                            setTrigger(trigger + 1);
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex justify-center gap-3">
                {swiper.slides.map((_, index) => (
                    <div
                        key={index}
                        className={twMerge(
                            "w-1 h-1 rounded-full bg-slate-200",
                            swiper.activeIndex === index && "bg-blue-600"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
