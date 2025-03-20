const apiAdress=process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.PUBLIC_API_URL;

export default apiAdress; 