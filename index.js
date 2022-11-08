/**
 * Store of the APIs.
 * @type {Map<any, any>}
 */
const apis = new Map();

/**
 * Rlac, pronounced relax for LateX fans ;)
 */
export class Rlac {

    #currentCalled = 0;
    #apiId = '';
    #timelimit = 3000;
    #quantity = 10;
    #totalCalled = 0;

    /**
     * Build a new Rlac.
     * @param {Object} obj API to be proxified
     * @param {String} apiId
     * @param timelimit
     * @param quantity
     */
    constructor(obj, apiId, timelimit, quantity) {

        if (apis.get(apiId)) {
            return apis.get(apiId);
        }

        const rlac = this;

        rlac.#apiId = apiId;
        rlac.#timelimit = timelimit;
        rlac.#quantity = quantity;

        // The resetter
        setInterval(() => rlac.#currentCalled = 0, rlac.#timelimit);

        const theProxy = new Proxy(obj, {
            get(target, prop, receiver) {
                const value = target[prop];
                if (value instanceof Function) {
                    return async function proxified(...args) {
                        return rlac.#rateLimitedAPICaller(() => value.apply(this === receiver ? target : this, args));
                    }
                }
                return Reflect.get(target, prop);
            },
        });
        apis.set(apiId, theProxy);
        return theProxy;
    }

    /**
     * Using an async function to get data when ready.
     * @param {Function} cb the callback which will be called when ready
     * @return {Promise} the promise to wait for
     */
    async #rateLimitedAPICaller(cb) {
        await this.#waitForYourTurn();
        this.#totalCalled += 1;
        return cb();
    }

    /**
     * Wait until the limit is not exceeded anymore.
     * @return {Promise} to resolve when ready
     */
    async #waitForYourTurn() {
        const poll = (resolve) => {
            if (this.#currentCalled < this.#quantity) {
                this.#currentCalled += 1;
                resolve();
            } else {
                setTimeout(() => poll(resolve), 400);
            }
        }
        return new Promise(poll);
    }
}
