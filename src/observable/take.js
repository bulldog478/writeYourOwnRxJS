import Disposable from './../Disposable'
import Observable from './../Observable'
Observable.prototype.take = function (count) {
    const subscribeFn = (observer) => {
        const unsubscribe = this.subscribe(
            value => {
                if (count > 0) {
                    observer.next(value)
                    count--
                } else {
                    observer.complete()
                }
            },
            err => observer.error(err),
            () => observer.complete()
        )
        return new Disposable(() => {
            unsubscribe()
        })

    }
    return new Observable(subscribeFn)
}