import { PagerResponse } from "#src/model/common/pager.js"

class Pager {
    constructor(page = 1, limit = 10, totalItems = 0) {
        this._page = parseInt(page) > 0 ? parseInt(page) : 1
        this._limit = parseInt(limit) > 0 ? parseInt(limit) : 10
        this._totalItems = parseInt(totalItems) >= 0 ? parseInt(totalItems) : 0
    }

    get offset() {
        return (this._page - 1) * this._limit
    }

    get page() {
        return this._page ?? 0
    }

    get limit() {
        return this._limit ?? 0
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.limit)
    }

    /**
     * @param {number} totalItems
     */
    set totalItems(totalItems) {
        this._totalItems = totalItems
    }

    get totalItems() {
        return this._totalItems ?? 0
    }

    getResponse() {
        return PagerResponse.parse({
            page: this.page,
            limit: this.limit,
            totalPages: this.totalPages,
        })
    }
}

export default Pager
