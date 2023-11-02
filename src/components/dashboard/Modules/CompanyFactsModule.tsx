import { Swiper, SwiperSlide } from "swiper/react";
import ModuleTemplate from "./ModuleTemplate";
// Import Swiper styles
import "swiper/css";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
} from "recharts";
import ExtraSliderUI from "@/components/basic/ExtraSliderUI";

const colorCodes = [
    "#1f77b4",  // Blue
    "#ff7f0e",  // Orange
    "#2ca02c",  // Green
    "#d62728",  // Red
    "#9467bd",  // Purple
    "#8c564b",  // Brown
    "#e377c2",  // Pink
    "#7f7f7f",  // Gray
    "#bcbd22",  // Yellow-green
    "#17becf",  // Cyan
    "#ff1493",  // Deep Pink
    "#32cd32",  // Lime Green
    "#ff4500",  // Red-Orange
    "#9932cc",  // Dark Orchid
    "#ffa07a",  // Light Salmon
    "#00ced1",  // Dark Turquoise
    "#ffc0cb",  // Pink
    "#ff69b4",  // Hot Pink
    "#7b68ee",  // Medium Slate Blue
    "#6a5acd",  // Slate Blue
    "#9370db",  // Medium Purple
    "#00bfff",  // Deep Sky Blue
    "#40e0d0",  // Turquoise
    "#20b2aa",  // Light Sea Green
    "#5f9ea0",  // Cadet Blue
    "#00fa9a",  // Medium Spring Green
    "#90ee90",  // Light Green
    "#98fb98",  // Pale Green
    "#48d1cc",  // Medium Turquoise
    "#87ceeb"   // Sky Blue
];


export default function CompanyFactsModule({ days, title, user }) {
    if (!user.tracking || user.tracking.length === 0) {
        return (
            <ModuleTemplate
                label={title}
                // description="Employees"
                noDataDescription="No employee data available."
            >
                <ResponsiveContainer width="100%" height={400}>
                    <div>
                        <h1>Insufficient data</h1>
                        <h4>Please fill in your score on the Calender page or add your daily scores above!</h4>

                    </div>
                </ResponsiveContainer>
            </ModuleTemplate>
        );
    }
    // Sort the user tracking data by unixTime in ascending order
    user.tracking.sort((a, b) => a.unixTime - b.unixTime);
    // Filter the data for the last {days} days
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison
    const filteredData = user.tracking.filter((entry) => {
        const entryDate = new Date(entry.localDate);
        entryDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison
        const daysDifference = Math.floor(
            (currentDate - entryDate) / (24 * 60 * 60 * 1000)
        );
        return daysDifference < days;
    });


    if (!filteredData || filteredData.length === 0) {
        return (
            <ModuleTemplate
                label={title}
                // description="Employees"
                noDataDescription="No employee data available."
            >
                <ResponsiveContainer width="100%" height={400}>
                    <div>
                        <h1>Insufficient data</h1>
                        <h4>Please fill in your score on the Calender page or add your daily scores above!</h4>

                    </div>
                </ResponsiveContainer>
            </ModuleTemplate>
        );
    }

    // Create an array to store the data for the chart
    let chartData = [];

    // Iterate through the filtered data
    filteredData.forEach((entry) => {
        const entryData = {
            localDate: entry.localDate,
        };

        // Iterate through all metrics for each day
        entry.metrics.forEach((metric) => {
            entryData[metric.label] = metric.value;
        });

        chartData.push(entryData);
    });

    return (
        <ModuleTemplate
            label={title}
            noDataDescription="No employee data available."
        >
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="localDate" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {filteredData.length > 0 && filteredData[0].metrics.map((metric, index) => (
                        <Line
                            key={metric.label}
                            type="monotone"
                            dataKey={metric.label}
                            name={metric.label}
                            stroke={colorCodes[index]}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ModuleTemplate>
    );
}
