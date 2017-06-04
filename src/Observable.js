import Observer from './Observer'
import Disposable from './Disposable'
export default function Observable(subscribeFn) {
    this.subscribeFn = subscribeFn
}

Observable.prototype.subscribe = function() {
    let observer, subscription
    if(arguments.length === 1 && arguments[0] instanceof Observer) { // 传入的是Observer实例
        observer = arguments[0]
    } else {
        observer = new Observer(arguments[0], arguments[1], arguments[2])
    }

    subscription = this.subscribeFn(observer)

    if(subscription instanceof Disposable) {
        observer.unsubscribeFn = function() {
            subscription.dispose()
        }
    }

    return ()=> observer.unsubscribe()
}