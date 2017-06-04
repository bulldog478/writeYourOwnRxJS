export default function Disposable(disposeFn) {
    this.disposeFn = disposeFn
}

Disposable.prototype.dispose = function() {
    if(this.disposable instanceof Disposable) {
        Disposable.dispose()
    } else {
        this.disposeFn()
    }
}