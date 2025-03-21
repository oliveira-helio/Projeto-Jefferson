// const apiAdress=process.env.NODE_ENV === 'development' ? process.env.LOCAL_API_URL : process.env.NEXT_PUBLIC_API_URL;
let apiAdress: string | undefined;

if (process.env.NODE_ENV === 'development') {
    apiAdress = process.env.LOCAL_API_URL
} else {
    apiAdress = process.env.API_URL
}

export default apiAdress; 