import { build } from './index.js';

const test = build('yeah', 30000);

const sleep = ms => new Promise(r => setTimeout(r, ms));

Promise.allSettled(
    [
        test.call(async () => {
                console.log('Test 1');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 1;
        }),
        test.call(async () => {
                console.log('Test 2');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 2;
        }),
        test.call(async () => {
                console.log('Test 3');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 3;
        }),
        test.call(async () => {
                console.log('Test 4');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 4;
        }),
        test.call(async () => {
                console.log('Test 5');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 5;
        }),
        test.call(async () => {
                console.log('Test 6');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 6;
        }),
        test.call(async () => {
                console.log('Test 7');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 7;
        }),
        test.call(async () => {
                console.log('Test 8');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 8;
        }),
        test.call(async () => {
                console.log('Test 9');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 9;
        }),
        test.call(async () => {
                console.log('Test 10');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 10;
        }),
        test.call(async () => {
                console.log('Test 11');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 11;
        }),
        test.call(async () => {
                console.log('Test 12');
                await sleep(Math.floor(Math.random() * 10000) + 5000);
                return 12;
        }),
    ]).then((data) => {
    console.log(data);
});

