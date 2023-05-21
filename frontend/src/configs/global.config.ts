let result = {
    SERVER_HOST: 'http://localhost:3000',
    FRONT_HOST: 'http://localhost:5173',
};
if (import.meta.env.PROD) {
    result = {
        SERVER_HOST: 'http://1431423-cu86531.tw1.ru:3001',
        FRONT_HOST: 'http://1431423-cu86531.tw1.ru/',
    }
}
export default result;