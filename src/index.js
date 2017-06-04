import createObservable from './Observable/static/create'
import createObserver from './Observer/static/create'
import interval from './observable/static/interval'


import './observable/take'

const Rx = {}

Rx.Observable = {
    create: createObservable,
    interval
}

Rx.Observer = {
    create: createObserver
}

module.exports = Rx