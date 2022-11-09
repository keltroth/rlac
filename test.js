import { rlac } from './index.js';

const api = {
    tester(value) {
        console.log(`Yeah ${value}`);
        return new Date();
    },
};

const test = rlac(api, 'yeah', 3000, 10);
const test2 = rlac(api, 'yeah', 3000, 10);
const test3 = rlac(api, 'yeah2', 3000, 10);


let idx = 0;

Promise.allSettled([
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test2.tester(idx++),
        test.tester(idx++),
        test2.tester(idx++),
        test2.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test2.tester(idx++),
        test2.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test2.tester(idx++),
        test2.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test3.tester(idx++),
        test3.tester(idx++),
        test3.tester(idx++),
        test3.tester(idx++),
        test3.tester(idx++),
        test3.tester(idx++),
        test3.tester(idx++),
        test3.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
        test.tester(idx++),
    ],
).then((data) => {
    console.log(data);
    process.exit();
});


