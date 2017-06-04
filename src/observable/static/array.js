import Observable from './../../Observable'
export default function array(arr) {
    const subscribeFn = observer => {
        arr.forEach(item => {
            observer.next(item)
        })
        observer.complete()
    } 
    return new Observable(subscribeFn)
}