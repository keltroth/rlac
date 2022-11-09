/**
 * Store of the APIs.
 * @type {Map<any, any>}
 */
const apis = new Map();

/**
 * Build a new Rlac.
 * @param {Object} api API to be proxified
 * @param {String} apiId a unique ID
 * @param {Number} timeLimit time limit
 * @param {Number} quantityLimit amount limit
 * @returns {Object}
 */
export function rlac(api, apiId, timeLimit, quantityLimit) {

    if (!api || !apiId) {
        throw new Error('An API is needed');
    }

    if (apis.get(apiId)) {
        return apis.get(apiId);
    }

    if (!timeLimit || !quantityLimit) {
        throw new Error('Rate limits needed');
    }

    let currentCalled = 0;
    let totalCalled = 0;

    // The resetter
    setInterval(() => currentCalled = 0, timeLimit);

    // Creating the proxy to call any method of the api
    const theProxy = new Proxy(api, {
        get(target, prop, receiver) {
            const value = target[prop];
            if (value instanceof Function) {
                return async function proxified(...args) {
                    return rateLimitedAPICaller(() => value.apply(this === receiver ? target : this, args));
                }
            }
            return Reflect.get(target, prop);
        },
    });
    apis.set(apiId, theProxy);

    /**
     * Using an async function to get data when ready.
     * @param {Function} cb the callback which will be called when ready
     * @return {Promise} the promise to wait for
     */
    async function rateLimitedAPICaller(cb) {
        await waitForYourTurn();
        totalCalled += 1;
        return cb();
    }

    /**
     * Wait until the limit is not exceeded anymore.
     * @return {Promise} to resolve when ready
     */
    async function waitForYourTurn() {
        const poll = (resolve) => {
            if (currentCalled < quantityLimit) {
                currentCalled += 1;
                resolve();
            } else {
                setTimeout(() => poll(resolve), 400);
            }
        }
        return new Promise(poll);
    }

    return theProxy;
}
