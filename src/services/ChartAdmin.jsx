import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
const ChartAdmin = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'สถิติการใส่แมสวันนี้',
            },
        },
    };

    const labels = ['10:12:10', '10:12:15', '10:12:20', '10:12:30', '10:12:40', '10:12:50', '10:12:60'];

    const data = {
        labels,
        datasets: [
            {
                label: 'ใส่แมส [ถูกต้อง]',
                data: [1, 5, 7, 9, 11, 13, 15],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'ไม่ใส่แมส',
                data: [2, 4, 6, 8, 10, 14, 20],
                borderColor: 'rgb(53, 14, 235)',
                backgroundColor: 'rgba(53, 14, 235, 0.5)',
            },
            {
                label: 'ใส่แมส [ไม่ถูกต้อง]',
                data: [1, 5, 10, 15, 20, 21, 26],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <Line options={options} data={data} />
    )
}

export default ChartAdmin