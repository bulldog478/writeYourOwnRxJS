export default function Observer(onNext, onError, onComplete) {
    this.onNext = onNext
    this.onError = onError
    this.onComplete = onComplete
    this.unsubscribed = false
}

Observer.prototype.next = function(value) {
    if(!this.unsubscribed) {
        try {
            this.onNext && this.onNext(value)
        } catch(err) {
            throw new Error(err)
        }
    }
}

Observer.prototype.error = function(err) {
    if(!this.unsubscribed) {
        try{
            this.onError && this.onError(err)
        } catch(err) {
            throw new Error(err)
        } finally {
            this.unsubscribe()
        }
        
    }
}

Observer.prototype.complete = function() {
    if(!this.unsubscribed) {
        try {
            this.onComplete && this.onComplete()
        } catch(err) {
            throw new Error(err)
        } finally {
            this.unsubscribe()
        }
    }
}

Observer.prototype.unsubscribe = function() {
    this.unsubscribed = true

    this.unsubscribeFn && this.unsubscribeFn()
}