import { Rlac } from './index.js';

const api = {
        tester(value) {
                console.log(`Yeah ${value}`);
        }
};

const test = new Rlac(api, 'yeah', 3000, 10);
const test2 = new Rlac(api, 'yeah', 3000, 10);


let idx = 0;
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test2.tester(idx++);
await test.tester(idx++);
await test2.tester(idx++);
await test2.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test2.tester(idx++);
await test2.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test2.tester(idx++);
await test2.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);
await test.tester(idx++);

process.exit();
