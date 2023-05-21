let result = {
    SERVER_HOST: 'http://localhost:3000',
    FRONT_HOST: 'http://localhost:5173',
};
if (import.meta.env.PROD) {
    result = {
        SERVER_HOST: 'https://unithack.ru/:3000',
        FRONT_HOST: 'https://unithack.ru/',
    }
}

export default result;