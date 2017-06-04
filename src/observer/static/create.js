import Observer from './../../Observer.js'
export default function create(onNext, onError, onComplete) {
    return new Observer(onNext, onError, onComplete)
}