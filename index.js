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
export function build(apiId, timelimit = 3000, quantity = 10) {
    if (apis.get(apiId)) {
        return apis.get(apiId);
    }
    const theRlac = new Rlac(apiId, timelimit, quantity);
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
     * @param apiId
     * @param timelimit
     * @param quantity
     */
    constructor(apiId, timelimit, quantity) {
        this.#apiId = apiId;
        this.#timelimit = timelimit;
        this.#quantity = quantity;

        // The resetter
        setInterval(() => this.#currentCalled = 0, this.#timelimit);
        setInterval(() => console.log({
            current: this.#currentCalled,
            mapSize: apis.size,
            apiId: this.#apiId,
        }), 500);
    }

    /**
     * Usync an async generator to yield data when ready.
     * @param {Function} cb the callback which will be called when ready
     * @return {AsyncGenerator} the generator to wait for
     */
    async* #rateLimitedAPICaller(cb) {
        while (true) {
            await this.#waitForYourTurn();
            this.#totalCalled += 1;
            const result = await cb();
            yield result;
        }
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

    /**
     * Schedule an api call and wait for the answer.
     * @param {Function} cb the callback which will be called when ready
     * @return {Promise} promise to wait for the answer
     */
    async call(cb) {
        return (await this.#rateLimitedAPICaller(cb).next()).value;
    }
}
