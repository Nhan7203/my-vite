export const refreshToken = async () => {

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://localhost:7030/api/Account/RefreshToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            const newToken = data.token;
            localStorage.setItem('token', newToken);
            return newToken;
        } else {
            throw new Error('Failed to refresh token.');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};