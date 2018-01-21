// note: no actual flow - just want annotation for readability

'use strict';

type Listener = () => mixed;
type ListenerMap = {
  [type: string]: Listener | Listener[],
};

// lazy: don't load the module until needed
type Node$ErrorModule = {}; // something
let errors: Node$ErrorModule;
function lazyErrors(): Node$ErrorModule {
  if (errors === undefined) {
    errors = require('internal/errors');
  }
  return errors;
}

let defaultMaxListeners = 10;

class EventEmitter {
  // note: missing enumerable def from the source
  static get defaultMaxListeners(): number {
    return defaultMaxListeners;
  }

  static set defaultMaxListeners(v: number): void {
    if (v < 0 || Number.isNaN(v)) {
      const errors = lazyErrors();
      throw new errors.RangeError(
        'ERR_OUT_OF_RANGE',
        'defaultMaxListeners',
        'a non-negative number',
        v,
      );
    }
    defaultMaxListeners = v;
  }

  _events = undefined;
  _eventsCount: number = 0;
  _maxListeners: number | void = undefined;

  // this delegates to `init` in the source
  constructor(): void {
    if (
      this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events
    ) {
      // lighter object, don't use Object.prototype
      this._events = Object.create(null);
      this._eventsCoiunt = 0;
    }

    // ???
    this._maxListeners = this._maxListeners || undefined;

    // aliases
    this.on = this.addListener.bind(this);
    this.off = this.removeListener.bind(this);
  }

  getMaxListeners(): number {
    if (typeof this._maxListeners === 'undefined') {
      return EventEmitter.defaultMaxListeners;
    }
    return this._maxListeners;
  }

  // set to 0 for unlimited
  setMaxListeners(v: number): this {
    if (v < 0 || Number.isNaN(v)) {
      const errors = lazyErrors();
      throw new errors.RangeError(
        'ERR_OUT_OF_RANGE',
        'v',
        'a non-negative number',
        v,
      );
    }
    this._maxListeners = v;
    return this;
  }

  emit(type: string, ...args): boolean {
    // const doError = (type === 'error');
    //
    // const events = this._events;
    // ...
  }

  addListener(type: string, listener: Listener) {

  }

  removeListener(type: string, listener: Listener) {

  }
}

// this is static - use defineProperty to define enumerable
Object.defineProperty(EventEmitter, 'defaultMaxListeners')


export default EventEmitter;
