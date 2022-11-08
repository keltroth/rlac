import { Rlac } from './index.js';

const api = {
    tester(value) {
        console.log(`Yeah ${value}`);
    },
};

const test = new Rlac(api, 'yeah', 3000, 10);
const test2 = new Rlac(api, 'yeah', 3000, 10);
const test3 = new Rlac(api, 'yeah2', 3000, 10);


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


