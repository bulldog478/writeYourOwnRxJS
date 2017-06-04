(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Rx"] = factory();
	else
		root["Rx"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Observer;
function Observer(onNext, onError, onComplete) {
    this.onNext = onNext;
    this.onError = onError;
    this.onComplete = onComplete;
    this.unsubscribed = false;
}

Observer.prototype.next = function (value) {
    if (!this.unsubscribed) {
        try {
            this.onNext && this.onNext(value);
        } catch (err) {
            throw new Error(err);
        }
    }
};

Observer.prototype.error = function (err) {
    if (!this.unsubscribed) {
        try {
            this.onError && this.onError(err);
        } catch (err) {
            throw new Error(err);
        } finally {
            this.unsubscribe();
        }
    }
};

Observer.prototype.complete = function () {
    if (!this.unsubscribed) {
        try {
            this.onComplete && this.onComplete();
        } catch (err) {
            throw new Error(err);
        } finally {
            this.unsubscribe();
        }
    }
};

Observer.prototype.unsubscribe = function () {
    this.unsubscribed = true;

    this.unsubscribeFn && this.unsubscribeFn();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _Observable = __webpack_require__(5);

var _Observable2 = _interopRequireDefault(_Observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(subscribeFn) {
    return new _Observable2.default(subscribeFn);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _Observer = __webpack_require__(0);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(onNext, onError, onComplete) {
    return new _Observer2.default(onNext, onError, onComplete);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Disposable = __webpack_require__(4);

var _Disposable2 = _interopRequireDefault(_Disposable);

var _Observable = __webpack_require__(5);

var _Observable2 = _interopRequireDefault(_Observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Observable2.default.prototype.take = function (count) {
    var _this = this;

    var subscribeFn = function subscribeFn(observer) {
        var unsubscribe = _this.subscribe(function (value) {
            if (count > 0) {
                observer.next(value);
                count--;
            } else {
                observer.complete();
            }
        }, function (err) {
            return observer.error(err);
        }, function () {
            return observer.complete();
        });
        return new _Disposable2.default(function () {
            unsubscribe();
        });
    };
    return new _Observable2.default(subscribeFn);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Disposable;
function Disposable(disposeFn) {
    this.disposeFn = disposeFn;
}

Disposable.prototype.dispose = function () {
    if (this.disposable instanceof Disposable) {
        Disposable.dispose();
    } else {
        this.disposeFn();
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Observable;

var _Observer = __webpack_require__(0);

var _Observer2 = _interopRequireDefault(_Observer);

var _Disposable = __webpack_require__(4);

var _Disposable2 = _interopRequireDefault(_Disposable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Observable(subscribeFn) {
    this.subscribeFn = subscribeFn;
}

Observable.prototype.subscribe = function () {
    var observer = void 0,
        subscription = void 0;
    if (arguments.length === 1 && arguments[0] instanceof _Observer2.default) {
        // 传入的是Observer实例
        observer = arguments[0];
    } else {
        observer = new _Observer2.default(arguments[0], arguments[1], arguments[2]);
    }

    subscription = this.subscribeFn(observer);

    if (subscription instanceof _Disposable2.default) {
        observer.unsubscribeFn = function () {
            subscription.dispose();
        };
    }

    return function () {
        return observer.unsubscribe();
    };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _create = __webpack_require__(1);

var _create2 = _interopRequireDefault(_create);

var _create3 = __webpack_require__(2);

var _create4 = _interopRequireDefault(_create3);

var _interval = __webpack_require__(7);

var _interval2 = _interopRequireDefault(_interval);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rx = {};

Rx.Observable = {
    create: _create2.default,
    interval: _interval2.default
};

Rx.Observer = {
    create: _create4.default
};

module.exports = Rx;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = interval;

var _Observable = __webpack_require__(5);

var _Observable2 = _interopRequireDefault(_Observable);

var _Disposable = __webpack_require__(4);

var _Disposable2 = _interopRequireDefault(_Disposable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function interval(period) {
    var subscribeFn = function subscribeFn(observer) {
        var count = 0;
        var intervalId = window.setInterval(function () {
            observer.next(count++);
        }, period);

        return new _Disposable2.default(function () {
            window.clearInterval(intervalId);
        });
    };
    return new _Observable2.default(subscribeFn);
}

/***/ })
/******/ ]);
});