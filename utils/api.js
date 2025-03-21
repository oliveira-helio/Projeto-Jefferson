// const apiAdress=process.env.NODE_ENV === 'development' ? process.env.LOCAL_API_URL : process.env.NEXT_PUBLIC_API_URL;
const apiAdress= (process.env.NODE_ENV === 'development' ? process.env.PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL);


export default apiAdress; 