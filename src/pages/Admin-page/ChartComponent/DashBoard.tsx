import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { fetchLineData, fetchBestSellerProducts, fetchBarData } from './mockData.ts';
import {
    getTotalOrder,
    getTotalProfit,
    getTotalUser,
} from "../../../apiServices/AdminServices/adminServices.tsx";

interface PaymentData {
    Payment: string;
    [key: string]: string | number;
}

const Dashboard: React.FC = () => {

    const [mockPieData, setMockPieData] = useState([]);

    const [transactions, setTransactions] = useState<{ name: string, date: string, amount: string }[]>([]);

    const [chartData, setChartData] = useState([]);
    const [totalSumOfAllOrders, setTotalSumOfAllOrders] = useState(0);

    const [barData, setBarData] = useState<PaymentData[]>([]);

    const [totalOrder, setTotalOrder] = useState<number>();
    const [totalProfit, setTotalProfit] = useState<number>();
    const [totalUser, setTotalUser] = useState<number>();

    useEffect(() => {
        const getData = async () => {
            const data = await fetchBestSellerProducts();
            setMockPieData(data);
        };
        getData();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('https://localhost:7030/api/Admin/GetOrders');
                const data = await response.json();

                const transformedData = data.map((transaction: any) => {
                    const date = new Date(transaction.orderDate);
                    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                    return {
                        name: transaction.userName,
                        date: formattedDate,
                        amount: `${transaction.total.toLocaleString('en-US')} VND`,
                    };
                }).sort((a: any, b: any) => new Date(b.date.split('/').reverse().join('/')).getTime() - new Date(a.date.split('/').reverse().join('/')).getTime());

                setTransactions(transformedData);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        const getData = async () => {
            const { transformedData, totalSumOfAllOrders } = await fetchLineData();
            setChartData(transformedData);
            setTotalSumOfAllOrders(totalSumOfAllOrders);
        };

        getData();
    }, []);

    useEffect(() => {
        const getBarData = async () => {
            const data = await fetchBarData();
            setBarData(data);
        };

        getBarData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTotalOrder();
            setTotalOrder(result);
            const result1 = await getTotalProfit();
            setTotalProfit(result1);
            const result2 = await getTotalUser();
            setTotalUser(result2 - 2);
        };
        fetchData();
    }, []);

    return (
        <div style={{ background: '#f8e6e9', padding: '20px', color: '#5a1a1a', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <StatCard title="Total Orders" value={totalOrder?.toString() || "0"} growth="+14%" />
                <StatCard title="Sales Obtained" value={totalProfit?.toLocaleString() || "0"} growth="+21%" />
                <StatCard title="New Customers" value={totalUser?.toString() || "0"} growth="+5%" />
            </div>

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 2, background: '#fff5f7', padding: '20px', marginRight: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Revenue Earned</h3>
                    <h1>{totalSumOfAllOrders.toLocaleString()} VND</h1>
                    <div style={{ height: '300px' }}>
                        {chartData.length > 0 && (
                            <ResponsiveLine
                                data={chartData}
                                colors={{ scheme: 'pink_yellowGreen' }}
                                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                xScale={{ type: 'point' }}
                                yScale={{
                                    type: 'linear',
                                    min: 'auto',
                                    max: 'auto',
                                    stacked: true,
                                    reverse: false
                                }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Order Date',
                                    legendOffset: 36,
                                    legendPosition: 'middle'
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Order Count',
                                    legendOffset: -40,
                                    legendPosition: 'middle'
                                }}
                                pointSize={10}
                                pointColor={{ theme: 'background' }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: 'serieColor' }}
                                pointLabelYOffset={-12}
                                useMesh={true}
                                legends={[
                                    {
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 100,
                                        translateY: 0,
                                        itemsSpacing: 0,
                                        itemDirection: 'left-to-right',
                                        itemWidth: 80,
                                        itemHeight: 20,
                                        itemOpacity: 0.75,
                                        symbolSize: 12,
                                        symbolShape: 'circle',
                                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                                    itemOpacity: 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        )}
                    </div>
                </div>
                <div style={{ flex: 1, background: '#fff5f7', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', overflowY: 'auto', height: '480px' }}>
                    <h3>Recent Transactions</h3>
                    <TransactionList transactions={transactions} />
                </div>
            </div>

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1, background: '#fff5f7', padding: '20px', marginRight: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Top Seller</h3>
                    <div style={{ height: '200px' }}>
                        {mockPieData && (<ResponsivePie
                            data={mockPieData}
                            colors={{ scheme: 'pink_yellowGreen' }}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{
                                from: 'color',
                                modifiers: [['darker', 0.2]]
                            }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#5a1a1a"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{
                                from: 'color',
                                modifiers: [['darker', 2]]
                            }}
                        />
                        )}
                    </div>
                </div>

                <div style={{ flex: 1, background: '#fff5f7', padding: '20px', marginRight: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Top Brand</h3>
                    <div style={{ height: '300px' }}>
                        {barData.length > 0 && (
                            <ResponsiveBar
                                data={barData}
                                keys={barData.length > 0 ? Object.keys(barData[0]).filter(key => key !== 'Payment' && !key.endsWith('Color')) : []}
                                indexBy="Payment"
                                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                                padding={0.3}
                                colors={{ scheme: 'pink_yellowGreen' }}
                                borderColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]]
                                }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Payment',
                                    legendPosition: 'middle',
                                    legendOffset: 32
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Sales Quantity',
                                    legendPosition: 'middle',
                                    legendOffset: -40
                                }}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                labelTextColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]]
                                }}
                                legends={[
                                    {
                                        dataFrom: 'keys',
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 120,
                                        translateY: 0,
                                        itemsSpacing: 2,
                                        itemWidth: 100,
                                        itemHeight: 20,
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 0.85,
                                        symbolSize: 20,
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemOpacity: 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                                role="application"
                                ariaLabel="Nivo bar chart demo"
                                barAriaLabel={function (e) { return `${e.id}: ${e.formattedValue} in payment type: ${e.indexValue}` }}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div >
    );
};

const StatCard: React.FC<{ title: string; value: string; growth: string }> = ({ title, value, growth }) => {
    return (
        <div style={{ flex: 1, background: '#fff5f7', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <h3>{title}</h3>
            <h2>{value}</h2>
            <p style={{ color: growth.startsWith('+') ? '#28a745' : '#dc3545' }}>{growth}</p>
        </div>
    );
};

interface Transaction {
    name: string;
    date: string;
    amount: string;
}

const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '12px 0', textAlign: 'left' }}>Name</th>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '12px 0', textAlign: 'left' }}>Date</th>
                    <th style={{ borderBottom: '1px solid #ddd', padding: '12px 0', textAlign: 'left' }}>Amount</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>{transaction.name}</td>
                        <td style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>{transaction.date}</td>
                        <td style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>{transaction.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Dashboard;