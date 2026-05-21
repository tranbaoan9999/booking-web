const API_URL = process.env.NEXT_PUBLIC_API_CORE_URL || 'http://localhost:8080';

export const fetchApi = async(endpoint, options = {}) => {
  try {
    const response = await fetch (`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    })
    if(!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch API error:', error);
    throw error;
  }
}