import Observable from './../../Observable'
import Disposable from './../../Disposable'
export default function interval(period) {
    let subscribeFn = (observer) => {
        let count = 0
        let intervalId = window.setInterval(() => {
            observer.next(count++)
        },period)

        return new Disposable(()=> {
            window.clearInterval(intervalId)
        })
    }
    return new Observable(subscribeFn)
}