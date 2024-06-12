import { ResponsiveLine } from '@nivo/line';

const Voucher = () => {
  const data = [
    { date: '2024-05-25', price: 10, productsSold: 5 },
    { date: '2024-05-26', price: 12, productsSold: 8 },
    { date: '2024-05-27', price: 15, productsSold: 12 },
    { date: '2024-05-28', price: 11, productsSold: 6 },
    { date: '2024-05-29', price: 14, productsSold: 10 },
    { date: '2024-05-30', price: 13, productsSold: 9 },
    { date: '2024-05-31', price: 16, productsSold: 11 },
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={[
          { id: 'Products Sold', data: data.map(({ date, productsSold }) => ({ x: date, y: productsSold })) },
          { id: 'Price', data: data.map(({ date, price }) => ({ x: date, y: price })) }
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'time', format: '%Y-%m-%d' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 1 day',
          legend: 'Date',
          legendOffset: -12,
          legendPosition: 'middle',
        }}
        axisLeft={{
          legend: 'Count',
          legendOffset: 12,
          legendPosition: 'middle',
        }}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'category10' }}
        lineWidth={3}
        enablePoints={true}
        pointSize={8}
        pointColor={{ from: 'color', modifiers: [] }}
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={-12}
        pointLabelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
        enableArea={true}
        areaOpacity={0.3}
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
          },
        ]}
      />
    </div>
  );
};

export default Voucher;