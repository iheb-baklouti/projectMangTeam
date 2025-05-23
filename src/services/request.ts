
export const request = async (apiCall: Promise<any>) => {
  try {
    const response = await apiCall;
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};