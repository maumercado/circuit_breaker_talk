const EE = require("events").EventEmitter;

class CircuitBreaker extends EE {
  constructor(fn, opts = {}) {
    super();

    if (!!CircuitBreaker.instance) {
      return CircuitBreaker.instance;
    }

    this.fn = fn;
    this.state = { isOpen: false, isHalfOpen: false, errorCount: 0 };
    this.retry = opts.retry || 10000;
    this.timeout = { value: 0, enabled: false };
    this.timeout.enabled = opts.timeout ? Boolean(opts.timeout) : false;
    this.timeout.value = opts.timeout || 0;
    this.maxError = opts.maxError || 10;
    this.maxTime = opts.maxTime || 1000;
    this.fallback =
      opts.fallback ||
      function() {
        Promise.reject(new Error("Service Currently unavailable"));
      };

    setInterval(() => {
      this.state.errorCount = 0;
    }, this.maxTime);

    setInterval(() => {
      if (this.state.isOpen) {
        this.state.isHalfOpen = true;
      }
    }, this.retry);

    CircuitBreaker.instance = this;
    return this;
  }

  shoot(...args) {
    if (this.state.isOpen && !this.state.isHalfOpen) {
      return this.fallback(...args);
    }

    return this._tryToExecute(...args);
  }

  _tryToExecute(...args) {
    const timeoutProc = [
      this.timeoutProcess(this.timeout.value),
      this.fn(...args)
    ];

    const operation = this.timeout.enabled
      ? Promise.race(timeoutProc)
      : this.fn(...args);

    return operation.then(
      val => {
        if (this.state.isHalfOpen) this._closeCircuit();
        return val;
      },
      err => {
        this.state.errorCount += 1;
        if (this.state.isHalfOpen) this.state.isHalfOpen = false;
        if (this.state.errorCount >= this.maxError) this._openCircuit();
        return Promise.reject(err);
      }
    );
  }

  timeoutProcess(time) {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Service Timed Out")), time)
    );
  }

  _closeCircuit() {
    this.state.isHalfOpen = false;
    this.state.isOpen = false;
    this.emit("closed");
  }

  _openCircuit() {
    this.state.isOpen = true;
    this.emit("open");
  }

}

module.exports = CircuitBreaker
