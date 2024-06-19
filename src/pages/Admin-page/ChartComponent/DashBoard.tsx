import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { mockLineData, fetchBestSellerProducts, mockBarData } from './mockData.ts';

const Dashboard: React.FC = () => {

    const [mockPieData, setMockPieData] = useState([]);

    useEffect(() => {
        // Fetch the data from the API
        const getData = async () => {
            const data = await fetchBestSellerProducts();
            setMockPieData(data);
        };
        getData();
    }, []);

    return (
        <div style={{ background: '#f8e6e9', padding: '20px', color: '#5a1a1a', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <StatCard title="Total Orders" value="12,361" growth="+14%" />
                <StatCard title="Sales Obtained" value="431,225" growth="+21%" />
                <StatCard title="New Customers" value="32,441" growth="+5%" />
            </div>

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 2, background: '#fff5f7', padding: '20px', marginRight: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Revenue Generated</h3>
                    <h1>$59,342.32</h1>
                    <div style={{ height: '300px' }}>
                        {mockLineData && (
                            <ResponsiveLine
                                data={mockLineData}
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
                                    legend: 'transportation',
                                    legendOffset: 36,
                                    legendPosition: 'middle'
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'count',
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
                <div style={{ flex: 1, background: '#fff5f7', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Recent Transactions</h3>
                    <TransactionList />
                </div>
            </div>

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1, background: '#fff5f7', padding: '20px', marginRight: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Campaign</h3>
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
                    <h3>Sales Quantity</h3>
                    <div style={{ height: '200px' }}>
                        {mockBarData && (
                            <ResponsiveBar
                                data={mockBarData}
                                keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
                                indexBy="country"
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
                                    legend: 'country',
                                    legendPosition: 'middle',
                                    legendOffset: 32
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'food',
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
                                barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>
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

const TransactionList: React.FC = () => {
    const transactions = [
        { name: 'John Doe', date: '2023-06-01', amount: '$123.45' },
        { name: 'Jane Smith', date: '2023-06-02', amount: '$678.90' },
        { name: 'Sam Johnson', date: '2023-06-03', amount: '$234.56' },
        { name: 'Chris Lee', date: '2023-06-04', amount: '$789.01' },
    ];

    return (
        <div>
            {transactions.map((transaction, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '10px', background: '#fce4ec', borderRadius: '4px' }}>
                    <span>{transaction.name}</span>
                    <span>{transaction.date}</span>
                    <span>{transaction.amount}</span>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;