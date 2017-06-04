import Observable from './../../Observable'
export default function create(subscribeFn) {
    return new Observable(subscribeFn)
}