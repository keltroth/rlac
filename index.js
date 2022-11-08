/**
 * Store of the APIs.
 * @type {Map<any, any>}
 */
const apis = new Map();

/**
 * Rate Limited API Caller builder.
 * @param {String} apiId ID of the API, up to you
 * @param {Number} timelimit time limit in milliseconds
 * @param {Number} quantity quantity limit
 * @return {Rlac} the Rate Limited API Caller
 * @constructor
 */
export function build(obj, apiId, timelimit = 3000, quantity = 10) {
    if (apis.get(apiId)) {
        return apis.get(apiId);
    }
    const theRlac = new Rlac(obj, apiId, timelimit, quantity);
    apis.set(apiId, theRlac);
    return theRlac;
}

/**
 * Rlac, pronounced relax for LateX fans ;)
 */
class Rlac {

    #currentCalled = 0;
    #apiId = '';
    #timelimit = 3000;
    #quantity = 10;
    #totalCalled = 0;

    /**
     * Build a new Rlac.
     * @param {Object} obj API to be proxified
     * @param apiId
     * @param timelimit
     * @param quantity
     */
    constructor(obj, apiId, timelimit, quantity) {
        this.#apiId = apiId;
        this.#timelimit = timelimit;
        this.#quantity = quantity;

        // The resetter
        setInterval(() => this.#currentCalled = 0, this.#timelimit);

        return new Proxy (obj, {
            get(target, prop) {
                if (typeof target[prop] === 'function') {
                    return new Proxy(target[prop], {
                        apply: async (targetFunc, thisArg, argumentsList) => {
                            console.log(thisArg);
                            return this.#rateLimitedAPICaller(() => Reflect.apply(targetFunc, thisArg, argumentsList));
                        },
                    });
                }
                return Reflect.get(target, prop);
            },
        });
    }

    /**
     * Using an async function to get data when ready.
     * @param {Function} cb the callback which will be called when ready
     * @return {Promise} the promise to wait for
     */
    async #rateLimitedAPICaller(cb) {
        console.log('feah')
        await this.#waitForYourTurn();
        this.#totalCalled += 1;
        return cb();
    }

    /**
     * Wait until the limit is not exceeded anymore.
     * @return {Promise} to resolve when ready
     */
    async #waitForYourTurn() {
        console.log('meh');
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
