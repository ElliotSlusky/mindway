import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function ModuleTemplate({
    label,
    description,
    children,
    noDataDescription,
}: {
    label: string;
    description?: string;
    noDataDescription: string;
    children?: ReactNode;
}) {
    return (
        <div className="p-6 bg-white rounded-lg">
            <div className={twMerge("font-bold mb-3")}>{label}</div>
            {description && (
                <div className="text-slate-500 text-sm mb-3">{description}</div>
            )}
            <div className="mt-8">
                {children || (
                    <div className="flex justify-center items-center text-sm text-slate-500 min-h-[400px]">
                        {noDataDescription}
                    </div>
                )}
            </div>
        </div>
    );
}
