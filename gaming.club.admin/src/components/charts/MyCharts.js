import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const MyChart = () => {
    const [data, setData] = useState([]);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    useEffect(() => {
        axios.get('http://localhost:8000/reservations/analytics').then((response) => {
            setData(response.data);
            console.log(response.data);
        });
    }, []);
    return (
        <div>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'countPayments', angle: -90, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="countPayments" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'countPayments', angle: -90, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="payday" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            <PieChart width={400} height={400}>
                <Pie  data={[
                    { name: 'Payments', value: data.reduce((sum, item) => sum + item.countPayments, 0), fill: COLORS[0] },
                    { name: 'Cancellations', value: data.reduce((sum, item) => sum + item.countCancellations, 0), fill: COLORS[1] },
                    // { name: 'Payday', value: data.reduce((sum, item) => sum + item.payday, 0) }
                ]} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                fill={COLORS}
                label/>
                <Tooltip />
                <Legend />
            </PieChart>
            {/* <PieChart width={600} height={300}>
                <Pie
                    data={data}
                    dataKey="data"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart> */}

        </div>
    );
};

export default MyChart;