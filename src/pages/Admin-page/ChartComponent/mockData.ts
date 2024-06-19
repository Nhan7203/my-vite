// export const mockLineData = [
//     {
//         id: 'us',
//         data: [
//             { x: 'plane', y: 200 },
//             { x: 'helicopter', y: 300 },
//             { x: 'boat', y: 100 },
//             { x: 'train', y: 400 },
//             { x: 'subway', y: 200 },
//             { x: 'bus', y: 300 },
//             { x: 'car', y: 400 },
//             { x: 'moto', y: 100 },
//             { x: 'bicycle', y: 400 },
//             { x: 'horse', y: 200 },
//             { x: 'skateboard', y: 300 },
//             { x: 'others', y: 400 },
//         ],
//     },
//     {
//         id: 'france',
//         data: [
//             { x: 'plane', y: 300 },
//             { x: 'helicopter', y: 400 },
//             { x: 'boat', y: 200 },
//             { x: 'train', y: 500 },
//             { x: 'subway', y: 300 },
//             { x: 'bus', y: 400 },
//             { x: 'car', y: 500 },
//             { x: 'moto', y: 200 },
//             { x: 'bicycle', y: 500 },
//             { x: 'horse', y: 300 },
//             { x: 'skateboard', y: 400 },
//             { x: 'others', y: 500 },
//         ],
//     },
//     {
//         id: 'japan',
//         data: [
//             { x: 'plane', y: 400 },
//             { x: 'helicopter', y: 500 },
//             { x: 'boat', y: 300 },
//             { x: 'train', y: 600 },
//             { x: 'subway', y: 400 },
//             { x: 'bus', y: 500 },
//             { x: 'car', y: 600 },
//             { x: 'moto', y: 300 },
//             { x: 'bicycle', y: 600 },
//             { x: 'horse', y: 400 },
//             { x: 'skateboard', y: 500 },
//             { x: 'others', y: 600 },
//         ],
//     },
// ];

interface DailyOrderSummary {
    orderDate: string;
    orderCount: number;
}

interface User {
    userName: string;
    dailyOrderSummaries: DailyOrderSummary[];
}

interface TopUsersResponse {
    topUsers: User[];
    totalSumOfAllOrders: number;
}

export const fetchLineData = async (): Promise<{ transformedData: { id: string; data: { x: string; y: number }[] }[]; totalSumOfAllOrders: number }> => {
    try {
        const response = await fetch('https://localhost:7030/api/Admin/GetTopUsersByOrderCount');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: TopUsersResponse = await response.json();

        const transformedData = data.topUsers.map(user => ({
            id: user.userName,
            data: user.dailyOrderSummaries.map(summary => ({
                x: new Date(summary.orderDate).toLocaleDateString(),
                y: summary.orderCount
            }))
        }));

        return { transformedData, totalSumOfAllOrders: data.totalSumOfAllOrders };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { transformedData: [], totalSumOfAllOrders: 0 };
    }
};

export const fetchBestSellerProducts = async () => {
    try {
        const response = await fetch('https://localhost:7030/api/Admin/getBestSellerProducts');
        const data = await response.json();
        return data.map((item: { product: { productId: { toString: () => string; }; name: string; }; orderCount: number; }) => ({
            id: item.product.name.toString(),
            label: item.product.name,
            value: item.orderCount,
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// export const mockPieData = [
//     { id: 'donut', label: 'donut', value: 30 },
//     { id: 'fries', label: 'fries', value: 50 },
//     { id: 'kebab', label: 'kebab', value: 20 },
//     { id: 'sandwich', label: 'sandwich', value: 40 },
//     { id: 'burger', label: 'burger', value: 60 },
// ];

interface PaymentData {
    Payment: string;
    [key: string]: string | number;
}

export const fetchBarData = async (): Promise<PaymentData[]> => {
    try {
        const response = await fetch('https://localhost:7030/api/Admin/GetTopBrandsByOrderCount');
        if (!response.ok) {
            throw new Error('Error API');
        }
        const data = await response.json();

        const paymentTypes = ['paypalOrderCount', 'cashOrderCount'];

        const transformedData = paymentTypes.map(paymentType => {
            const paymentLabel = paymentType === 'paypalOrderCount' ? 'Paypal' : 'Cash';
            const paymentData: PaymentData = { Payment: paymentLabel };

            data.forEach((brand: { brandId: number, brandName: string, [key: string]: any }) => {
                const brandName = brand.brandName;
                paymentData[brandName] = brand[paymentType];
                paymentData[`${brandName}Color`] = 'hsl(229, 70%, 50%)';
            });

            return paymentData;
        });

        return transformedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// export const mockBarData = [
//     {
//         Payment: 'Paypal',
//         'hot dog': 129,
//         'hot dogColor': 'hsl(229, 70%, 50%)',
//         burger: 85,
//         burgerColor: 'hsl(296, 70%, 50%)',
//         sandwich: 42,
//         sandwichColor: 'hsl(97, 70%, 50%)',
//         kebab: 69,
//         kebabColor: 'hsl(340, 70%, 50%)',
//         fries: 150,
//         friesColor: 'hsl(72, 70%, 50%)',
//         donut: 128,
//         donutColor: 'hsl(257, 70%, 50%)',
//     },
//     {
//         Payment: 'Cash',
//         'hot dog': 92,
//         'hot dogColor': 'hsl(229, 70%, 50%)',
//         burger: 97,
//         burgerColor: 'hsl(296, 70%, 50%)',
//         sandwich: 102,
//         sandwichColor: 'hsl(97, 70%, 50%)',
//         kebab: 87,
//         kebabColor: 'hsl(340, 70%, 50%)',
//         fries: 112,
//         friesColor: 'hsl(72, 70%, 50%)',
//         donut: 130,
//         donutColor: 'hsl(257, 70%, 50%)',
//     },
// ];
