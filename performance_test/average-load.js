import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '30m', target: 100 },
        { duration: '5m', target: 0 },
    ],
};

export default () => {
    const urlRes = http.get('https://test-api.k6.io');
    sleep(1);
};
