import Observer from './../../Observer'
export default function create(onNext, onError, onComplete) {
    return new Observer(onNext, onError, onComplete)
}