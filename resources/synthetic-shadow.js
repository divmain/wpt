/* proxy-compat-disable */
/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function invariant(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}

function isTrue$1(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function isFalse$1(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function fail(msg) {
  throw new Error(msg);
}

var assert = /*#__PURE__*/Object.freeze({
  __proto__: null,
  invariant: invariant,
  isTrue: isTrue$1,
  isFalse: isFalse$1,
  fail: fail
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const {
  assign,
  create,
  defineProperties,
  defineProperty,
  freeze,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
  getPrototypeOf,
  hasOwnProperty,
  isFrozen,
  keys,
  seal,
  setPrototypeOf
} = Object;
const {
  isArray
} = Array;
const {
  filter: ArrayFilter,
  find: ArrayFind,
  indexOf: ArrayIndexOf,
  join: ArrayJoin,
  map: ArrayMap,
  push: ArrayPush,
  reduce: ArrayReduce,
  reverse: ArrayReverse,
  slice: ArraySlice,
  splice: ArraySplice,
  unshift: ArrayUnshift,
  forEach
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt,
  replace: StringReplace,
  slice: StringSlice,
  toLowerCase: StringToLowerCase
} = String.prototype;

function isUndefined(obj) {
  return obj === undefined;
}

function isNull(obj) {
  return obj === null;
}

function isTrue(obj) {
  return obj === true;
}

function isFalse(obj) {
  return obj === false;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function isObject(obj) {
  return typeof obj === 'object';
}

const OtS = {}.toString;

function toString(obj) {
  if (obj && obj.toString) {
    // Arrays might hold objects with "null" prototype So using
    // Array.prototype.toString directly will cause an error Iterate through
    // all the items and handle individually.
    if (isArray(obj)) {
      return ArrayJoin.call(ArrayMap.call(obj, toString), ',');
    }

    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS.call(obj);
  } else {
    return obj + '';
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis


const _globalThis = /*@__PURE__*/function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }

  let _globalThis;

  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef

    _globalThis = __magic__; // @ts-ignore

    delete Object.prototype.__magic__;
  } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }

  return _globalThis;
}();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const KEY__IS_NATIVE_SHADOW_ROOT_DEFINED = '$isNativeShadowRootDefined$';
const KEY__SHADOW_RESOLVER = '$shadowResolver$';
const KEY__SHADOW_RESOLVER_PRIVATE = '$$ShadowResolverKey$$';
const KEY__SHADOW_TOKEN = '$shadowToken$';
const KEY__SHADOW_TOKEN_PRIVATE = '$$ShadowTokenKey$$';
const KEY__SYNTHETIC_MODE = '$$lwc-synthetic-mode';
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// We use this to detect symbol support in order to avoid the expensive symbol polyfill. Note that
// we can't use typeof since it will fail when transpiling.


const hasNativeSymbolSupport = /*@__PURE__*/(() => Symbol('x').toString() === 'Symbol(x)')();
/** version: 2.4.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// eslint-disable-next-line lwc-internal/no-global-node

const _Node = Node;
const nodePrototype = _Node.prototype;
const {
  DOCUMENT_POSITION_CONTAINED_BY,
  DOCUMENT_POSITION_CONTAINS,
  DOCUMENT_POSITION_PRECEDING,
  DOCUMENT_POSITION_FOLLOWING,
  ELEMENT_NODE,
  TEXT_NODE,
  CDATA_SECTION_NODE,
  PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE,
  DOCUMENT_FRAGMENT_NODE
} = _Node;
const {
  appendChild,
  cloneNode,
  compareDocumentPosition,
  insertBefore,
  removeChild,
  replaceChild,
  hasChildNodes
} = nodePrototype;
const {
  contains
} = HTMLElement.prototype;
const firstChildGetter = getOwnPropertyDescriptor(nodePrototype, 'firstChild').get;
const lastChildGetter = getOwnPropertyDescriptor(nodePrototype, 'lastChild').get;
const textContentGetter = getOwnPropertyDescriptor(nodePrototype, 'textContent').get;
const parentNodeGetter = getOwnPropertyDescriptor(nodePrototype, 'parentNode').get;
const ownerDocumentGetter = getOwnPropertyDescriptor(nodePrototype, 'ownerDocument').get;
const parentElementGetter = hasOwnProperty.call(nodePrototype, 'parentElement') ? getOwnPropertyDescriptor(nodePrototype, 'parentElement').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'parentElement').get; // IE11

const textContextSetter = getOwnPropertyDescriptor(nodePrototype, 'textContent').set;
const childNodesGetter = hasOwnProperty.call(nodePrototype, 'childNodes') ? getOwnPropertyDescriptor(nodePrototype, 'childNodes').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'childNodes').get; // IE11

const isConnected = hasOwnProperty.call(nodePrototype, 'isConnected') ? getOwnPropertyDescriptor(nodePrototype, 'isConnected').get : function () {
  const doc = ownerDocumentGetter.call(this); // IE11

  return (// if doc is null, it means `this` is actually a document instance which
    // is always connected
    doc === null || (compareDocumentPosition.call(doc, this) & DOCUMENT_POSITION_CONTAINED_BY) !== 0
  );
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  getAttribute,
  getBoundingClientRect,
  getElementsByTagName: getElementsByTagName$1,
  getElementsByTagNameNS: getElementsByTagNameNS$1,
  hasAttribute,
  querySelector,
  querySelectorAll: querySelectorAll$1,
  removeAttribute,
  setAttribute
} = Element.prototype;
const attachShadow$1 = hasOwnProperty.call(Element.prototype, 'attachShadow') ? Element.prototype.attachShadow : () => {
  throw new TypeError('attachShadow() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill and use Lightning Web Components');
};
const childElementCountGetter = getOwnPropertyDescriptor(Element.prototype, 'childElementCount').get;
const firstElementChildGetter = getOwnPropertyDescriptor(Element.prototype, 'firstElementChild').get;
const lastElementChildGetter = getOwnPropertyDescriptor(Element.prototype, 'lastElementChild').get;
const innerTextDescriptor = getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText');
const innerTextGetter = innerTextDescriptor ? innerTextDescriptor.get : null;
const innerTextSetter = innerTextDescriptor ? innerTextDescriptor.set : null; // Note: Firefox does not have outerText, https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/outerText

const outerTextDescriptor = getOwnPropertyDescriptor(HTMLElement.prototype, 'outerText');
const outerTextGetter = outerTextDescriptor ? outerTextDescriptor.get : null;
const outerTextSetter = outerTextDescriptor ? outerTextDescriptor.set : null;
const innerHTMLDescriptor = hasOwnProperty.call(Element.prototype, 'innerHTML') ? getOwnPropertyDescriptor(Element.prototype, 'innerHTML') : getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML'); // IE11

const innerHTMLGetter = innerHTMLDescriptor.get;
const innerHTMLSetter = innerHTMLDescriptor.set;
const outerHTMLDescriptor = hasOwnProperty.call(Element.prototype, 'outerHTML') ? getOwnPropertyDescriptor(Element.prototype, 'outerHTML') : getOwnPropertyDescriptor(HTMLElement.prototype, 'outerHTML'); // IE11

const outerHTMLGetter = outerHTMLDescriptor.get;
const outerHTMLSetter = outerHTMLDescriptor.set;
const tagNameGetter = getOwnPropertyDescriptor(Element.prototype, 'tagName').get;
const tabIndexDescriptor = getOwnPropertyDescriptor(HTMLElement.prototype, 'tabIndex');
const tabIndexGetter = tabIndexDescriptor.get;
const tabIndexSetter = tabIndexDescriptor.set;
const matches = hasOwnProperty.call(Element.prototype, 'matches') ? Element.prototype.matches : Element.prototype.msMatchesSelector; // IE11

const childrenGetter = hasOwnProperty.call(Element.prototype, 'children') ? getOwnPropertyDescriptor(Element.prototype, 'children').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'children').get; // IE11
// for IE11, access from HTMLElement
// for all other browsers access the method from the parent Element interface

const {
  getElementsByClassName: getElementsByClassName$1
} = HTMLElement.prototype;
const shadowRootGetter = hasOwnProperty.call(Element.prototype, 'shadowRoot') ? getOwnPropertyDescriptor(Element.prototype, 'shadowRoot').get : () => null;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let assignedNodes, assignedElements;

if (typeof HTMLSlotElement !== 'undefined') {
  assignedNodes = HTMLSlotElement.prototype.assignedNodes;
  assignedElements = HTMLSlotElement.prototype.assignedElements;
} else {
  assignedNodes = () => {
    throw new TypeError("assignedNodes() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
  };

  assignedElements = () => {
    throw new TypeError("assignedElements() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
  };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const eventTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'target').get;
const eventCurrentTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'currentTarget').get;
const focusEventRelatedTargetGetter = getOwnPropertyDescriptor(FocusEvent.prototype, 'relatedTarget').get; // IE does not implement composedPath() but that's ok because we only use this instead of our
// composedPath() polyfill when dealing with native shadow DOM components in mixed mode. Defaulting
// to a NOOP just to be safe, even though this is almost guaranteed to be defined such a scenario.

const composedPath = hasOwnProperty.call(Event.prototype, 'composedPath') ? Event.prototype.composedPath : () => [];

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DocumentPrototypeActiveElement = getOwnPropertyDescriptor(Document.prototype, 'activeElement').get;
const elementFromPoint = hasOwnProperty.call(Document.prototype, 'elementFromPoint') ? Document.prototype.elementFromPoint : Document.prototype.msElementFromPoint; // IE11

const elementsFromPoint = hasOwnProperty.call(Document.prototype, 'elementsFromPoint') ? Document.prototype.elementsFromPoint : Document.prototype.msElementsFromPoint; // IE11
// defaultView can be null when a document has no browsing context. For example, the owner document
// of a node in a template doesn't have a default view: https://jsfiddle.net/hv9z0q5a/

const defaultViewGetter = getOwnPropertyDescriptor(Document.prototype, 'defaultView').get;
const {
  createComment,
  querySelectorAll,
  getElementById,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagNameNS
} = Document.prototype; // In Firefox v57 and lower, getElementsByName is defined on HTMLDocument.prototype
// In all other browsers have the method on Document.prototype

const {
  getElementsByName
} = HTMLDocument.prototype;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  addEventListener: windowAddEventListener,
  removeEventListener: windowRemoveEventListener,
  getComputedStyle: windowGetComputedStyle,
  getSelection: windowGetSelection
} = window;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// There is code in the polyfills that requires access to the unpatched
// Mutation Observer constructor, this the code for that.
// Eventually, the polyfill should uses the patched version, and this file can be removed.
const MO = MutationObserver;
const MutationObserverObserve = MO.prototype.observe;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let NativeShadowRoot = null;

if (typeof ShadowRoot !== 'undefined') {
  NativeShadowRoot = ShadowRoot;
}

const isNativeShadowRootDefined = !isNull(NativeShadowRoot);
const isInstanceOfNativeShadowRoot = isNull(NativeShadowRoot) ? () => false : node => node instanceof NativeShadowRoot;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect$4 () {
  return typeof HTMLSlotElement === 'undefined';
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  createElement
} = Document.prototype;
const CHAR_S = 115;
const CHAR_L = 108;
const CHAR_O = 111;
const CHAR_T = 116;
function apply$4() {
  // IE11 does not have this element definition
  // we don't care much about the construction phase, just the prototype
  class HTMLSlotElement {} // prototype inheritance dance


  setPrototypeOf(HTMLSlotElement, HTMLElement.constructor);
  setPrototypeOf(HTMLSlotElement.prototype, HTMLElement.prototype);
  Window.prototype.HTMLSlotElement = HTMLSlotElement; // IE11 doesn't have HTMLSlotElement, in which case we
  // need to patch Document.prototype.createElement to remap `slot`
  // elements to the right prototype

  defineProperty(Document.prototype, 'createElement', {
    value: function (tagName, _options) {
      const elm = createElement.apply(this, ArraySlice.call(arguments));

      if (tagName.length === 4 && StringCharCodeAt.call(tagName, 0) === CHAR_S && StringCharCodeAt.call(tagName, 1) === CHAR_L && StringCharCodeAt.call(tagName, 2) === CHAR_O && StringCharCodeAt.call(tagName, 3) === CHAR_T) {
        // the new element is the `slot`, resetting the proto chain
        // the new newly created global HTMLSlotElement.prototype
        setPrototypeOf(elm, HTMLSlotElement.prototype);
      }

      return elm;
    }
  });
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (detect$4()) {
  apply$4();
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function getOwnerDocument(node) {
  const doc = ownerDocumentGetter.call(node); // if doc is null, it means `this` is actually a document instance

  return doc === null ? node : doc;
}
function getOwnerWindow(node) {
  const doc = getOwnerDocument(node);
  const win = defaultViewGetter.call(doc);

  if (win === null) {
    // this method should never be called with a node that is not part
    // of a qualifying connected node.
    throw new TypeError();
  }

  return win;
}
let skipGlobalPatching; // TODO [#1222]: remove global bypass

function isGlobalPatchingSkipped(node) {
  // we lazily compute this value instead of doing it during evaluation, this helps
  // for apps that are setting this after the engine code is evaluated.
  if (isUndefined(skipGlobalPatching)) {
    const ownerDocument = getOwnerDocument(node);
    skipGlobalPatching = ownerDocument.body && getAttribute.call(ownerDocument.body, 'data-global-patching-bypass') === 'temporary-bypass';
  }

  return isTrue(skipGlobalPatching);
}
function arrayFromCollection(collection) {
  const size = collection.length;
  const cloned = [];

  if (size > 0) {
    for (let i = 0; i < size; i++) {
      cloned[i] = collection[i];
    }
  }

  return cloned;
}

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

if (!_globalThis.lwcRuntimeFlags) {
  Object.defineProperty(_globalThis, 'lwcRuntimeFlags', {
    value: create(null)
  });
}

const runtimeFlags = _globalThis.lwcRuntimeFlags;
/** version: 2.4.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const eventTargetPrototype = typeof EventTarget !== 'undefined' ? EventTarget.prototype : _Node.prototype;
const {
  addEventListener,
  dispatchEvent,
  removeEventListener
} = eventTargetPrototype;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const EventListenerMap = new WeakMap();
const ComposedPathMap = new WeakMap();

function isEventListenerOrEventListenerObject(fnOrObj) {
  return isFunction(fnOrObj) || isObject(fnOrObj) && !isNull(fnOrObj) && isFunction(fnOrObj.handleEvent);
}

function shouldInvokeListener(event, target, currentTarget) {
  // Subsequent logic assumes that `currentTarget` must be contained in the composed path for the listener to be
  // invoked, but this is not always the case. `composedPath()` will sometimes return an empty array, even when the
  // listener should be invoked (e.g., a disconnected instance of EventTarget, an instance of XMLHttpRequest, etc).
  if (target === currentTarget) {
    return true;
  }

  let composedPath = ComposedPathMap.get(event);

  if (isUndefined(composedPath)) {
    composedPath = event.composedPath();
    ComposedPathMap.set(event, composedPath);
  }

  return composedPath.includes(currentTarget);
}
function getEventListenerWrapper(fnOrObj) {
  if (!isEventListenerOrEventListenerObject(fnOrObj)) {
    return fnOrObj;
  }

  let wrapperFn = EventListenerMap.get(fnOrObj);

  if (isUndefined(wrapperFn)) {
    wrapperFn = function (event) {
      // This function is invoked from an event listener and currentTarget is always defined.
      const currentTarget = eventCurrentTargetGetter.call(event);

      if ("production" !== 'production') {
        assert.invariant(isFalse(isHostElement(currentTarget)), 'This routine should not be used to wrap event listeners for host elements and shadow roots.');
      }

      const {
        composed
      } = event;
      let shouldInvoke;

      if (runtimeFlags.ENABLE_NON_COMPOSED_EVENTS_LEAKAGE) {
        shouldInvoke = !(eventToShadowRootMap.has(event) && isFalse(composed));
      } else {
        const actualTarget = getActualTarget(event);
        shouldInvoke = shouldInvokeListener(event, actualTarget, currentTarget);
      }

      if (!shouldInvoke) {
        return;
      }

      return isFunction(fnOrObj) ? fnOrObj.call(this, event) : fnOrObj.handleEvent && fnOrObj.handleEvent(event);
    };

    EventListenerMap.set(fnOrObj, wrapperFn);
  }

  return wrapperFn;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const eventToContextMap = new WeakMap();

function isChildNode(root, node) {
  return !!(compareDocumentPosition.call(root, node) & DOCUMENT_POSITION_CONTAINED_BY);
}

const GET_ROOT_NODE_CONFIG_FALSE = {
  composed: false
};

function getRootNodeHost(node, options) {
  let rootNode = node.getRootNode(options); // is SyntheticShadowRootInterface

  if ('mode' in rootNode && 'delegatesFocus' in rootNode) {
    rootNode = getHost(rootNode);
  }

  return rootNode;
}

const customElementToWrappedListeners = new WeakMap();

function getEventMap(elm) {
  let listenerInfo = customElementToWrappedListeners.get(elm);

  if (isUndefined(listenerInfo)) {
    listenerInfo = create(null);
    customElementToWrappedListeners.set(elm, listenerInfo);
  }

  return listenerInfo;
}
/**
 * Events dispatched on shadow roots actually end up being dispatched on their hosts. This means that the event.target
 * property of events dispatched on shadow roots always resolve to their host. This function understands this
 * abstraction and properly returns a reference to the shadow root when appropriate.
 */


function getActualTarget(event) {
  var _a;

  return (_a = eventToShadowRootMap.get(event)) !== null && _a !== void 0 ? _a : eventTargetGetter.call(event);
}
const shadowRootEventListenerMap = new WeakMap();

function getWrappedShadowRootListener(listener) {
  if (!isFunction(listener)) {
    throw new TypeError(); // avoiding problems with non-valid listeners
  }

  let shadowRootWrappedListener = shadowRootEventListenerMap.get(listener);

  if (isUndefined(shadowRootWrappedListener)) {
    shadowRootWrappedListener = function (event) {
      // currentTarget is always defined inside an event listener
      let currentTarget = eventCurrentTargetGetter.call(event); // If currentTarget is not an instance of a native shadow root then we're dealing with a
      // host element whose synthetic shadow root must be accessed via getShadowRoot().

      if (!isInstanceOfNativeShadowRoot(currentTarget)) {
        currentTarget = getShadowRoot(currentTarget);
      }

      let shouldInvoke;

      if (runtimeFlags.ENABLE_NON_COMPOSED_EVENTS_LEAKAGE) {
        shouldInvoke = shouldInvokeShadowRootListener(event);
      } else {
        const actualTarget = getActualTarget(event);
        shouldInvoke = shouldInvokeListener(event, actualTarget, currentTarget);
      }

      if (shouldInvoke) {
        listener.call(currentTarget, event);
      }
    };

    shadowRootWrappedListener.placement = 1
    /* SHADOW_ROOT_LISTENER */
    ;
    shadowRootEventListenerMap.set(listener, shadowRootWrappedListener);
  }

  return shadowRootWrappedListener;
}

const customElementEventListenerMap = new WeakMap();

function getWrappedCustomElementListener(listener) {
  if (!isFunction(listener)) {
    throw new TypeError(); // avoiding problems with non-valid listeners
  }

  let customElementWrappedListener = customElementEventListenerMap.get(listener);

  if (isUndefined(customElementWrappedListener)) {
    customElementWrappedListener = function (event) {
      // currentTarget is always defined inside an event listener
      const currentTarget = eventCurrentTargetGetter.call(event);
      let shouldInvoke;

      if (runtimeFlags.ENABLE_NON_COMPOSED_EVENTS_LEAKAGE) {
        shouldInvoke = shouldInvokeCustomElementListener(event);
      } else {
        const actualTarget = getActualTarget(event);
        shouldInvoke = shouldInvokeListener(event, actualTarget, currentTarget);
      }

      if (shouldInvoke) {
        listener.call(currentTarget, event);
      }
    };

    customElementWrappedListener.placement = 0
    /* CUSTOM_ELEMENT_LISTENER */
    ;
    customElementEventListenerMap.set(listener, customElementWrappedListener);
  }

  return customElementWrappedListener;
}

function domListener(evt) {
  let immediatePropagationStopped = false;
  let propagationStopped = false;
  const {
    type,
    stopImmediatePropagation,
    stopPropagation
  } = evt; // currentTarget is always defined

  const currentTarget = eventCurrentTargetGetter.call(evt);
  const listenerMap = getEventMap(currentTarget);
  const listeners = listenerMap[type]; // it must have listeners at this point

  defineProperty(evt, 'stopImmediatePropagation', {
    value() {
      immediatePropagationStopped = true;
      stopImmediatePropagation.call(evt);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty(evt, 'stopPropagation', {
    value() {
      propagationStopped = true;
      stopPropagation.call(evt);
    },

    writable: true,
    enumerable: true,
    configurable: true
  }); // in case a listener adds or removes other listeners during invocation

  const bookkeeping = ArraySlice.call(listeners);

  function invokeListenersByPlacement(placement) {
    forEach.call(bookkeeping, listener => {
      if (isFalse(immediatePropagationStopped) && listener.placement === placement) {
        // making sure that the listener was not removed from the original listener queue
        if (ArrayIndexOf.call(listeners, listener) !== -1) {
          // all handlers on the custom element should be called with undefined 'this'
          listener.call(undefined, evt);
        }
      }
    });
  }

  eventToContextMap.set(evt, 1
  /* SHADOW_ROOT_LISTENER */
  );
  invokeListenersByPlacement(1
  /* SHADOW_ROOT_LISTENER */
  );

  if (isFalse(immediatePropagationStopped) && isFalse(propagationStopped)) {
    // doing the second iteration only if the first one didn't interrupt the event propagation
    eventToContextMap.set(evt, 0
    /* CUSTOM_ELEMENT_LISTENER */
    );
    invokeListenersByPlacement(0
    /* CUSTOM_ELEMENT_LISTENER */
    );
  }

  eventToContextMap.set(evt, 2
  /* UNKNOWN_LISTENER */
  );
}

function attachDOMListener(elm, type, wrappedListener) {
  const listenerMap = getEventMap(elm);
  let cmpEventHandlers = listenerMap[type];

  if (isUndefined(cmpEventHandlers)) {
    cmpEventHandlers = listenerMap[type] = [];
  } // Prevent identical listeners from subscribing to the same event type.
  // TODO [#1824]: Options will also play a factor when we introduce support for them (#1824).


  if (ArrayIndexOf.call(cmpEventHandlers, wrappedListener) !== -1) {
    return;
  } // only add to DOM if there is no other listener on the same placement yet


  if (cmpEventHandlers.length === 0) {
    // super.addEventListener() - this will not work on
    addEventListener.call(elm, type, domListener);
  }

  ArrayPush.call(cmpEventHandlers, wrappedListener);
}

function detachDOMListener(elm, type, wrappedListener) {
  const listenerMap = getEventMap(elm);
  let p;
  let listeners;

  if (!isUndefined(listeners = listenerMap[type]) && (p = ArrayIndexOf.call(listeners, wrappedListener)) !== -1) {
    ArraySplice.call(listeners, p, 1); // only remove from DOM if there is no other listener on the same placement

    if (listeners.length === 0) {
      removeEventListener.call(elm, type, domListener);
    }
  }
}

function shouldInvokeCustomElementListener(event) {
  const {
    composed
  } = event;

  if (isTrue(composed)) {
    // Listeners on host elements should always be invoked for {composed: true} events.
    return true;
  } // If this {composed: false} event was dispatched on any root.


  if (eventToShadowRootMap.has(event)) {
    return false;
  }

  const target = eventTargetGetter.call(event);
  const currentTarget = eventCurrentTargetGetter.call(event); // If this {composed: false} event was dispatched on the current target host.

  if (target === currentTarget) {
    return true;
  } // At this point the event must be {bubbles: true, composed: false} and was dispatched from a
  // shadow-excluding descendant node. In this case, we only invoke the listener if the target
  // host was assigned to a slot in the composed subtree of the current target host.


  const targetHost = getRootNodeHost(target, GET_ROOT_NODE_CONFIG_FALSE);
  const currentTargetHost = currentTarget;
  return isChildNode(targetHost, currentTargetHost);
}

function shouldInvokeShadowRootListener(event) {
  const {
    composed
  } = event;
  const target = eventTargetGetter.call(event);
  const currentTarget = eventCurrentTargetGetter.call(event); // If the event was dispatched on the host or its root.

  if (target === currentTarget) {
    // Invoke the listener if the event was dispatched directly on the root.
    return eventToShadowRootMap.get(event) === getShadowRoot(target);
  } // At this point the event is {bubbles: true} and was dispatched from a shadow-including descendant node.


  if (isTrue(composed)) {
    // Invoke the listener if the event is {composed: true}.
    return true;
  } // At this point the event must be {bubbles: true, composed: false}.


  if (isTrue(eventToShadowRootMap.has(event))) {
    // Don't invoke the listener because the event was dispatched on a descendant root.
    return false;
  }

  const targetHost = getRootNodeHost(target, GET_ROOT_NODE_CONFIG_FALSE);
  const currentTargetHost = currentTarget;
  const isCurrentTargetSlotted = isChildNode(targetHost, currentTargetHost); // At this point the event must be {bubbles: true, composed: false} and was dispatched from a
  // shadow-excluding descendant node. In this case, we only invoke the listener if the target
  // host was assigned to a slot in the composed subtree of the current target host, or the
  // descendant node is in the shadow tree of the current root.

  return isCurrentTargetSlotted || targetHost === currentTargetHost;
}

function addCustomElementEventListener(type, listener, _options) {
  if ("production" !== 'production') {
    if (!isFunction(listener)) {
      throw new TypeError(`Invalid second argument for Element.addEventListener() in ${toString(this)} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
  } // TODO [#1824]: Lift this restriction on the option parameter


  if (isFunction(listener)) {
    const wrappedListener = getWrappedCustomElementListener(listener);
    attachDOMListener(this, type, wrappedListener);
  }
}
function removeCustomElementEventListener(type, listener, _options) {
  // TODO [#1824]: Lift this restriction on the option parameter
  if (isFunction(listener)) {
    const wrappedListener = getWrappedCustomElementListener(listener);
    detachDOMListener(this, type, wrappedListener);
  }
}
function addShadowRootEventListener(sr, type, listener, _options) {
  if ("production" !== 'production') {
    if (!isFunction(listener)) {
      throw new TypeError(`Invalid second argument for ShadowRoot.addEventListener() in ${toString(sr)} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
  } // TODO [#1824]: Lift this restriction on the option parameter


  if (isFunction(listener)) {
    const elm = getHost(sr);
    const wrappedListener = getWrappedShadowRootListener(listener);
    attachDOMListener(elm, type, wrappedListener);
  }
}
function removeShadowRootEventListener(sr, type, listener, _options) {
  // TODO [#1824]: Lift this restriction on the option parameter
  if (isFunction(listener)) {
    const elm = getHost(sr);
    const wrappedListener = getWrappedShadowRootListener(listener);
    detachDOMListener(elm, type, wrappedListener);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const HostElementKey = '$$HostElementKey$$';
const ShadowedNodeKey = '$$ShadowedNodeKey$$';

function fastDefineProperty(node, propName, config) {
  const shadowedNode = node;

  if ("production" !== 'production') {
    // in dev, we are more restrictive
    defineProperty(shadowedNode, propName, config);
  } else {
    const {
      value
    } = config; // in prod, we prioritize performance

    shadowedNode[propName] = value;
  }
}

function setNodeOwnerKey(node, value) {
  fastDefineProperty(node, HostElementKey, {
    value,
    configurable: true
  });
}
function setNodeKey(node, value) {
  fastDefineProperty(node, ShadowedNodeKey, {
    value
  });
}
function getNodeOwnerKey(node) {
  return node[HostElementKey];
}
function getNodeNearestOwnerKey(node) {
  let host = node;
  let hostKey; // search for the first element with owner identity (just in case of manually inserted elements)

  while (!isNull(host)) {
    hostKey = getNodeOwnerKey(host);

    if (!isUndefined(hostKey)) {
      return hostKey;
    }

    host = parentNodeGetter.call(host);
  }
}
function getNodeKey(node) {
  return node[ShadowedNodeKey];
}
/**
 * This function does not traverse up for performance reasons, but is sufficient for most use
 * cases. If we need to traverse up and verify those nodes that don't have owner key, use
 * isNodeDeepShadowed instead.
 */

function isNodeShadowed(node) {
  return !isUndefined(getNodeOwnerKey(node));
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// inside another slot.

function foldSlotElement(slot) {
  let parent = parentElementGetter.call(slot);

  while (!isNull(parent) && isSlotElement(parent)) {
    slot = parent;
    parent = parentElementGetter.call(slot);
  }

  return slot;
}

function isNodeSlotted(host, node) {
  if ("production" !== 'production') {
    assert.invariant(host instanceof HTMLElement, `isNodeSlotted() should be called with a host as the first argument instead of ${host}`);
    assert.invariant(node instanceof _Node, `isNodeSlotted() should be called with a node as the second argument instead of ${node}`);
    assert.invariant(compareDocumentPosition.call(node, host) & DOCUMENT_POSITION_CONTAINS, `isNodeSlotted() should never be called with a node that is not a child node of ${host}`);
  }

  const hostKey = getNodeKey(host); // this routine assumes that the node is coming from a different shadow (it is not owned by the host)
  // just in case the provided node is not an element

  let currentElement = node instanceof Element ? node : parentElementGetter.call(node);

  while (!isNull(currentElement) && currentElement !== host) {
    const elmOwnerKey = getNodeNearestOwnerKey(currentElement);
    const parent = parentElementGetter.call(currentElement);

    if (elmOwnerKey === hostKey) {
      // we have reached an element inside the host's template, and only if
      // that element is an slot, then the node is considered slotted
      return isSlotElement(currentElement);
    } else if (parent === host) {
      return false;
    } else if (!isNull(parent) && getNodeNearestOwnerKey(parent) !== elmOwnerKey) {
      // we are crossing a boundary of some sort since the elm and its parent
      // have different owner key. for slotted elements, this is possible
      // if the parent happens to be a slot.
      if (isSlotElement(parent)) {
        /**
         * the slot parent might be allocated inside another slot, think of:
         * <x-root> (<--- root element)
         *    <x-parent> (<--- own by x-root)
         *       <x-child> (<--- own by x-root)
         *           <slot> (<--- own by x-child)
         *               <slot> (<--- own by x-parent)
         *                  <div> (<--- own by x-root)
         *
         * while checking if x-parent has the div slotted, we need to traverse
         * up, but when finding the first slot, we skip that one in favor of the
         * most outer slot parent before jumping into its corresponding host.
         */
        currentElement = getNodeOwner(foldSlotElement(parent));

        if (!isNull(currentElement)) {
          if (currentElement === host) {
            // the slot element is a top level element inside the shadow
            // of a host that was allocated into host in question
            return true;
          } else if (getNodeNearestOwnerKey(currentElement) === hostKey) {
            // the slot element is an element inside the shadow
            // of a host that was allocated into host in question
            return true;
          }
        }
      } else {
        return false;
      }
    } else {
      currentElement = parent;
    }
  }

  return false;
}

function getNodeOwner(node) {
  if (!(node instanceof _Node)) {
    return null;
  }

  const ownerKey = getNodeNearestOwnerKey(node);

  if (isUndefined(ownerKey)) {
    return null;
  }

  let nodeOwner = node; // At this point, node is a valid node with owner identity, now we need to find the owner node
  // search for a custom element with a VM that owns the first element with owner identity attached to it

  while (!isNull(nodeOwner) && getNodeKey(nodeOwner) !== ownerKey) {
    nodeOwner = parentNodeGetter.call(nodeOwner);
  }

  if (isNull(nodeOwner)) {
    return null;
  }

  return nodeOwner;
}
function isSyntheticSlotElement(node) {
  return isSlotElement(node) && isNodeShadowed(node);
}
function isSlotElement(node) {
  return node instanceof HTMLSlotElement;
}
function isNodeOwnedBy(owner, node) {
  if ("production" !== 'production') {
    assert.invariant(owner instanceof HTMLElement, `isNodeOwnedBy() should be called with an element as the first argument instead of ${owner}`);
    assert.invariant(node instanceof _Node, `isNodeOwnedBy() should be called with a node as the second argument instead of ${node}`);
    assert.invariant(compareDocumentPosition.call(node, owner) & DOCUMENT_POSITION_CONTAINS, `isNodeOwnedBy() should never be called with a node that is not a child node of ${owner}`);
  }

  const ownerKey = getNodeNearestOwnerKey(node);
  return isUndefined(ownerKey) || getNodeKey(owner) === ownerKey;
}
function shadowRootChildNodes(root) {
  const elm = getHost(root);
  return getAllMatches(elm, arrayFromCollection(childNodesGetter.call(elm)));
}
function getAllSlottedMatches(host, nodeList) {
  const filteredAndPatched = [];

  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];

    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
      ArrayPush.call(filteredAndPatched, node);
    }
  }

  return filteredAndPatched;
}
function getFirstSlottedMatch(host, nodeList) {
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];

    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
      return node;
    }
  }

  return null;
}
function getAllMatches(owner, nodeList) {
  const filteredAndPatched = [];

  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];
    const isOwned = isNodeOwnedBy(owner, node);

    if (isOwned) {
      // Patch querySelector, querySelectorAll, etc
      // if element is owned by VM
      ArrayPush.call(filteredAndPatched, node);
    }
  }

  return filteredAndPatched;
}
function getFirstMatch(owner, nodeList) {
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    if (isNodeOwnedBy(owner, nodeList[i])) {
      return nodeList[i];
    }
  }

  return null;
}
function shadowRootQuerySelector(root, selector) {
  const elm = getHost(root);
  const nodeList = arrayFromCollection(querySelectorAll$1.call(elm, selector));
  return getFirstMatch(elm, nodeList);
}
function shadowRootQuerySelectorAll(root, selector) {
  const elm = getHost(root);
  const nodeList = querySelectorAll$1.call(elm, selector);
  return getAllMatches(elm, arrayFromCollection(nodeList));
}
function getFilteredChildNodes(node) {
  if (!isHostElement(node) && !isSlotElement(node)) {
    // regular element - fast path
    const children = childNodesGetter.call(node);
    return arrayFromCollection(children);
  }

  if (isHostElement(node)) {
    // we need to get only the nodes that were slotted
    const slots = arrayFromCollection(querySelectorAll$1.call(node, 'slot'));
    const resolver = getShadowRootResolver(getShadowRoot(node)); // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch

    return ArrayReduce.call(slots, (seed, slot) => {
      if (resolver === getShadowRootResolver(slot)) {
        ArrayPush.apply(seed, getFilteredSlotAssignedNodes(slot));
      }

      return seed;
    }, []);
  } else {
    // slot element
    const children = arrayFromCollection(childNodesGetter.call(node));
    const resolver = getShadowRootResolver(node);
    return ArrayFilter.call(children, child => resolver === getShadowRootResolver(child));
  }
}
function getFilteredSlotAssignedNodes(slot) {
  const owner = getNodeOwner(slot);

  if (isNull(owner)) {
    return [];
  }

  const childNodes = arrayFromCollection(childNodesGetter.call(slot));
  return ArrayFilter.call(childNodes, child => !isNodeShadowed(child) || !isNodeOwnedBy(owner, child));
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getTextContent(node) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      {
        const childNodes = getFilteredChildNodes(node);
        let content = '';

        for (let i = 0, len = childNodes.length; i < len; i += 1) {
          const currentNode = childNodes[i];

          if (currentNode.nodeType !== COMMENT_NODE) {
            content += getTextContent(currentNode);
          }
        }

        return content;
      }

    default:
      return node.nodeValue;
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const Items$1 = new WeakMap();

function StaticNodeList() {
  throw new TypeError('Illegal constructor');
}

StaticNodeList.prototype = create(NodeList.prototype, {
  constructor: {
    writable: true,
    configurable: true,
    value: StaticNodeList
  },
  item: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(index) {
      return this[index];
    }

  },
  length: {
    enumerable: true,
    configurable: true,

    get() {
      return Items$1.get(this).length;
    }

  },
  // Iterator protocol
  forEach: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(cb, thisArg) {
      forEach.call(Items$1.get(this), cb, thisArg);
    }

  },
  entries: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return ArrayMap.call(Items$1.get(this), (v, i) => [i, v]);
    }

  },
  keys: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return ArrayMap.call(Items$1.get(this), (_v, i) => i);
    }

  },
  values: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return Items$1.get(this);
    }

  },
  [Symbol.iterator]: {
    writable: true,
    configurable: true,

    value() {
      let nextIndex = 0;
      return {
        next: () => {
          const items = Items$1.get(this);
          return nextIndex < items.length ? {
            value: items[nextIndex++],
            done: false
          } : {
            done: true
          };
        }
      };
    }

  },
  [Symbol.toStringTag]: {
    configurable: true,

    get() {
      return 'NodeList';
    }

  },
  // IE11 doesn't support Symbol.toStringTag, in which case we
  // provide the regular toString method.
  toString: {
    writable: true,
    configurable: true,

    value() {
      return '[object NodeList]';
    }

  }
}); // prototype inheritance dance

setPrototypeOf(StaticNodeList, NodeList);
function createStaticNodeList(items) {
  const nodeList = create(StaticNodeList.prototype);
  Items$1.set(nodeList, items); // setting static indexes

  forEach.call(items, (item, index) => {
    defineProperty(nodeList, index, {
      value: item,
      enumerable: true,
      configurable: true
    });
  });
  return nodeList;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const Items = new WeakMap();

function StaticHTMLCollection() {
  throw new TypeError('Illegal constructor');
}

StaticHTMLCollection.prototype = create(HTMLCollection.prototype, {
  constructor: {
    writable: true,
    configurable: true,
    value: StaticHTMLCollection
  },
  item: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(index) {
      return this[index];
    }

  },
  length: {
    enumerable: true,
    configurable: true,

    get() {
      return Items.get(this).length;
    }

  },
  // https://dom.spec.whatwg.org/#dom-htmlcollection-nameditem-key
  namedItem: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(name) {
      if (name === '') {
        return null;
      }

      const items = Items.get(this);

      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[len];

        if (name === getAttribute.call(item, 'id') || name === getAttribute.call(item, 'name')) {
          return item;
        }
      }

      return null;
    }

  },
  [Symbol.toStringTag]: {
    configurable: true,

    get() {
      return 'HTMLCollection';
    }

  },
  // IE11 doesn't support Symbol.toStringTag, in which case we
  // provide the regular toString method.
  toString: {
    writable: true,
    configurable: true,

    value() {
      return '[object HTMLCollection]';
    }

  }
}); // prototype inheritance dance

setPrototypeOf(StaticHTMLCollection, HTMLCollection);
function createStaticHTMLCollection(items) {
  const collection = create(StaticHTMLCollection.prototype);
  Items.set(collection, items); // setting static indexes

  forEach.call(items, (item, index) => {
    defineProperty(collection, index, {
      value: item,
      enumerable: true,
      configurable: true
    });
  });
  return collection;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getInnerHTML(node) {
  let s = '';
  const childNodes = getFilteredChildNodes(node);

  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    s += getOuterHTML(childNodes[i]);
  }

  return s;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const escapeAttrRegExp = /[&\u00A0"]/g;
const escapeDataRegExp = /[&\u00A0<>]/g;
const {
  replace,
  toLowerCase
} = String.prototype;

function escapeReplace(c) {
  switch (c) {
    case '&':
      return '&amp;';

    case '<':
      return '&lt;';

    case '>':
      return '&gt;';

    case '"':
      return '&quot;';

    case '\u00A0':
      return '&nbsp;';

    default:
      return '';
  }
}

function escapeAttr(s) {
  return replace.call(s, escapeAttrRegExp, escapeReplace);
}

function escapeData(s) {
  return replace.call(s, escapeDataRegExp, escapeReplace);
} // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


const voidElements = new Set(['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
const plaintextParents = new Set(['STYLE', 'SCRIPT', 'XMP', 'IFRAME', 'NOEMBED', 'NOFRAMES', 'PLAINTEXT', 'NOSCRIPT']);
function getOuterHTML(node) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      {
        const {
          attributes: attrs
        } = node;
        const tagName = tagNameGetter.call(node);
        let s = '<' + toLowerCase.call(tagName);

        for (let i = 0, attr; attr = attrs[i]; i++) {
          s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
        }

        s += '>';

        if (voidElements.has(tagName)) {
          return s;
        }

        return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
      }

    case TEXT_NODE:
      {
        const {
          data,
          parentNode
        } = node;

        if (parentNode instanceof Element && plaintextParents.has(tagNameGetter.call(parentNode))) {
          return data;
        }

        return escapeData(data);
      }

    case CDATA_SECTION_NODE:
      {
        return `<!CDATA[[${node.data}]]>`;
      }

    case PROCESSING_INSTRUCTION_NODE:
      {
        return `<?${node.target} ${node.data}?>`;
      }

    case COMMENT_NODE:
      {
        return `<!--${node.data}-->`;
      }

    default:
      {
        // intentionally ignoring unknown node types
        // Note: since this routine is always invoked for childNodes
        // we can safety ignore type 9, 10 and 99 (document, fragment and doctype)
        return '';
      }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This method checks whether or not the content of the node is computed
 * based on the light-dom slotting mechanism. This applies to synthetic slot elements
 * and elements with shadow dom attached to them. It doesn't apply to native slot elements
 * because we don't want to patch the children getters for those elements.
 */

function hasMountedChildren(node) {
  return isSyntheticSlotElement(node) || isHostElement(node);
}

function getShadowParent(node, value) {
  const owner = getNodeOwner(node);

  if (value === owner) {
    // walking up via parent chain might end up in the shadow root element
    return getShadowRoot(owner);
  } else if (value instanceof Element) {
    if (getNodeNearestOwnerKey(node) === getNodeNearestOwnerKey(value)) {
      // the element and its parent node belong to the same shadow root
      return value;
    } else if (!isNull(owner) && isSlotElement(value)) {
      // slotted elements must be top level childNodes of the slot element
      // where they slotted into, but its shadowed parent is always the
      // owner of the slot.
      const slotOwner = getNodeOwner(value);

      if (!isNull(slotOwner) && isNodeOwnedBy(owner, slotOwner)) {
        // it is a slotted element, and therefore its parent is always going to be the host of the slot
        return slotOwner;
      }
    }
  }

  return null;
}

function hasChildNodesPatched() {
  return getInternalChildNodes(this).length > 0;
}

function firstChildGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  return childNodes[0] || null;
}

function lastChildGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  return childNodes[childNodes.length - 1] || null;
}

function textContentGetterPatched() {
  return getTextContent(this);
}

function textContentSetterPatched(value) {
  textContextSetter.call(this, value);
}

function parentNodeGetterPatched() {
  const value = parentNodeGetter.call(this);

  if (isNull(value)) {
    return value;
  } // TODO [#1635]: this needs optimization, maybe implementing it based on this.assignedSlot


  return getShadowParent(this, value);
}

function parentElementGetterPatched() {
  const value = parentNodeGetter.call(this);

  if (isNull(value)) {
    return null;
  }

  const parentNode = getShadowParent(this, value); // it could be that the parentNode is the shadowRoot, in which case
  // we need to return null.
  // TODO [#1635]: this needs optimization, maybe implementing it based on this.assignedSlot

  return parentNode instanceof Element ? parentNode : null;
}

function compareDocumentPositionPatched(otherNode) {
  if (this.getRootNode() === otherNode) {
    // "this" is in a shadow tree where the shadow root is the "otherNode".
    return 10; // Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING
  } else if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
    // "this" and "otherNode" belongs to 2 different shadow tree.
    return 35; // Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | Node.DOCUMENT_POSITION_PRECEDING
  } // Since "this" and "otherNode" are part of the same shadow tree we can safely rely to the native
  // Node.compareDocumentPosition implementation.


  return compareDocumentPosition.call(this, otherNode);
}

function containsPatched(otherNode) {
  if (otherNode == null || getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
    // it is from another shadow
    return false;
  }

  return (compareDocumentPosition.call(this, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
}

function cloneNodePatched(deep) {
  const clone = cloneNode.call(this, false); // Per spec, browsers only care about truthy values
  // Not strict true or false

  if (!deep) {
    return clone;
  }

  const childNodes = getInternalChildNodes(this);

  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    clone.appendChild(childNodes[i].cloneNode(true));
  }

  return clone;
}
/**
 * This method only applies to elements with a shadow or slots
 */


function childNodesGetterPatched() {
  if (isHostElement(this)) {
    const owner = getNodeOwner(this);
    const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));

    if ("production" !== 'production' && isFalse(hasNativeSymbolSupport) && isExternalChildNodeAccessorFlagOn()) {
      // inserting a comment node as the first childNode to trick the IE11
      // DevTool to show the content of the shadowRoot, this should only happen
      // in dev-mode and in IE11 (which we detect by looking at the symbol).
      // Plus it should only be in place if we know it is an external invoker.
      ArrayUnshift.call(childNodes, getIE11FakeShadowRootPlaceholder(this));
    }

    return createStaticNodeList(childNodes);
  } // nothing to do here since this does not have a synthetic shadow attached to it
  // TODO [#1636]: what about slot elements?


  return childNodesGetter.call(this);
}

const nativeGetRootNode = _Node.prototype.getRootNode;
/**
 * Get the root by climbing up the dom tree, beyond the shadow root
 * If Node.prototype.getRootNode is supported, use it
 * else, assume we are working in non-native shadow mode and climb using parentNode
 */

const getDocumentOrRootNode = !isUndefined(nativeGetRootNode) ? nativeGetRootNode : function () {
  let node = this;
  let nodeParent;

  while (!isNull(nodeParent = parentNodeGetter.call(node))) {
    node = nodeParent;
  }

  return node;
};
/**
 * Get the shadow root
 * getNodeOwner() returns the host element that owns the given node
 * Note: getNodeOwner() returns null when running in native-shadow mode.
 *  Fallback to using the native getRootNode() to discover the root node.
 *  This is because, it is not possible to inspect the node and decide if it is part
 *  of a native shadow or the synthetic shadow.
 * @param {Node} node
 */

function getNearestRoot(node) {
  const ownerNode = getNodeOwner(node);

  if (isNull(ownerNode)) {
    // we hit a wall, either we are in native shadow mode or the node is not in lwc boundary.
    return getDocumentOrRootNode.call(node);
  }

  return getShadowRoot(ownerNode);
}
/**
 * If looking for a root node beyond shadow root by calling `node.getRootNode({composed: true})`, use the original `Node.prototype.getRootNode` method
 * to return the root of the dom tree. In IE11 and Edge, Node.prototype.getRootNode is
 * [not supported](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode#Browser_compatibility). The root node is discovered by manually
 * climbing up the dom tree.
 *
 * If looking for a shadow root of a node by calling `node.getRootNode({composed: false})` or `node.getRootNode()`,
 *
 *  1. Try to identify the host element that owns the give node.
 *     i. Identify the shadow tree that the node belongs to
 *     ii. If the node belongs to a shadow tree created by engine, return the shadowRoot of the host element that owns the shadow tree
 *  2. The host identification logic returns null in two cases:
 *     i. The node does not belong to a shadow tree created by engine
 *     ii. The engine is running in native shadow dom mode
 *     If so, use the original Node.prototype.getRootNode to fetch the root node(or manually climb up the dom tree where getRootNode() is unsupported)
 *
 * _Spec_: https://dom.spec.whatwg.org/#dom-node-getrootnode
 *
 **/


function getRootNodePatched(options) {
  const composed = isUndefined(options) ? false : !!options.composed;
  return isTrue(composed) ? getDocumentOrRootNode.call(this, options) : getNearestRoot(this);
} // Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not give access to nodes beyond the immediate children.


defineProperties(_Node.prototype, {
  firstChild: {
    get() {
      if (hasMountedChildren(this)) {
        return firstChildGetterPatched.call(this);
      }

      return firstChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  lastChild: {
    get() {
      if (hasMountedChildren(this)) {
        return lastChildGetterPatched.call(this);
      }

      return lastChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  textContent: {
    get() {
      if (!runtimeFlags.ENABLE_NODE_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return textContentGetterPatched.call(this);
        }

        return textContentGetter.call(this);
      } // TODO [#1222]: remove global bypass


      if (isGlobalPatchingSkipped(this)) {
        return textContentGetter.call(this);
      }

      return textContentGetterPatched.call(this);
    },

    set: textContentSetterPatched,
    enumerable: true,
    configurable: true
  },
  parentNode: {
    get() {
      if (isNodeShadowed(this)) {
        return parentNodeGetterPatched.call(this);
      }

      const parentNode = parentNodeGetter.call(this); // Handle the case where a top level light DOM element is slotted into a synthetic
      // shadow slot.

      if (!isNull(parentNode) && isSyntheticSlotElement(parentNode)) {
        return getNodeOwner(parentNode);
      }

      return parentNode;
    },

    enumerable: true,
    configurable: true
  },
  parentElement: {
    get() {
      if (isNodeShadowed(this)) {
        return parentElementGetterPatched.call(this);
      }

      const parentElement = parentElementGetter.call(this); // Handle the case where a top level light DOM element is slotted into a synthetic
      // shadow slot.

      if (!isNull(parentElement) && isSyntheticSlotElement(parentElement)) {
        return getNodeOwner(parentElement);
      }

      return parentElement;
    },

    enumerable: true,
    configurable: true
  },
  childNodes: {
    get() {
      if (hasMountedChildren(this)) {
        return childNodesGetterPatched.call(this);
      }

      return childNodesGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  hasChildNodes: {
    value() {
      if (hasMountedChildren(this)) {
        return hasChildNodesPatched.call(this);
      }

      return hasChildNodes.call(this);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  compareDocumentPosition: {
    value(otherNode) {
      // TODO [#1222]: remove global bypass
      if (isGlobalPatchingSkipped(this)) {
        return compareDocumentPosition.call(this, otherNode);
      }

      return compareDocumentPositionPatched.call(this, otherNode);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  contains: {
    value(otherNode) {
      // 1. Node.prototype.contains() returns true if otherNode is an inclusive descendant
      //    spec: https://dom.spec.whatwg.org/#dom-node-contains
      // 2. This normalizes the behavior of this api across all browsers.
      //    In IE11, a disconnected dom element without children invoking contains() on self, returns false
      if (this === otherNode) {
        return true;
      }

      if (!runtimeFlags.ENABLE_NODE_PATCH) {
        if (otherNode == null) {
          return false;
        }

        if (isNodeShadowed(this) || isHostElement(this)) {
          return containsPatched.call(this, otherNode);
        }

        return contains.call(this, otherNode);
      } // TODO [#1222]: remove global bypass


      if (isGlobalPatchingSkipped(this)) {
        return contains.call(this, otherNode);
      }

      return containsPatched.call(this, otherNode);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  cloneNode: {
    value(deep) {
      if (!runtimeFlags.ENABLE_NODE_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return cloneNodePatched.call(this, deep);
        }

        return cloneNode.call(this, deep);
      }

      if (isTrue(deep)) {
        // TODO [#1222]: remove global bypass
        if (isGlobalPatchingSkipped(this)) {
          return cloneNode.call(this, deep);
        }

        return cloneNodePatched.call(this, deep);
      }

      return cloneNode.call(this, deep);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  getRootNode: {
    value: getRootNodePatched,
    enumerable: true,
    configurable: true,
    writable: true
  },
  isConnected: {
    enumerable: true,
    configurable: true,

    get() {
      return isConnected.call(this);
    }

  }
});
let internalChildNodeAccessorFlag = false;
/**
 * These 2 methods are providing a machinery to understand who is accessing the
 * .childNodes member property of a node. If it is used from inside the synthetic shadow
 * or from an external invoker. This helps to produce the right output in one very peculiar
 * case, the IE11 debugging comment for shadowRoot representation on the devtool.
 */

function isExternalChildNodeAccessorFlagOn() {
  return !internalChildNodeAccessorFlag;
}
const getInternalChildNodes = "production" !== 'production' && isFalse(hasNativeSymbolSupport) ? function (node) {
  internalChildNodeAccessorFlag = true;
  let childNodes;
  let error = null;

  try {
    childNodes = node.childNodes;
  } catch (e) {
    // childNodes accessor should never throw, but just in case!
    error = e;
  } finally {
    internalChildNodeAccessorFlag = false;

    if (!isNull(error)) {
      // re-throwing after restoring the state machinery for setInternalChildNodeAccessorFlag
      throw error; // eslint-disable-line no-unsafe-finally
    }
  }

  return childNodes;
} : function (node) {
  return node.childNodes;
}; // IE11 extra patches for wrong prototypes

if (hasOwnProperty.call(HTMLElement.prototype, 'contains')) {
  defineProperty(HTMLElement.prototype, 'contains', getOwnPropertyDescriptor(_Node.prototype, 'contains'));
}

if (hasOwnProperty.call(HTMLElement.prototype, 'parentElement')) {
  defineProperty(HTMLElement.prototype, 'parentElement', getOwnPropertyDescriptor(_Node.prototype, 'parentElement'));
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function getAllRootNodes(node) {
  var _a;

  const rootNodes = [];
  let currentRootNode = node.getRootNode();

  while (!isUndefined(currentRootNode)) {
    rootNodes.push(currentRootNode);
    currentRootNode = (_a = currentRootNode.host) === null || _a === void 0 ? void 0 : _a.getRootNode();
  }

  return rootNodes;
}

function fauxElementsFromPoint(context, doc, left, top) {
  const elements = elementsFromPoint.call(doc, left, top);
  const result = [];
  const rootNodes = getAllRootNodes(context); // Filter the elements array to only include those elements that are in this shadow root or in one of its
  // ancestor roots. This matches Chrome and Safari's implementation (but not Firefox's, which only includes
  // elements in the immediate shadow root: https://crbug.com/1207863#c4).

  if (!isNull(elements)) {
    // can be null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint#browser_compatibility
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (rootNodes.indexOf(element.getRootNode()) !== -1 && !isSyntheticSlotElement(element)) {
        result.push(element);
      }
    }
  }

  return result;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const InternalSlot = new WeakMap();
const {
  createDocumentFragment
} = document;
function hasInternalSlot(root) {
  return Boolean(InternalSlot.get(root));
}

function getInternalSlot(root) {
  const record = InternalSlot.get(root);

  if (isUndefined(record)) {
    throw new TypeError();
  }

  return record;
}

defineProperty(_Node.prototype, KEY__SHADOW_RESOLVER, {
  set(fn) {
    if (isUndefined(fn)) return;
    this[KEY__SHADOW_RESOLVER_PRIVATE] = fn; // TODO [#1164]: temporary propagation of the key

    setNodeOwnerKey(this, fn.nodeKey);
  },

  get() {
    return this[KEY__SHADOW_RESOLVER_PRIVATE];
  },

  configurable: true,
  enumerable: true
});
defineProperty(_globalThis, KEY__IS_NATIVE_SHADOW_ROOT_DEFINED, {
  value: isNativeShadowRootDefined
});
function getShadowRootResolver(node) {
  return node[KEY__SHADOW_RESOLVER];
}
function setShadowRootResolver(node, fn) {
  node[KEY__SHADOW_RESOLVER] = fn;
}
function isDelegatingFocus(host) {
  return getInternalSlot(host).delegatesFocus;
}
function getHost(root) {
  return getInternalSlot(root).host;
}
function getShadowRoot(elm) {
  return getInternalSlot(elm).shadowRoot;
} // Intentionally adding `Node` here in addition to `Element` since this check is harmless for nodes
// and we can avoid having to cast the type before calling this method in a few places.

function isHostElement(node) {
  return !isUndefined(InternalSlot.get(node));
}
let uid = 0;
function attachShadow(elm, options) {
  if (!isUndefined(InternalSlot.get(elm))) {
    throw new Error(`Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.`);
  }

  const {
    mode,
    delegatesFocus
  } = options; // creating a real fragment for shadowRoot instance

  const doc = getOwnerDocument(elm);
  const sr = createDocumentFragment.call(doc); // creating shadow internal record

  const record = {
    mode,
    delegatesFocus: !!delegatesFocus,
    host: elm,
    shadowRoot: sr
  };
  InternalSlot.set(sr, record);
  InternalSlot.set(elm, record);

  const shadowResolver = () => sr;

  const x = shadowResolver.nodeKey = uid++;
  setNodeKey(elm, x);
  setShadowRootResolver(sr, shadowResolver); // correcting the proto chain

  setPrototypeOf(sr, SyntheticShadowRoot.prototype);
  return sr;
}
const SyntheticShadowRootDescriptors = {
  constructor: {
    writable: true,
    configurable: true,
    value: SyntheticShadowRoot
  },
  toString: {
    writable: true,
    configurable: true,

    value() {
      return `[object ShadowRoot]`;
    }

  }
};
const ShadowRootDescriptors = {
  activeElement: {
    enumerable: true,
    configurable: true,

    get() {
      const host = getHost(this);
      const doc = getOwnerDocument(host);
      const activeElement = DocumentPrototypeActiveElement.call(doc);

      if (isNull(activeElement)) {
        return activeElement;
      }

      if ((compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) === 0) {
        return null;
      } // activeElement must be child of the host and owned by it


      let node = activeElement;

      while (!isNodeOwnedBy(host, node)) {
        // parentElement is always an element because we are talking up the tree knowing
        // that it is a child of the host.
        node = parentElementGetter.call(node);
      } // If we have a slot element here that means that we were dealing
      // with an element that was passed to one of our slots. In this
      // case, activeElement returns null.


      if (isSlotElement(node)) {
        return null;
      }

      return node;
    }

  },
  delegatesFocus: {
    configurable: true,

    get() {
      return getInternalSlot(this).delegatesFocus;
    }

  },
  elementFromPoint: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(left, top) {
      const host = getHost(this);
      const doc = getOwnerDocument(host);
      return fauxElementFromPoint(this, doc, left, top);
    }

  },
  elementsFromPoint: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(left, top) {
      const host = getHost(this);
      const doc = getOwnerDocument(host);
      return fauxElementsFromPoint(this, doc, left, top);
    }

  },
  getSelection: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      throw new Error('Disallowed method "getSelection" on ShadowRoot.');
    }

  },
  host: {
    enumerable: true,
    configurable: true,

    get() {
      return getHost(this);
    }

  },
  mode: {
    configurable: true,

    get() {
      return getInternalSlot(this).mode;
    }

  },
  styleSheets: {
    enumerable: true,
    configurable: true,

    get() {
      throw new Error();
    }

  }
};
const eventToShadowRootMap = new WeakMap();
const NodePatchDescriptors = {
  insertBefore: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(newChild, refChild) {
      insertBefore.call(getHost(this), newChild, refChild);
      return newChild;
    }

  },
  removeChild: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(oldChild) {
      removeChild.call(getHost(this), oldChild);
      return oldChild;
    }

  },
  appendChild: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(newChild) {
      appendChild.call(getHost(this), newChild);
      return newChild;
    }

  },
  replaceChild: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(newChild, oldChild) {
      replaceChild.call(getHost(this), newChild, oldChild);
      return oldChild;
    }

  },
  addEventListener: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(type, listener, options) {
      addShadowRootEventListener(this, type, listener);
    }

  },
  dispatchEvent: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(evt) {
      eventToShadowRootMap.set(evt, this); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      return dispatchEvent.apply(getHost(this), arguments);
    }

  },
  removeEventListener: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(type, listener, options) {
      removeShadowRootEventListener(this, type, listener);
    }

  },
  baseURI: {
    enumerable: true,
    configurable: true,

    get() {
      return getHost(this).baseURI;
    }

  },
  childNodes: {
    enumerable: true,
    configurable: true,

    get() {
      return createStaticNodeList(shadowRootChildNodes(this));
    }

  },
  cloneNode: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      throw new Error('Disallowed method "cloneNode" on ShadowRoot.');
    }

  },
  compareDocumentPosition: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(otherNode) {
      const host = getHost(this);

      if (this === otherNode) {
        // "this" and "otherNode" are the same shadow root.
        return 0;
      } else if (this.contains(otherNode)) {
        // "otherNode" belongs to the shadow tree where "this" is the shadow root.
        return 20; // Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING
      } else if (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) {
        // "otherNode" is in a different shadow tree contained by the shadow tree where "this" is the shadow root.
        return 37; // Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
      } else {
        // "otherNode" is in a different shadow tree that is not contained by the shadow tree where "this" is the shadow root.
        return 35; // Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
      }
    }

  },
  contains: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(otherNode) {
      if (this === otherNode) {
        return true;
      }

      const host = getHost(this); // must be child of the host and owned by it.

      return (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 && isNodeOwnedBy(host, otherNode);
    }

  },
  firstChild: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      return childNodes[0] || null;
    }

  },
  lastChild: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      return childNodes[childNodes.length - 1] || null;
    }

  },
  hasChildNodes: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      const childNodes = getInternalChildNodes(this);
      return childNodes.length > 0;
    }

  },
  isConnected: {
    enumerable: true,
    configurable: true,

    get() {
      return isConnected.call(getHost(this));
    }

  },
  nextSibling: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  previousSibling: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  nodeName: {
    enumerable: true,
    configurable: true,

    get() {
      return '#document-fragment';
    }

  },
  nodeType: {
    enumerable: true,
    configurable: true,

    get() {
      return 11; // Node.DOCUMENT_FRAGMENT_NODE
    }

  },
  nodeValue: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  ownerDocument: {
    enumerable: true,
    configurable: true,

    get() {
      return getHost(this).ownerDocument;
    }

  },
  parentElement: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  parentNode: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  textContent: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      let textContent = '';

      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        const currentNode = childNodes[i];

        if (currentNode.nodeType !== COMMENT_NODE) {
          textContent += getTextContent(currentNode);
        }
      }

      return textContent;
    },

    set(v) {
      const host = getHost(this);
      textContextSetter.call(host, v);
    }

  },
  // Since the synthetic shadow root is a detached DocumentFragment, short-circuit the getRootNode behavior
  getRootNode: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(options) {
      return !isUndefined(options) && isTrue(options.composed) ? getHost(this).getRootNode(options) : this;
    }

  }
};
const ElementPatchDescriptors = {
  innerHTML: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      let innerHTML = '';

      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        innerHTML += getOuterHTML(childNodes[i]);
      }

      return innerHTML;
    },

    set(v) {
      const host = getHost(this);
      innerHTMLSetter.call(host, v);
    }

  }
};
const ParentNodePatchDescriptors = {
  childElementCount: {
    enumerable: true,
    configurable: true,

    get() {
      return this.children.length;
    }

  },
  children: {
    enumerable: true,
    configurable: true,

    get() {
      return createStaticHTMLCollection(ArrayFilter.call(shadowRootChildNodes(this), elm => elm instanceof Element));
    }

  },
  firstElementChild: {
    enumerable: true,
    configurable: true,

    get() {
      return this.children[0] || null;
    }

  },
  lastElementChild: {
    enumerable: true,
    configurable: true,

    get() {
      const {
        children
      } = this;
      return children.item(children.length - 1) || null;
    }

  },
  getElementById: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      throw new Error('Disallowed method "getElementById" on ShadowRoot.');
    }

  },
  querySelector: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(selectors) {
      return shadowRootQuerySelector(this, selectors);
    }

  },
  querySelectorAll: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(selectors) {
      return createStaticNodeList(shadowRootQuerySelectorAll(this, selectors));
    }

  }
};
assign(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);
function SyntheticShadowRoot() {
  throw new TypeError('Illegal constructor');
}
SyntheticShadowRoot.prototype = create(DocumentFragment.prototype, SyntheticShadowRootDescriptors); // `this.shadowRoot instanceof ShadowRoot` should evaluate to true even for synthetic shadow

defineProperty(SyntheticShadowRoot, Symbol.hasInstance, {
  value: function (object) {
    // Technically we should walk up the entire prototype chain, but with SyntheticShadowRoot
    // it's reasonable to assume that no one is doing any deep subclasses here.
    return isObject(object) && !isNull(object) && (isInstanceOfNativeShadowRoot(object) || getPrototypeOf(object) === SyntheticShadowRoot.prototype);
  }
});
/**
 * This method is only intended to be used in non-production mode in IE11
 * and its role is to produce a 1-1 mapping between a shadowRoot instance
 * and a comment node that is intended to use to trick the IE11 DevTools
 * to show the content of the shadowRoot in the DOM Explorer.
 */

function getIE11FakeShadowRootPlaceholder(host) {
  const shadowRoot = getShadowRoot(host); // @ts-ignore this $$placeholder$$ is not a security issue because you must
  // have access to the shadowRoot in order to extract the fake node, which give
  // you access to the same childNodes of the shadowRoot, so, who cares.

  let c = shadowRoot.$$placeholder$$;

  if (!isUndefined(c)) {
    return c;
  }

  const doc = getOwnerDocument(host); // @ts-ignore $$placeholder$$ is fine, read the node above.

  c = shadowRoot.$$placeholder$$ = createComment.call(doc, '');
  defineProperties(c, {
    childNodes: {
      get() {
        return shadowRoot.childNodes;
      },

      enumerable: true,
      configurable: true
    },
    tagName: {
      get() {
        return `#shadow-root (${shadowRoot.mode})`;
      },

      enumerable: true,
      configurable: true
    }
  });
  return c;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function pathComposer(startNode, composed) {
  const composedPath = [];
  let startRoot;

  if (startNode instanceof Window) {
    startRoot = startNode;
  } else if (startNode instanceof _Node) {
    startRoot = startNode.getRootNode();
  } else {
    return composedPath;
  }

  let current = startNode;

  while (!isNull(current)) {
    composedPath.push(current);

    if (current instanceof Element || current instanceof Text) {
      const assignedSlot = current.assignedSlot;

      if (!isNull(assignedSlot)) {
        current = assignedSlot;
      } else {
        current = current.parentNode;
      }
    } else if ((current instanceof SyntheticShadowRoot || isInstanceOfNativeShadowRoot(current)) && (composed || current !== startRoot)) {
      current = current.host;
    } else if (current instanceof _Node) {
      current = current.parentNode;
    } else {
      // could be Window
      current = null;
    }
  }

  let doc;

  if (startNode instanceof Window) {
    doc = startNode.document;
  } else {
    doc = getOwnerDocument(startNode);
  } // event composedPath includes window when startNode's ownerRoot is document


  if (composedPath[composedPath.length - 1] === doc) {
    composedPath.push(window);
  }

  return composedPath;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

function retarget(refNode, path) {
  if (isNull(refNode)) {
    return null;
  } // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
  // shadow-including inclusive ancestor, return ANCESTOR.


  const refNodePath = pathComposer(refNode, true);
  const p$ = path;

  for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
    ancestor = p$[i];
    root = ancestor instanceof Window ? ancestor : ancestor.getRootNode();

    if (root !== lastRoot) {
      rootIdx = refNodePath.indexOf(root);
      lastRoot = root;
    }

    if (!(root instanceof SyntheticShadowRoot) || !isUndefined(rootIdx) && rootIdx > -1) {
      return ancestor;
    }
  }

  return null;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function fauxElementFromPoint(context, doc, left, top) {
  const element = elementFromPoint.call(doc, left, top);

  if (isNull(element)) {
    return element;
  }

  return retarget(context, pathComposer(element, true));
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function elemFromPoint(left, top) {
  return fauxElementFromPoint(this, this, left, top);
}

Document.prototype.elementFromPoint = elemFromPoint;

function elemsFromPoint(left, top) {
  return fauxElementsFromPoint(this, this, left, top);
}

Document.prototype.elementsFromPoint = elemsFromPoint; // Go until we reach to top of the LWC tree

defineProperty(Document.prototype, 'activeElement', {
  get() {
    let node = DocumentPrototypeActiveElement.call(this);

    if (isNull(node)) {
      return node;
    }

    while (!isUndefined(getNodeOwnerKey(node))) {
      node = parentElementGetter.call(node);

      if (isNull(node)) {
        return null;
      }
    }

    if (node.tagName === 'HTML') {
      // IE 11. Active element should never be html element
      node = this.body;
    }

    return node;
  },

  enumerable: true,
  configurable: true
}); // The following patched methods hide shadowed elements from global
// traversing mechanisms. They are simplified for performance reasons to
// filter by ownership and do not account for slotted elements. This
// compromise is fine for our synthetic shadow dom because root elements
// cannot have slotted elements.
// Another compromise here is that all these traversing methods will return
// static HTMLCollection or static NodeList. We decided that this compromise
// is not a big problem considering the amount of code that is relying on
// the liveliness of these results are rare.

defineProperty(Document.prototype, 'getElementById', {
  value() {
    const elm = getElementById.apply(this, ArraySlice.call(arguments));

    if (isNull(elm)) {
      return null;
    } // TODO [#1222]: remove global bypass


    return isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm) ? elm : null;
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty(Document.prototype, 'querySelector', {
  value() {
    const elements = arrayFromCollection(querySelectorAll.apply(this, ArraySlice.call(arguments)));
    const filtered = ArrayFind.call(elements, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return !isUndefined(filtered) ? filtered : null;
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty(Document.prototype, 'querySelectorAll', {
  value() {
    const elements = arrayFromCollection(querySelectorAll.apply(this, ArraySlice.call(arguments)));
    const filtered = ArrayFilter.call(elements, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticNodeList(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty(Document.prototype, 'getElementsByClassName', {
  value() {
    const elements = arrayFromCollection(getElementsByClassName.apply(this, ArraySlice.call(arguments)));
    const filtered = ArrayFilter.call(elements, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty(Document.prototype, 'getElementsByTagName', {
  value() {
    const elements = arrayFromCollection(getElementsByTagName.apply(this, ArraySlice.call(arguments)));
    const filtered = ArrayFilter.call(elements, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty(Document.prototype, 'getElementsByTagNameNS', {
  value() {
    const elements = arrayFromCollection(getElementsByTagNameNS.apply(this, ArraySlice.call(arguments)));
    const filtered = ArrayFilter.call(elements, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty( // In Firefox v57 and lower, getElementsByName is defined on HTMLDocument.prototype
getOwnPropertyDescriptor(HTMLDocument.prototype, 'getElementsByName') ? HTMLDocument.prototype : Document.prototype, 'getElementsByName', {
  value() {
    const elements = arrayFromCollection(getElementsByName.apply(this, ArraySlice.call(arguments)));
    const filtered = ArrayFilter.call(elements, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticNodeList(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
Object.defineProperty(window, 'ShadowRoot', {
  value: SyntheticShadowRoot,
  configurable: true,
  writable: true
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const composedDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');
function detect$3() {
  if (!composedDescriptor) {
    // No need to apply this polyfill if this client completely lacks
    // support for the composed property.
    return false;
  } // Assigning a throwaway click event here to suppress a ts error when we
  // pass clickEvent into the composed getter below. The error is:
  // [ts] Variable 'clickEvent' is used before being assigned.


  let clickEvent = new Event('click');
  const button = document.createElement('button');
  button.addEventListener('click', event => clickEvent = event);
  button.click();
  return !composedDescriptor.get.call(clickEvent);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const originalClickDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'click');

function handleClick(event) {
  Object.defineProperty(event, 'composed', {
    configurable: true,
    enumerable: true,

    get() {
      return true;
    }

  });
}

function apply$3() {
  HTMLElement.prototype.click = function () {
    addEventListener.call(this, 'click', handleClick);

    try {
      originalClickDescriptor.value.call(this);
    } finally {
      removeEventListener.call(this, 'click', handleClick);
    }
  };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (detect$3()) {
  apply$3();
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect$2() {
  return new Event('test', {
    composed: true
  }).composed !== true;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function apply$2() {
  // https://github.com/w3c/webcomponents/issues/513#issuecomment-224183937
  const composedEvents = assign(create(null), {
    beforeinput: 1,
    blur: 1,
    click: 1,
    compositionend: 1,
    compositionstart: 1,
    compositionupdate: 1,
    copy: 1,
    cut: 1,
    dblclick: 1,
    DOMActivate: 1,
    DOMFocusIn: 1,
    DOMFocusOut: 1,
    drag: 1,
    dragend: 1,
    dragenter: 1,
    dragleave: 1,
    dragover: 1,
    dragstart: 1,
    drop: 1,
    focus: 1,
    focusin: 1,
    focusout: 1,
    gotpointercapture: 1,
    input: 1,
    keydown: 1,
    keypress: 1,
    keyup: 1,
    lostpointercapture: 1,
    mousedown: 1,
    mouseenter: 1,
    mouseleave: 1,
    mousemove: 1,
    mouseout: 1,
    mouseover: 1,
    mouseup: 1,
    paste: 1,
    pointercancel: 1,
    pointerdown: 1,
    pointerenter: 1,
    pointerleave: 1,
    pointermove: 1,
    pointerout: 1,
    pointerover: 1,
    pointerup: 1,
    touchcancel: 1,
    touchend: 1,
    touchmove: 1,
    touchstart: 1,
    wheel: 1
  });
  const EventConstructor = Event; // Patch Event constructor to add the composed property on events created via new Event.

  function PatchedEvent(type, eventInitDict) {
    const event = new EventConstructor(type, eventInitDict);
    const isComposed = !!(eventInitDict && eventInitDict.composed);
    Object.defineProperties(event, {
      composed: {
        get() {
          return isComposed;
        },

        configurable: true,
        enumerable: true
      }
    });
    return event;
  }

  PatchedEvent.prototype = EventConstructor.prototype;
  PatchedEvent.AT_TARGET = EventConstructor.AT_TARGET;
  PatchedEvent.BUBBLING_PHASE = EventConstructor.BUBBLING_PHASE;
  PatchedEvent.CAPTURING_PHASE = EventConstructor.CAPTURING_PHASE;
  PatchedEvent.NONE = EventConstructor.NONE;
  window.Event = PatchedEvent; // Patch the Event prototype to add the composed property on user agent dispatched event.

  Object.defineProperties(Event.prototype, {
    composed: {
      get() {
        const {
          type
        } = this;
        return composedEvents[type] === 1;
      },

      configurable: true,
      enumerable: true
    }
  });
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (detect$2()) {
  apply$2();
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const CustomEventConstructor = CustomEvent;

function PatchedCustomEvent(type, eventInitDict) {
  const event = new CustomEventConstructor(type, eventInitDict);
  const isComposed = !!(eventInitDict && eventInitDict.composed);
  Object.defineProperties(event, {
    composed: {
      get() {
        return isComposed;
      },

      configurable: true,
      enumerable: true
    }
  });
  return event;
}

PatchedCustomEvent.prototype = CustomEventConstructor.prototype;
window.CustomEvent = PatchedCustomEvent;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (typeof ClipboardEvent !== 'undefined') {
  const isComposedType = assign(create(null), {
    copy: 1,
    cut: 1,
    paste: 1
  }); // Patch the prototype to override the composed property on user-agent dispatched events

  defineProperties(ClipboardEvent.prototype, {
    composed: {
      get() {
        const {
          type
        } = this;
        return isComposedType[type] === 1;
      },

      configurable: true,
      enumerable: true
    }
  });
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect$1() {
  // Note: when using this in mobile apps, we might have a DOM that does not support iframes.
  return typeof HTMLIFrameElement !== 'undefined';
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function apply$1() {
  // the iframe property descriptor for `contentWindow` should always be available, otherwise this method should never be called
  const desc = getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');
  const {
    get: originalGetter
  } = desc;

  desc.get = function () {
    const original = originalGetter.call(this); // If the original iframe element is not a keyed node, then do not wrap it

    if (isNull(original) || isUndefined(getNodeOwnerKey(this))) {
      return original;
    } // only if the element is an iframe inside a shadowRoot, we care about this problem
    // because in that case, the code that is accessing the iframe, is very likely code
    // compiled with proxy-compat transformation. It is true that other code without those
    // transformations might also access an iframe from within a shadowRoot, but in that,
    // case, which is more rare, we still return the wrapper, and it should work the same,
    // this part is just an optimization.


    return wrapIframeWindow(original);
  };

  defineProperty(HTMLIFrameElement.prototype, 'contentWindow', desc);
}

function wrapIframeWindow(win) {
  return {
    addEventListener() {
      // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch
      return win.addEventListener.apply(win, arguments);
    },

    blur() {
      // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch
      return win.blur.apply(win, arguments);
    },

    close() {
      // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch
      return win.close.apply(win, arguments);
    },

    focus() {
      // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch
      return win.focus.apply(win, arguments);
    },

    postMessage() {
      // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch
      return win.postMessage.apply(win, arguments);
    },

    removeEventListener() {
      // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch
      return win.removeEventListener.apply(win, arguments);
    },

    get closed() {
      return win.closed;
    },

    get frames() {
      return win.frames;
    },

    get length() {
      return win.length;
    },

    get location() {
      return win.location;
    },

    set location(value) {
      win.location = value;
    },

    get opener() {
      return win.opener;
    },

    get parent() {
      return win.parent;
    },

    get self() {
      return win.self;
    },

    get top() {
      return win.top;
    },

    get window() {
      return win.window;
    }

  }; // this is limited
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (detect$1()) {
  apply$1();
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const OriginalMutationObserver = MutationObserver;
const {
  disconnect: originalDisconnect,
  observe: originalObserve,
  takeRecords: originalTakeRecords
} = OriginalMutationObserver.prototype; // Internal fields to maintain relationships

const wrapperLookupField = '$$lwcObserverCallbackWrapper$$';
const observerLookupField = '$$lwcNodeObservers$$';
const observerToNodesMap = new WeakMap();

function getNodeObservers(node) {
  return node[observerLookupField];
}

function setNodeObservers(node, observers) {
  node[observerLookupField] = observers;
}
/**
 * Retarget the mutation record's target value to its shadowRoot
 * @param {MutationRecord} originalRecord
 */


function retargetMutationRecord(originalRecord) {
  const {
    addedNodes,
    removedNodes,
    target,
    type
  } = originalRecord;
  const retargetedRecord = create(MutationRecord.prototype);
  defineProperties(retargetedRecord, {
    addedNodes: {
      get() {
        return addedNodes;
      },

      enumerable: true,
      configurable: true
    },
    removedNodes: {
      get() {
        return removedNodes;
      },

      enumerable: true,
      configurable: true
    },
    type: {
      get() {
        return type;
      },

      enumerable: true,
      configurable: true
    },
    target: {
      get() {
        return target.shadowRoot;
      },

      enumerable: true,
      configurable: true
    }
  });
  return retargetedRecord;
}
/**
 * Utility to identify if a target node is being observed by the given observer
 * Start at the current node, if the observer is registered to observe the current node, the mutation qualifies
 * @param {MutationObserver} observer
 * @param {Node} target
 */


function isQualifiedObserver(observer, target) {
  let parentNode = target;

  while (!isNull(parentNode)) {
    const parentNodeObservers = getNodeObservers(parentNode);

    if (!isUndefined(parentNodeObservers) && (parentNodeObservers[0] === observer || // perf optimization to check for the first item is a match
    ArrayIndexOf.call(parentNodeObservers, observer) !== -1)) {
      return true;
    }

    parentNode = parentNode.parentNode;
  }

  return false;
}
/**
 * This function provides a shadow dom compliant filtered view of mutation records for a given observer.
 *
 * The key logic here is to determine if a given observer has been registered to observe any nodes
 * between the target node of a mutation record to the target's root node.
 * This function also retargets records when mutations occur directly under the shadow root
 * @param {MutationRecords[]} mutations
 * @param {MutationObserver} observer
 */


function filterMutationRecords(mutations, observer) {
  return ArrayReduce.call(mutations, (filteredSet, record) => {
    const {
      target,
      addedNodes,
      removedNodes,
      type
    } = record; // If target is an lwc host,
    // Determine if the mutations affected the host or the shadowRoot
    // Mutations affecting host: changes to slot content
    // Mutations affecting shadowRoot: changes to template content

    if (type === 'childList' && !isUndefined(getNodeKey(target))) {
      // In case of added nodes, we can climb up the tree and determine eligibility
      if (addedNodes.length > 0) {
        // Optimization: Peek in and test one node to decide if the MutationRecord qualifies
        // The remaining nodes in this MutationRecord will have the same ownerKey
        const sampleNode = addedNodes[0];

        if (isQualifiedObserver(observer, sampleNode)) {
          // If the target was being observed, then return record as-is
          // this will be the case for slot content
          const nodeObservers = getNodeObservers(target);

          if (nodeObservers && (nodeObservers[0] === observer || ArrayIndexOf.call(nodeObservers, observer) !== -1)) {
            ArrayPush.call(filteredSet, record);
          } else {
            // else, must be observing the shadowRoot
            ArrayPush.call(filteredSet, retargetMutationRecord(record));
          }
        }
      } else {
        // In the case of removed nodes, climbing the tree is not an option as the nodes are disconnected
        // We can only check if either the host or shadow root was observed and qualify the record
        const shadowRoot = target.shadowRoot;
        const sampleNode = removedNodes[0];

        if (getNodeNearestOwnerKey(target) === getNodeNearestOwnerKey(sampleNode) && // trickery: sampleNode is slot content
        isQualifiedObserver(observer, target) // use target as a close enough reference to climb up
        ) {
          ArrayPush.call(filteredSet, record);
        } else if (shadowRoot) {
          const shadowRootObservers = getNodeObservers(shadowRoot);

          if (shadowRootObservers && (shadowRootObservers[0] === observer || ArrayIndexOf.call(shadowRootObservers, observer) !== -1)) {
            ArrayPush.call(filteredSet, retargetMutationRecord(record));
          }
        }
      }
    } else {
      // Mutation happened under a root node(shadow root or document) and the decision is straighforward
      // Ascend the tree starting from target and check if observer is qualified
      if (isQualifiedObserver(observer, target)) {
        ArrayPush.call(filteredSet, record);
      }
    }

    return filteredSet;
  }, []);
}

function getWrappedCallback(callback) {
  let wrappedCallback = callback[wrapperLookupField];

  if (isUndefined(wrappedCallback)) {
    wrappedCallback = callback[wrapperLookupField] = (mutations, observer) => {
      // Filter mutation records
      const filteredRecords = filterMutationRecords(mutations, observer); // If not records are eligible for the observer, do not invoke callback

      if (filteredRecords.length === 0) {
        return;
      }

      callback.call(observer, filteredRecords, observer);
    };
  }

  return wrappedCallback;
}
/**
 * Patched MutationObserver constructor.
 * 1. Wrap the callback to filter out MutationRecords based on dom ownership
 * 2. Add a property field to track all observed targets of the observer instance
 * @param {MutationCallback} callback
 */


function PatchedMutationObserver(callback) {
  const wrappedCallback = getWrappedCallback(callback);
  const observer = new OriginalMutationObserver(wrappedCallback);
  return observer;
}

function patchedDisconnect() {
  originalDisconnect.call(this); // Clear the node to observer reference which is a strong references

  const observedNodes = observerToNodesMap.get(this);

  if (!isUndefined(observedNodes)) {
    forEach.call(observedNodes, observedNode => {
      const observers = observedNode[observerLookupField];

      if (!isUndefined(observers)) {
        const index = ArrayIndexOf.call(observers, this);

        if (index !== -1) {
          ArraySplice.call(observers, index, 1);
        }
      }
    });
    observedNodes.length = 0;
  }
}
/**
 * A single mutation observer can observe multiple nodes(target).
 * Maintain a list of all targets that the observer chooses to observe
 * @param {Node} target
 * @param {Object} options
 */


function patchedObserve(target, options) {
  let targetObservers = getNodeObservers(target); // Maintain a list of all observers that want to observe a node

  if (isUndefined(targetObservers)) {
    targetObservers = [];
    setNodeObservers(target, targetObservers);
  } // Same observer trying to observe the same node


  if (ArrayIndexOf.call(targetObservers, this) === -1) {
    ArrayPush.call(targetObservers, this);
  } // else There is more bookkeeping to do here https://dom.spec.whatwg.org/#dom-mutationobserver-observe Step #7
  // If the target is a SyntheticShadowRoot, observe the host since the shadowRoot is an empty documentFragment


  if (target instanceof SyntheticShadowRoot) {
    target = target.host;
  } // maintain a list of all nodes observed by this observer


  if (observerToNodesMap.has(this)) {
    const observedNodes = observerToNodesMap.get(this);

    if (ArrayIndexOf.call(observedNodes, target) === -1) {
      ArrayPush.call(observedNodes, target);
    }
  } else {
    observerToNodesMap.set(this, [target]);
  }

  return originalObserve.call(this, target, options);
}
/**
 * Patch the takeRecords() api to filter MutationRecords based on the observed targets
 */


function patchedTakeRecords() {
  return filterMutationRecords(originalTakeRecords.call(this), this);
}

PatchedMutationObserver.prototype = OriginalMutationObserver.prototype;
PatchedMutationObserver.prototype.disconnect = patchedDisconnect;
PatchedMutationObserver.prototype.observe = patchedObserve;
PatchedMutationObserver.prototype.takeRecords = patchedTakeRecords;
defineProperty(window, 'MutationObserver', {
  value: PatchedMutationObserver,
  configurable: true,
  writable: true
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function patchedAddEventListener$1(type, listener, optionsOrCapture) {
  if (isHostElement(this)) {
    // Typescript does not like it when you treat the `arguments` object as an array
    // @ts-ignore type-mismatch
    return addCustomElementEventListener.apply(this, arguments);
  }

  if (arguments.length < 2) {
    // Slow path, unlikely to be called frequently. We expect modern browsers to throw:
    // https://googlechrome.github.io/samples/event-listeners-mandatory-arguments/
    const args = ArraySlice.call(arguments);

    if (args.length > 1) {
      args[1] = getEventListenerWrapper(args[1]);
    } // Ignore types because we're passing through to native method
    // @ts-ignore type-mismatch


    return addEventListener.apply(this, args);
  } // Fast path. This function is optimized to avoid ArraySlice because addEventListener is called
  // very frequently, and it provides a measurable perf boost to avoid so much array cloning.


  const wrappedListener = getEventListenerWrapper(listener); // The third argument is optional, so passing in `undefined` for `optionsOrCapture` gives capture=false

  return addEventListener.call(this, type, wrappedListener, optionsOrCapture);
}

function patchedRemoveEventListener$1(_type, _listener, _optionsOrCapture) {
  if (isHostElement(this)) {
    // Typescript does not like it when you treat the `arguments` object as an array
    // @ts-ignore type-mismatch
    return removeCustomElementEventListener.apply(this, arguments);
  }

  const args = ArraySlice.call(arguments);

  if (arguments.length > 1) {
    args[1] = getEventListenerWrapper(args[1]);
  } // Ignore types because we're passing through to native method
  // @ts-ignore type-mismatch


  removeEventListener.apply(this, args); // Account for listeners that were added before this polyfill was applied
  // Typescript does not like it when you treat the `arguments` object as an array
  // @ts-ignore type-mismatch

  removeEventListener.apply(this, arguments);
}

defineProperties(eventTargetPrototype, {
  addEventListener: {
    value: patchedAddEventListener$1,
    enumerable: true,
    writable: true,
    configurable: true
  },
  removeEventListener: {
    value: patchedRemoveEventListener$1,
    enumerable: true,
    writable: true,
    configurable: true
  }
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect() {
  return typeof EventTarget === 'undefined';
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function patchedAddEventListener(_type, _listener, _options) {
  if (arguments.length > 1) {
    const args = ArraySlice.call(arguments);
    args[1] = getEventListenerWrapper(args[1]); // Ignore types because we're passing through to native method
    // @ts-ignore type-mismatch

    return windowAddEventListener.apply(this, args);
  } // Typescript does not like it when you treat the `arguments` object as an array
  // @ts-ignore type-mismatch


  return windowAddEventListener.apply(this, arguments);
}

function patchedRemoveEventListener(_type, _listener, _options) {
  if (arguments.length > 1) {
    const args = ArraySlice.call(arguments);
    args[1] = getEventListenerWrapper(args[1]); // Ignore types because we're passing through to native method
    // @ts-ignore type-mismatch

    windowRemoveEventListener.apply(this, args);
  } // Account for listeners that were added before this polyfill was applied
  // Typescript does not like it when you treat the `arguments` object as an array
  // @ts-ignore type-mismatch


  windowRemoveEventListener.apply(this, arguments);
}

function apply() {
  defineProperties(Window.prototype, {
    addEventListener: {
      value: patchedAddEventListener,
      enumerable: true,
      writable: true,
      configurable: true
    },
    removeEventListener: {
      value: patchedRemoveEventListener,
      enumerable: true,
      writable: true,
      configurable: true
    }
  });
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (detect()) {
  apply();
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function patchedCurrentTargetGetter() {
  const currentTarget = eventCurrentTargetGetter.call(this);

  if (isNull(currentTarget)) {
    return null;
  }

  if (eventToContextMap.get(this) === 1
  /* SHADOW_ROOT_LISTENER */
  ) {
    return getShadowRoot(currentTarget);
  }

  return currentTarget;
}

function patchedTargetGetter() {
  const originalTarget = eventTargetGetter.call(this);

  if (!(originalTarget instanceof _Node)) {
    return originalTarget;
  }

  const doc = getOwnerDocument(originalTarget);
  const composedPath = pathComposer(originalTarget, this.composed);
  const originalCurrentTarget = eventCurrentTargetGetter.call(this); // Handle cases where the currentTarget is null (for async events), and when an event has been
  // added to Window

  if (!(originalCurrentTarget instanceof _Node)) {
    // TODO [#1511]: Special escape hatch to support legacy behavior. Should be fixed.
    // If the event's target is being accessed async and originalTarget is not a keyed element, do not retarget
    if (isNull(originalCurrentTarget) && isUndefined(getNodeOwnerKey(originalTarget))) {
      return originalTarget;
    }

    return retarget(doc, composedPath);
  } else if (originalCurrentTarget === doc || originalCurrentTarget === doc.body) {
    // TODO [#1530]: If currentTarget is document or document.body (Third party libraries that have global event listeners)
    // and the originalTarget is not a keyed element, do not retarget
    if (isUndefined(getNodeOwnerKey(originalTarget))) {
      return originalTarget;
    }

    return retarget(doc, composedPath);
  }

  let actualCurrentTarget = originalCurrentTarget;
  let actualPath = composedPath; // Address the possibility that `currentTarget` is a shadow root

  if (isHostElement(originalCurrentTarget)) {
    const context = eventToContextMap.get(this);

    if (context === 1
    /* SHADOW_ROOT_LISTENER */
    ) {
      actualCurrentTarget = getShadowRoot(originalCurrentTarget);
    }
  } // Address the possibility that `target` is a shadow root


  if (isHostElement(originalTarget) && eventToShadowRootMap.has(this)) {
    actualPath = pathComposer(getShadowRoot(originalTarget), this.composed);
  }

  return retarget(actualCurrentTarget, actualPath);
}

function patchedComposedPathValue() {
  const originalTarget = eventTargetGetter.call(this); // Account for events with targets that are not instances of Node (e.g., when a readystatechange
  // handler is listening on an instance of XMLHttpRequest).

  if (!(originalTarget instanceof _Node)) {
    return [];
  } // If the original target is inside a native shadow root, then just call the native
  // composePath() method. The event is already retargeted and this causes our composedPath()
  // polyfill to compute the wrong value. This is only an issue when you have a native web
  // component inside an LWC component (see test in same commit) but this scenario is unlikely
  // because we don't yet support that. Workaround specifically for W-9846457. Mixed mode solution
  // will likely be more involved.


  const hasShadowRoot = Boolean(originalTarget.shadowRoot);
  const hasSyntheticShadowRootAttached = hasInternalSlot(originalTarget);

  if (hasShadowRoot && !hasSyntheticShadowRootAttached) {
    return composedPath.call(this);
  }

  const originalCurrentTarget = eventCurrentTargetGetter.call(this); // If the event has completed propagation, the composedPath should be an empty array.

  if (isNull(originalCurrentTarget)) {
    return [];
  } // Address the possibility that `target` is a shadow root


  let actualTarget = originalTarget;

  if (isHostElement(originalTarget) && eventToShadowRootMap.has(this)) {
    actualTarget = getShadowRoot(originalTarget);
  }

  return pathComposer(actualTarget, this.composed);
}

defineProperties(Event.prototype, {
  target: {
    get: patchedTargetGetter,
    enumerable: true,
    configurable: true
  },
  currentTarget: {
    get: patchedCurrentTargetGetter,
    enumerable: true,
    configurable: true
  },
  composedPath: {
    value: patchedComposedPathValue,
    writable: true,
    enumerable: true,
    configurable: true
  },
  // Non-standard but widely supported for backwards-compatibility
  srcElement: {
    get: patchedTargetGetter,
    enumerable: true,
    configurable: true
  },
  // Non-standard but implemented in Chrome and continues to exist for backwards-compatibility
  // https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/dom/events/event.idl;l=58?q=event.idl&ss=chromium
  path: {
    get: patchedComposedPathValue,
    enumerable: true,
    configurable: true
  }
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function retargetRelatedTarget(Ctor) {
  const relatedTargetGetter = getOwnPropertyDescriptor(Ctor.prototype, 'relatedTarget').get;
  defineProperty(Ctor.prototype, 'relatedTarget', {
    get() {
      const relatedTarget = relatedTargetGetter.call(this);

      if (isNull(relatedTarget)) {
        return null;
      }

      if (!(relatedTarget instanceof _Node) || !isNodeShadowed(relatedTarget)) {
        return relatedTarget;
      }

      let pointOfReference = eventCurrentTargetGetter.call(this);

      if (isNull(pointOfReference)) {
        pointOfReference = getOwnerDocument(relatedTarget);
      }

      return retarget(pointOfReference, pathComposer(relatedTarget, true));
    },

    enumerable: true,
    configurable: true
  });
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
retargetRelatedTarget(FocusEvent);

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
retargetRelatedTarget(MouseEvent);

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// "Registered observers in a node’s registered observer list have a weak
// reference to the node."
// https://dom.spec.whatwg.org/#garbage-collection

let observer;
const observerConfig = {
  childList: true
};
const SlotChangeKey = new WeakMap();

function initSlotObserver() {
  return new MO(mutations => {
    const slots = [];
    forEach.call(mutations, mutation => {
      if ("production" !== 'production') {
        assert.invariant(mutation.type === 'childList', `Invalid mutation type: ${mutation.type}. This mutation handler for slots should only handle "childList" mutations.`);
      }

      const {
        target: slot
      } = mutation;

      if (ArrayIndexOf.call(slots, slot) === -1) {
        ArrayPush.call(slots, slot);
        dispatchEvent.call(slot, new CustomEvent('slotchange'));
      }
    });
  });
}

function getFilteredSlotFlattenNodes(slot) {
  const childNodes = arrayFromCollection(childNodesGetter.call(slot)); // Typescript is inferring the wrong function type for this particular
  // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch

  return ArrayReduce.call(childNodes, (seed, child) => {
    if (child instanceof Element && isSlotElement(child)) {
      ArrayPush.apply(seed, getFilteredSlotFlattenNodes(child));
    } else {
      ArrayPush.call(seed, child);
    }

    return seed;
  }, []);
}

function assignedSlotGetterPatched() {
  const parentNode = parentNodeGetter.call(this);
  /**
   * The node is assigned to a slot if:
   *  - it has a parent and it parent its parent is a slot element
   *  - and if the slot owner key is different than the node owner key.
   *
   * When the slot and the slotted node are 2 different shadow trees, the owner keys will be
   * different. When the slot is in a shadow tree and the slotted content is a light DOM node,
   * the light DOM node doesn't have an owner key and therefor the slot owner key will be
   * different than the node owner key (always `undefined`).
   */

  if (!isNull(parentNode) && isSlotElement(parentNode) && getNodeOwnerKey(parentNode) !== getNodeOwnerKey(this)) {
    return parentNode;
  }

  return null;
}
defineProperties(HTMLSlotElement.prototype, {
  addEventListener: {
    value(type, listener, options) {
      // super.addEventListener - but that doesn't work with typescript
      HTMLElement.prototype.addEventListener.call(this, type, listener, options);

      if (type === 'slotchange' && !SlotChangeKey.get(this)) {
        SlotChangeKey.set(this, true);

        if (!observer) {
          observer = initSlotObserver();
        }

        MutationObserverObserve.call(observer, this, observerConfig);
      }
    },

    writable: true,
    enumerable: true,
    configurable: true
  },
  assignedElements: {
    value(options) {
      if (isNodeShadowed(this)) {
        const flatten = !isUndefined(options) && isTrue(options.flatten);
        const nodes = flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
        return ArrayFilter.call(nodes, node => node instanceof Element);
      } else {
        return assignedElements.apply(this, ArraySlice.call(arguments));
      }
    },

    writable: true,
    enumerable: true,
    configurable: true
  },
  assignedNodes: {
    value(options) {
      if (isNodeShadowed(this)) {
        const flatten = !isUndefined(options) && isTrue(options.flatten);
        return flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
      } else {
        return assignedNodes.apply(this, ArraySlice.call(arguments));
      }
    },

    writable: true,
    enumerable: true,
    configurable: true
  },
  name: {
    get() {
      const name = getAttribute.call(this, 'name');
      return isNull(name) ? '' : name;
    },

    set(value) {
      setAttribute.call(this, 'name', value);
    },

    enumerable: true,
    configurable: true
  },
  childNodes: {
    get() {
      if (isNodeShadowed(this)) {
        const owner = getNodeOwner(this);
        const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
        return createStaticNodeList(childNodes);
      }

      return childNodesGetter.call(this);
    },

    enumerable: true,
    configurable: true
  }
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// do not five access to nodes beyond the immediate children.

defineProperties(Text.prototype, {
  assignedSlot: {
    get: assignedSlotGetterPatched,
    enumerable: true,
    configurable: true
  }
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This methods filters out elements that are not in the same shadow root of context.
 * It does not enforce shadow dom semantics if $context is not managed by LWC
 */

function getNonPatchedFilteredArrayOfNodes(context, unfilteredNodes) {
  let filtered;
  const ownerKey = getNodeOwnerKey(context); // a node inside a shadow.

  if (!isUndefined(ownerKey)) {
    if (isHostElement(context)) {
      // element with shadowRoot attached
      const owner = getNodeOwner(context);

      if (isNull(owner)) {
        filtered = [];
      } else if (getNodeKey(context)) {
        // it is a custom element, and we should then filter by slotted elements
        filtered = getAllSlottedMatches(context, unfilteredNodes);
      } else {
        // regular element, we should then filter by ownership
        filtered = getAllMatches(owner, unfilteredNodes);
      }
    } else {
      // context is handled by lwc, using getNodeNearestOwnerKey to include manually inserted elements in the same shadow.
      filtered = ArrayFilter.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
    }
  } else if (context instanceof HTMLBodyElement) {
    // `context` is document.body which is already patched.
    filtered = ArrayFilter.call(unfilteredNodes, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
  } else {
    // `context` is outside the lwc boundary, return unfiltered list.
    filtered = ArraySlice.call(unfilteredNodes);
  }

  return filtered;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function innerHTMLGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  let innerHTML = '';

  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    innerHTML += getOuterHTML(childNodes[i]);
  }

  return innerHTML;
}

function outerHTMLGetterPatched() {
  return getOuterHTML(this);
}

function attachShadowPatched(options) {
  // To retain native behavior of the API, provide synthetic shadowRoot only when specified
  if (options[KEY__SYNTHETIC_MODE]) {
    return attachShadow(this, options);
  }

  return attachShadow$1.call(this, options);
}

function shadowRootGetterPatched() {
  if (isHostElement(this)) {
    const shadow = getShadowRoot(this);

    if (shadow.mode === 'open') {
      return shadow;
    }
  }

  return shadowRootGetter.call(this);
}

function childrenGetterPatched() {
  const owner = getNodeOwner(this);
  const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
  return createStaticHTMLCollection(ArrayFilter.call(childNodes, node => node instanceof Element));
}

function childElementCountGetterPatched() {
  return this.children.length;
}

function firstElementChildGetterPatched() {
  return this.children[0] || null;
}

function lastElementChildGetterPatched() {
  const {
    children
  } = this;
  return children.item(children.length - 1) || null;
} // Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not five access to nodes beyond the immediate children.


defineProperties(Element.prototype, {
  innerHTML: {
    get() {
      if (!runtimeFlags.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return innerHTMLGetterPatched.call(this);
        }

        return innerHTMLGetter.call(this);
      } // TODO [#1222]: remove global bypass


      if (isGlobalPatchingSkipped(this)) {
        return innerHTMLGetter.call(this);
      }

      return innerHTMLGetterPatched.call(this);
    },

    set(v) {
      innerHTMLSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  },
  outerHTML: {
    get() {
      if (!runtimeFlags.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return outerHTMLGetterPatched.call(this);
        }

        return outerHTMLGetter.call(this);
      } // TODO [#1222]: remove global bypass


      if (isGlobalPatchingSkipped(this)) {
        return outerHTMLGetter.call(this);
      }

      return outerHTMLGetterPatched.call(this);
    },

    set(v) {
      outerHTMLSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  },
  attachShadow: {
    value: attachShadowPatched,
    enumerable: true,
    writable: true,
    configurable: true
  },
  shadowRoot: {
    get: shadowRootGetterPatched,
    enumerable: true,
    configurable: true
  },
  // patched in HTMLElement if exists (IE11 is the one off here)
  children: {
    get() {
      if (hasMountedChildren(this)) {
        return childrenGetterPatched.call(this);
      }

      return childrenGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  childElementCount: {
    get() {
      if (hasMountedChildren(this)) {
        return childElementCountGetterPatched.call(this);
      }

      return childElementCountGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  firstElementChild: {
    get() {
      if (hasMountedChildren(this)) {
        return firstElementChildGetterPatched.call(this);
      }

      return firstElementChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  lastElementChild: {
    get() {
      if (hasMountedChildren(this)) {
        return lastElementChildGetterPatched.call(this);
      }

      return lastElementChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  assignedSlot: {
    get: assignedSlotGetterPatched,
    enumerable: true,
    configurable: true
  }
}); // IE11 extra patches for wrong prototypes

if (hasOwnProperty.call(HTMLElement.prototype, 'innerHTML')) {
  defineProperty(HTMLElement.prototype, 'innerHTML', getOwnPropertyDescriptor(Element.prototype, 'innerHTML'));
}

if (hasOwnProperty.call(HTMLElement.prototype, 'outerHTML')) {
  defineProperty(HTMLElement.prototype, 'outerHTML', getOwnPropertyDescriptor(Element.prototype, 'outerHTML'));
}

if (hasOwnProperty.call(HTMLElement.prototype, 'children')) {
  defineProperty(HTMLElement.prototype, 'children', getOwnPropertyDescriptor(Element.prototype, 'children'));
} // Deep-traversing patches from this point on:


function querySelectorPatched() {
  const nodeList = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice.call(arguments)));

  if (isHostElement(this)) {
    // element with shadowRoot attached
    const owner = getNodeOwner(this);

    if (isNull(owner)) {
      return null;
    } else if (getNodeKey(this)) {
      // it is a custom element, and we should then filter by slotted elements
      return getFirstSlottedMatch(this, nodeList);
    } else {
      // regular element, we should then filter by ownership
      return getFirstMatch(owner, nodeList);
    }
  } else if (isNodeShadowed(this)) {
    // element inside a shadowRoot
    const ownerKey = getNodeOwnerKey(this);

    if (!isUndefined(ownerKey)) {
      // `this` is handled by lwc, using getNodeNearestOwnerKey to include manually inserted elements in the same shadow.
      const elm = ArrayFind.call(nodeList, elm => getNodeNearestOwnerKey(elm) === ownerKey);
      return isUndefined(elm) ? null : elm;
    } else {
      if (!runtimeFlags.ENABLE_NODE_LIST_PATCH) {
        // `this` is a manually inserted element inside a shadowRoot, return the first element.
        return nodeList.length === 0 ? null : nodeList[0];
      } // Element is inside a shadow but we dont know which one. Use the
      // "nearest" owner key to filter by ownership.


      const contextNearestOwnerKey = getNodeNearestOwnerKey(this);
      const elm = ArrayFind.call(nodeList, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
      return isUndefined(elm) ? null : elm;
    }
  } else {
    if (!runtimeFlags.ENABLE_NODE_LIST_PATCH) {
      if (!(this instanceof HTMLBodyElement)) {
        const elm = nodeList[0];
        return isUndefined(elm) ? null : elm;
      }
    } // element belonging to the document


    const elm = ArrayFind.call(nodeList, // TODO [#1222]: remove global bypass
    elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(this));
    return isUndefined(elm) ? null : elm;
  }
}

function getFilteredArrayOfNodes(context, unfilteredNodes, shadowDomSemantic) {
  let filtered;

  if (isHostElement(context)) {
    // element with shadowRoot attached
    const owner = getNodeOwner(context);

    if (isNull(owner)) {
      filtered = [];
    } else if (getNodeKey(context)) {
      // it is a custom element, and we should then filter by slotted elements
      filtered = getAllSlottedMatches(context, unfilteredNodes);
    } else {
      // regular element, we should then filter by ownership
      filtered = getAllMatches(owner, unfilteredNodes);
    }
  } else if (isNodeShadowed(context)) {
    // element inside a shadowRoot
    const ownerKey = getNodeOwnerKey(context);

    if (!isUndefined(ownerKey)) {
      // context is handled by lwc, using getNodeNearestOwnerKey to include manually inserted elements in the same shadow.
      filtered = ArrayFilter.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
    } else if (shadowDomSemantic === 1
    /* Enabled */
    ) {
      // context is inside a shadow, we dont know which one.
      const contextNearestOwnerKey = getNodeNearestOwnerKey(context);
      filtered = ArrayFilter.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
    } else {
      // context is manually inserted without lwc:dom-manual and ShadowDomSemantics is off, return everything
      filtered = ArraySlice.call(unfilteredNodes);
    }
  } else {
    if (context instanceof HTMLBodyElement || shadowDomSemantic === 1
    /* Enabled */
    ) {
      // `context` is document.body or element belonging to the document with the patch enabled
      filtered = ArrayFilter.call(unfilteredNodes, // TODO [#1222]: remove global bypass
      elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
    } else {
      // `context` is outside the lwc boundary and patch is not enabled.
      filtered = ArraySlice.call(unfilteredNodes);
    }
  }

  return filtered;
} // The following patched methods hide shadowed elements from global
// traversing mechanisms. They are simplified for performance reasons to
// filter by ownership and do not account for slotted elements. This
// compromise is fine for our synthetic shadow dom because root elements
// cannot have slotted elements.
// Another compromise here is that all these traversing methods will return
// static HTMLCollection or static NodeList. We decided that this compromise
// is not a big problem considering the amount of code that is relying on
// the liveliness of these results are rare.


defineProperties(Element.prototype, {
  querySelector: {
    value: querySelectorPatched,
    writable: true,
    enumerable: true,
    configurable: true
  },
  querySelectorAll: {
    value() {
      const nodeList = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice.call(arguments)));

      if (!runtimeFlags.ENABLE_NODE_LIST_PATCH) {
        const filteredResults = getFilteredArrayOfNodes(this, nodeList, 0
        /* Disabled */
        );
        return createStaticNodeList(filteredResults);
      }

      return createStaticNodeList(getFilteredArrayOfNodes(this, nodeList, 1
      /* Enabled */
      ));
    },

    writable: true,
    enumerable: true,
    configurable: true
  }
}); // The following APIs are used directly by Jest internally so we avoid patching them during testing.

if ("production" !== 'test') {
  defineProperties(Element.prototype, {
    getElementsByClassName: {
      value() {
        const elements = arrayFromCollection(getElementsByClassName$1.apply(this, ArraySlice.call(arguments)));

        if (!runtimeFlags.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }

        const filteredResults = getFilteredArrayOfNodes(this, elements, 1
        /* Enabled */
        );
        return createStaticHTMLCollection(filteredResults);
      },

      writable: true,
      enumerable: true,
      configurable: true
    },
    getElementsByTagName: {
      value() {
        const elements = arrayFromCollection(getElementsByTagName$1.apply(this, ArraySlice.call(arguments)));

        if (!runtimeFlags.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }

        const filteredResults = getFilteredArrayOfNodes(this, elements, 1
        /* Enabled */
        );
        return createStaticHTMLCollection(filteredResults);
      },

      writable: true,
      enumerable: true,
      configurable: true
    },
    getElementsByTagNameNS: {
      value() {
        const elements = arrayFromCollection(getElementsByTagNameNS$1.apply(this, ArraySlice.call(arguments)));

        if (!runtimeFlags.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }

        const filteredResults = getFilteredArrayOfNodes(this, elements, 1
        /* Enabled */
        );
        return createStaticHTMLCollection(filteredResults);
      },

      writable: true,
      enumerable: true,
      configurable: true
    }
  });
} // IE11 extra patches for wrong prototypes


if (hasOwnProperty.call(HTMLElement.prototype, 'getElementsByClassName')) {
  defineProperty(HTMLElement.prototype, 'getElementsByClassName', getOwnPropertyDescriptor(Element.prototype, 'getElementsByClassName'));
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const FocusableSelector = `
    [contenteditable],
    [tabindex],
    a[href],
    area[href],
    audio[controls],
    button,
    iframe,
    input,
    select,
    textarea,
    video[controls]
`;
const formElementTagNames = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);

function filterSequentiallyFocusableElements(elements) {
  return elements.filter(element => {
    if (hasAttribute.call(element, 'tabindex')) {
      // Even though LWC only supports tabindex values of 0 or -1,
      // passing through elements with tabindex="0" is a tighter criteria
      // than filtering out elements based on tabindex="-1".
      return getAttribute.call(element, 'tabindex') === '0';
    }

    if (formElementTagNames.has(tagNameGetter.call(element))) {
      return !hasAttribute.call(element, 'disabled');
    }

    return true;
  });
}

const DidAddMouseEventListeners = new WeakMap(); // Due to browser differences, it is impossible to know what is focusable until
// we actually try to focus it. We need to refactor our focus delegation logic
// to verify whether or not the target was actually focused instead of trying
// to predict focusability like we do here.

function isVisible(element) {
  const {
    width,
    height
  } = getBoundingClientRect.call(element);
  const noZeroSize = width > 0 || height > 0; // The area element can be 0x0 and focusable. Hardcoding this is not ideal
  // but it will minimize changes in the current behavior.

  const isAreaElement = element.tagName === 'AREA';
  return (noZeroSize || isAreaElement) && getComputedStyle(element).visibility !== 'hidden';
} // This function based on https://allyjs.io/data-tables/focusable.html
// It won't catch everything, but should be good enough
// There are a lot of edge cases here that we can't realistically handle
// Determines if a particular element is tabbable, as opposed to simply focusable


function isTabbable(element) {
  if (isHostElement(element) && isDelegatingFocus(element)) {
    return false;
  }

  return matches.call(element, FocusableSelector) && isVisible(element);
}

function hostElementFocus() {
  const _rootNode = this.getRootNode();

  if (_rootNode === this) {
    // We invoke the focus() method even if the host is disconnected in order to eliminate
    // observable differences for component authors between synthetic and native.
    const focusable = querySelector.call(this, FocusableSelector);

    if (!isNull(focusable)) {
      // @ts-ignore type-mismatch
      focusable.focus.apply(focusable, arguments);
    }

    return;
  } // If the root node is not the host element then it's either the document or a shadow root.


  const rootNode = _rootNode;

  if (rootNode.activeElement === this) {
    // The focused element should not change if the focus method is invoked
    // on the shadow-including ancestor of the currently focused element.
    return;
  }

  const focusables = arrayFromCollection(querySelectorAll$1.call(this, FocusableSelector));
  let didFocus = false;

  while (!didFocus && focusables.length !== 0) {
    const focusable = focusables.shift(); // @ts-ignore type-mismatch

    focusable.focus.apply(focusable, arguments); // Get the root node of the current focusable in case it was slotted.

    const currentRootNode = focusable.getRootNode();
    didFocus = currentRootNode.activeElement === focusable;
  }
}

function getTabbableSegments(host) {
  const doc = getOwnerDocument(host);
  const all = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll.call(doc, FocusableSelector)));
  const inner = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll$1.call(host, FocusableSelector)));

  if ("production" !== 'production') {
    assert.invariant(getAttribute.call(host, 'tabindex') === '-1' || isDelegatingFocus(host), `The focusin event is only relevant when the tabIndex property is -1 on the host.`);
  }

  const firstChild = inner[0];
  const lastChild = inner[inner.length - 1];
  const hostIndex = ArrayIndexOf.call(all, host); // Host element can show up in our "previous" section if its tabindex is 0
  // We want to filter that out here

  const firstChildIndex = hostIndex > -1 ? hostIndex : ArrayIndexOf.call(all, firstChild); // Account for an empty inner list

  const lastChildIndex = inner.length === 0 ? firstChildIndex + 1 : ArrayIndexOf.call(all, lastChild) + 1;
  const prev = ArraySlice.call(all, 0, firstChildIndex);
  const next = ArraySlice.call(all, lastChildIndex);
  return {
    prev,
    inner,
    next
  };
}

function getActiveElement(host) {
  const doc = getOwnerDocument(host);
  const activeElement = DocumentPrototypeActiveElement.call(doc);

  if (isNull(activeElement)) {
    return activeElement;
  } // activeElement must be child of the host and owned by it


  return (compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 ? activeElement : null;
}

function relatedTargetPosition(host, relatedTarget) {
  // assert: target must be child of host
  const pos = compareDocumentPosition.call(host, relatedTarget);

  if (pos & DOCUMENT_POSITION_CONTAINED_BY) {
    // focus remains inside the host
    return 0;
  } else if (pos & DOCUMENT_POSITION_PRECEDING) {
    // focus is coming from above
    return 1;
  } else if (pos & DOCUMENT_POSITION_FOLLOWING) {
    // focus is coming from below
    return 2;
  } // we don't know what's going on.


  return -1;
}

function muteEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

function muteFocusEventsDuringExecution(win, func) {
  windowAddEventListener.call(win, 'focusin', muteEvent, true);
  windowAddEventListener.call(win, 'focusout', muteEvent, true);
  func();
  windowRemoveEventListener.call(win, 'focusin', muteEvent, true);
  windowRemoveEventListener.call(win, 'focusout', muteEvent, true);
}

function focusOnNextOrBlur(segment, target, relatedTarget) {
  const win = getOwnerWindow(relatedTarget);
  const next = getNextTabbable(segment, relatedTarget);

  if (isNull(next)) {
    // nothing to focus on, blur to invalidate the operation
    muteFocusEventsDuringExecution(win, () => {
      target.blur();
    });
  } else {
    muteFocusEventsDuringExecution(win, () => {
      next.focus();
    });
  }
}

let letBrowserHandleFocus = false;
function disableKeyboardFocusNavigationRoutines() {
  letBrowserHandleFocus = true;
}
function enableKeyboardFocusNavigationRoutines() {
  letBrowserHandleFocus = false;
}
function isKeyboardFocusNavigationRoutineEnabled() {
  return !letBrowserHandleFocus;
}

function skipHostHandler(event) {
  if (letBrowserHandleFocus) {
    return;
  }

  const host = eventCurrentTargetGetter.call(event);
  const target = eventTargetGetter.call(event); // If the host delegating focus with tabindex=0 is not the target, we know
  // that the event was dispatched on a descendant node of the host. This
  // means the focus is coming from below and we don't need to do anything.

  if (host !== target) {
    // Focus is coming from above
    return;
  }

  const relatedTarget = focusEventRelatedTargetGetter.call(event);

  if (isNull(relatedTarget)) {
    // If relatedTarget is null, the user is most likely tabbing into the document from the
    // browser chrome. We could probably deduce whether focus is coming in from the top or the
    // bottom by comparing the position of the target to all tabbable elements. This is an edge
    // case and only comes up if the custom element is the first or last tabbable element in the
    // document.
    return;
  }

  const segments = getTabbableSegments(host);
  const position = relatedTargetPosition(host, relatedTarget);

  if (position === 1) {
    // Focus is coming from above
    const findTabbableElms = isTabbableFrom.bind(null, host.getRootNode());
    const first = ArrayFind.call(segments.inner, findTabbableElms);

    if (!isUndefined(first)) {
      const win = getOwnerWindow(first);
      muteFocusEventsDuringExecution(win, () => {
        first.focus();
      });
    } else {
      focusOnNextOrBlur(segments.next, target, relatedTarget);
    }
  } else if (host === target) {
    // Host is receiving focus from below, either from its shadow or from a sibling
    focusOnNextOrBlur(ArrayReverse.call(segments.prev), target, relatedTarget);
  }
}

function skipShadowHandler(event) {
  if (letBrowserHandleFocus) {
    return;
  }

  const relatedTarget = focusEventRelatedTargetGetter.call(event);

  if (isNull(relatedTarget)) {
    // If relatedTarget is null, the user is most likely tabbing into the document from the
    // browser chrome. We could probably deduce whether focus is coming in from the top or the
    // bottom by comparing the position of the target to all tabbable elements. This is an edge
    // case and only comes up if the custom element is the first or last tabbable element in the
    // document.
    return;
  }

  const host = eventCurrentTargetGetter.call(event);
  const segments = getTabbableSegments(host);

  if (ArrayIndexOf.call(segments.inner, relatedTarget) !== -1) {
    // If relatedTarget is contained by the host's subtree we can assume that the user is
    // tabbing between elements inside of the shadow. Do nothing.
    return;
  }

  const target = eventTargetGetter.call(event); // Determine where the focus is coming from (Tab or Shift+Tab)

  const position = relatedTargetPosition(host, relatedTarget);

  if (position === 1) {
    // Focus is coming from above
    focusOnNextOrBlur(segments.next, target, relatedTarget);
  }

  if (position === 2) {
    // Focus is coming from below
    focusOnNextOrBlur(ArrayReverse.call(segments.prev), target, relatedTarget);
  }
} // Use this function to determine whether you can start from one root and end up
// at another element via tabbing.


function isTabbableFrom(fromRoot, toElm) {
  if (!isTabbable(toElm)) {
    return false;
  }

  const ownerDocument = getOwnerDocument(toElm);
  let root = toElm.getRootNode();

  while (root !== ownerDocument && root !== fromRoot) {
    const sr = root;
    const host = sr.host;

    if (getAttribute.call(host, 'tabindex') === '-1') {
      return false;
    }

    root = host && host.getRootNode();
  }

  return true;
}

function getNextTabbable(tabbables, relatedTarget) {
  const len = tabbables.length;

  if (len > 0) {
    for (let i = 0; i < len; i += 1) {
      const next = tabbables[i];

      if (isTabbableFrom(relatedTarget.getRootNode(), next)) {
        return next;
      }
    }
  }

  return null;
} // Skips the host element


function handleFocus(elm) {
  if ("production" !== 'production') {
    assert.invariant(isDelegatingFocus(elm), `Invalid attempt to handle focus event for ${toString(elm)}. ${toString(elm)} should have delegates focus true, but is not delegating focus`);
  }

  bindDocumentMousedownMouseupHandlers(elm); // Unbind any focusin listeners we may have going on

  ignoreFocusIn(elm);
  addEventListener.call(elm, 'focusin', skipHostHandler, true);
}
function ignoreFocus(elm) {
  removeEventListener.call(elm, 'focusin', skipHostHandler, true);
}

function bindDocumentMousedownMouseupHandlers(elm) {
  const ownerDocument = getOwnerDocument(elm);

  if (!DidAddMouseEventListeners.get(ownerDocument)) {
    DidAddMouseEventListeners.set(ownerDocument, true);
    addEventListener.call(ownerDocument, 'mousedown', disableKeyboardFocusNavigationRoutines, true);
    addEventListener.call(ownerDocument, 'mouseup', () => {
      // We schedule this as an async task in the mouseup handler (as
      // opposed to the mousedown handler) because we want to guarantee
      // that it will never run before the focusin handler:
      //
      // Click form element   | Click form element label
      // ==================================================
      // mousedown            | mousedown
      // FOCUSIN              | mousedown-setTimeout
      // mousedown-setTimeout | mouseup
      // mouseup              | FOCUSIN
      // mouseup-setTimeout   | mouseup-setTimeout
      setTimeout(enableKeyboardFocusNavigationRoutines);
    }, true); // [W-7824445] If the element is draggable, the mousedown event is dispatched before the
    // element is starting to be dragged, which disable the keyboard focus navigation routine.
    // But by specification, the mouseup event is never dispatched once the element is dropped.
    //
    // For all draggable element, we need to add an event listener to re-enable the keyboard
    // navigation routine after dragging starts.

    addEventListener.call(ownerDocument, 'dragstart', enableKeyboardFocusNavigationRoutines, true);
  }
} // Skips the shadow tree


function handleFocusIn(elm) {
  if ("production" !== 'production') {
    assert.invariant(tabIndexGetter.call(elm) === -1, `Invalid attempt to handle focus in  ${toString(elm)}. ${toString(elm)} should have tabIndex -1, but has tabIndex ${tabIndexGetter.call(elm)}`);
  }

  bindDocumentMousedownMouseupHandlers(elm); // Unbind any focus listeners we may have going on

  ignoreFocus(elm); // This focusin listener is to catch focusin events from keyboard interactions
  // A better solution would perhaps be to listen for keydown events, but
  // the keydown event happens on whatever element already has focus (or no element
  // at all in the case of the location bar. So, instead we have to assume that focusin
  // without a mousedown means keyboard navigation

  addEventListener.call(elm, 'focusin', skipShadowHandler, true);
}
function ignoreFocusIn(elm) {
  removeEventListener.call(elm, 'focusin', skipShadowHandler, true);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function getElementComputedStyle(element) {
  const win = getOwnerWindow(element);
  return windowGetComputedStyle.call(win, element);
}

function getWindowSelection(node) {
  const win = getOwnerWindow(node);
  return windowGetSelection.call(win);
}

function nodeIsBeingRendered(nodeComputedStyle) {
  return nodeComputedStyle.visibility === 'visible' && nodeComputedStyle.display !== 'none';
}

function getSelectionState(element) {
  const win = getOwnerWindow(element);
  const selection = getWindowSelection(element);

  if (selection === null) {
    return null;
  }

  const ranges = [];

  for (let i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  const state = {
    element,
    onselect: win.onselect,
    onselectstart: win.onselectstart,
    onselectionchange: win.onselectionchange,
    ranges
  };
  win.onselect = null;
  win.onselectstart = null;
  win.onselectionchange = null;
  return state;
}

function restoreSelectionState(state) {
  if (state === null) {
    return;
  }

  const {
    element,
    onselect,
    onselectstart,
    onselectionchange,
    ranges
  } = state;
  const win = getOwnerWindow(element);
  const selection = getWindowSelection(element);
  selection.removeAllRanges();

  for (let i = 0; i < ranges.length; i++) {
    selection.addRange(ranges[i]);
  }

  win.onselect = onselect;
  win.onselectstart = onselectstart;
  win.onselectionchange = onselectionchange;
}
/**
 * Gets the "innerText" of a text node using the Selection API
 *
 * NOTE: For performance reasons, since this function will be called multiple times while calculating the innerText of
 *       an element, it does not restore the current selection.
 */


function getTextNodeInnerText(textNode) {
  const selection = getWindowSelection(textNode);

  if (selection === null) {
    return textNode.textContent || '';
  }

  const range = document.createRange();
  range.selectNodeContents(textNode);
  const domRect = range.getBoundingClientRect();

  if (domRect.height <= 0 || domRect.width <= 0) {
    // the text node is not rendered
    return '';
  } // Needed to remove non rendered characters from the text node.


  selection.removeAllRanges();
  selection.addRange(range);
  const selectionText = selection.toString(); // The textNode is visible, but it may not be selectable. When the text is not selectable,
  // textContent is the nearest approximation to innerText.

  return selectionText ? selectionText : textNode.textContent || '';
}

const nodeIsElement = node => node.nodeType === ELEMENT_NODE;

const nodeIsText = node => node.nodeType === TEXT_NODE;
/**
 * Spec: https://html.spec.whatwg.org/multipage/dom.html#inner-text-collection-steps
 * One spec implementation: https://github.com/servo/servo/blob/721271dcd3c20db5ca8cf146e2b5907647afb4d6/components/layout/query.rs#L1132
 */


function innerTextCollectionSteps(node) {
  const items = [];

  if (nodeIsElement(node)) {
    const {
      tagName
    } = node;
    const computedStyle = getElementComputedStyle(node);

    if (tagName === 'OPTION') {
      // For options, is hard to get the "rendered" text, let's use the original getter.
      return [1, innerTextGetter.call(node), 1];
    } else if (tagName === 'TEXTAREA') {
      return [];
    } else {
      const childNodes = node.childNodes;

      for (let i = 0, n = childNodes.length; i < n; i++) {
        ArrayPush.apply(items, innerTextCollectionSteps(childNodes[i]));
      }
    }

    if (!nodeIsBeingRendered(computedStyle)) {
      if (tagName === 'SELECT' || tagName === 'DATALIST') {
        // the select is either: .visibility != 'visible' or .display === hidden, therefore this select should
        // not display any value.
        return [];
      }

      return items;
    }

    if (tagName === 'BR') {
      items.push('\u{000A}'
      /* line feed */
      );
    }

    const {
      display
    } = computedStyle;

    if (display === 'table-cell') {
      // omitting case: and node's CSS box is not the last 'table-cell' box of its enclosing 'table-row' box
      items.push('\u{0009}'
      /* tab */
      );
    }

    if (display === 'table-row') {
      // omitting case: and node's CSS box is not the last 'table-row' box of the nearest ancestor 'table' box
      items.push('\u{000A}'
      /* line feed */
      );
    }

    if (tagName === 'P') {
      items.unshift(2);
      items.push(2);
    }

    if (display === 'block' || display === 'table-caption' || display === 'flex' || display === 'table') {
      items.unshift(1);
      items.push(1);
    }
  } else if (nodeIsText(node)) {
    items.push(getTextNodeInnerText(node));
  }

  return items;
}
/**
 * InnerText getter spec: https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute
 *
 * One spec implementation: https://github.com/servo/servo/blob/721271dcd3c20db5ca8cf146e2b5907647afb4d6/components/layout/query.rs#L1087
 */


function getInnerText(element) {
  const thisComputedStyle = getElementComputedStyle(element);

  if (!nodeIsBeingRendered(thisComputedStyle)) {
    return getTextContent(element) || '';
  }

  const selectionState = getSelectionState(element);
  const results = [];
  const childNodes = element.childNodes;

  for (let i = 0, n = childNodes.length; i < n; i++) {
    ArrayPush.apply(results, innerTextCollectionSteps(childNodes[i]));
  }

  restoreSelectionState(selectionState);
  let elementInnerText = '';
  let maxReqLineBreakCount = 0;

  for (let i = 0, n = results.length; i < n; i++) {
    const item = results[i];

    if (typeof item === 'string') {
      if (maxReqLineBreakCount > 0) {
        for (let j = 0; j < maxReqLineBreakCount; j++) {
          elementInnerText += '\u{000A}';
        }

        maxReqLineBreakCount = 0;
      }

      if (item.length > 0) {
        elementInnerText += item;
      }
    } else {
      if (elementInnerText.length == 0) {
        // Remove required line break count at the start.
        continue;
      } // Store the count if it's the max of this run,
      // but it may be ignored if no text item is found afterwards,
      // which means that these are consecutive line breaks at the end.


      if (item > maxReqLineBreakCount) {
        maxReqLineBreakCount = item;
      }
    }
  }

  return elementInnerText;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  blur,
  focus
} = HTMLElement.prototype;
/**
 * This method only applies to elements with a shadow attached to them
 */

function tabIndexGetterPatched() {
  if (isDelegatingFocus(this) && isFalse(hasAttribute.call(this, 'tabindex'))) {
    // this covers the case where the default tabindex should be 0 because the
    // custom element is delegating its focus
    return 0;
  }

  return tabIndexGetter.call(this);
}
/**
 * This method only applies to elements with a shadow attached to them
 */


function tabIndexSetterPatched(value) {
  // This tabIndex setter might be confusing unless it is understood that HTML
  // elements have default tabIndex property values. Natively focusable elements have
  // a default tabIndex value of 0 and all other elements have a default tabIndex
  // value of -1. For example, the tabIndex property value is -1 for both <x-foo> and
  // <x-foo tabindex="-1">, but our delegatesFocus polyfill should only kick in for
  // the latter case when the value of the tabindex attribute is -1.
  const delegatesFocus = isDelegatingFocus(this); // Record the state of things before invoking component setter.

  const prevValue = tabIndexGetter.call(this);
  const prevHasAttr = hasAttribute.call(this, 'tabindex');
  tabIndexSetter.call(this, value); // Record the state of things after invoking component setter.

  const currValue = tabIndexGetter.call(this);
  const currHasAttr = hasAttribute.call(this, 'tabindex');
  const didValueChange = prevValue !== currValue; // If the tabindex attribute is initially rendered, we can assume that this setter has
  // previously executed and a listener has been added. We must remove that listener if
  // the tabIndex property value has changed or if the component no longer renders a
  // tabindex attribute.

  if (prevHasAttr && (didValueChange || isFalse(currHasAttr))) {
    if (prevValue === -1) {
      ignoreFocusIn(this);
    }

    if (prevValue === 0 && delegatesFocus) {
      ignoreFocus(this);
    }
  } // If a tabindex attribute was not rendered after invoking its setter, it means the
  // component is taking control. Do nothing.


  if (isFalse(currHasAttr)) {
    return;
  } // If the tabindex attribute is initially rendered, we can assume that this setter has
  // previously executed and a listener has been added. If the tabindex attribute is still
  // rendered after invoking the setter AND the tabIndex property value has not changed,
  // we don't need to do any work.


  if (prevHasAttr && currHasAttr && isFalse(didValueChange)) {
    return;
  } // At this point we know that a tabindex attribute was rendered after invoking the
  // setter and that either:
  // 1) This is the first time this setter is being invoked.
  // 2) This is not the first time this setter is being invoked and the value is changing.
  // We need to add the appropriate listeners in either case.


  if (currValue === -1) {
    // Add the magic to skip the shadow tree
    handleFocusIn(this);
  }

  if (currValue === 0 && delegatesFocus) {
    // Add the magic to skip the host element
    handleFocus(this);
  }
}
/**
 * This method only applies to elements with a shadow attached to them
 */


function blurPatched() {
  if (isDelegatingFocus(this)) {
    const currentActiveElement = getActiveElement(this);

    if (!isNull(currentActiveElement)) {
      // if there is an active element, blur it (intentionally using the dot notation in case the user defines the blur routine)
      currentActiveElement.blur();
      return;
    }
  }

  return blur.call(this);
}

function focusPatched() {
  // Save enabled state
  const originallyEnabled = isKeyboardFocusNavigationRoutineEnabled(); // Change state by disabling if originally enabled

  if (originallyEnabled) {
    disableKeyboardFocusNavigationRoutines();
  }

  if (isHostElement(this) && isDelegatingFocus(this)) {
    hostElementFocus.call(this);
    return;
  } // Typescript does not like it when you treat the `arguments` object as an array
  // @ts-ignore type-mismatch


  focus.apply(this, arguments); // Restore state by enabling if originally enabled

  if (originallyEnabled) {
    enableKeyboardFocusNavigationRoutines();
  }
} // Non-deep-traversing patches: this descriptor map includes all descriptors that
// do not five access to nodes beyond the immediate children.


defineProperties(HTMLElement.prototype, {
  tabIndex: {
    get() {
      if (isHostElement(this)) {
        return tabIndexGetterPatched.call(this);
      }

      return tabIndexGetter.call(this);
    },

    set(v) {
      if (isHostElement(this)) {
        return tabIndexSetterPatched.call(this, v);
      }

      return tabIndexSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  },
  blur: {
    value() {
      if (isHostElement(this)) {
        return blurPatched.call(this);
      }

      blur.call(this);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  focus: {
    value() {
      // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch
      focusPatched.apply(this, arguments);
    },

    enumerable: true,
    writable: true,
    configurable: true
  }
}); // Note: In JSDOM innerText is not implemented: https://github.com/jsdom/jsdom/issues/1245

if (innerTextGetter !== null && innerTextSetter !== null) {
  defineProperty(HTMLElement.prototype, 'innerText', {
    get() {
      if (!runtimeFlags.ENABLE_INNER_OUTER_TEXT_PATCH) {
        return innerTextGetter.call(this);
      }

      if (!runtimeFlags.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return getInnerText(this);
        }

        return innerTextGetter.call(this);
      } // TODO [#1222]: remove global bypass


      if (isGlobalPatchingSkipped(this)) {
        return innerTextGetter.call(this);
      }

      return getInnerText(this);
    },

    set(v) {
      innerTextSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  });
} // Note: Firefox does not have outerText, https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/outerText


if (outerTextGetter !== null && outerTextSetter !== null) {
  // From https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/outerText :
  // HTMLElement.outerText is a non-standard property. As a getter, it returns the same value as Node.innerText.
  // As a setter, it removes the current node and replaces it with the given text.
  defineProperty(HTMLElement.prototype, 'outerText', {
    get() {
      if (!runtimeFlags.ENABLE_INNER_OUTER_TEXT_PATCH) {
        return outerTextGetter.call(this);
      }

      if (!runtimeFlags.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return getInnerText(this);
        }

        return outerTextGetter.call(this);
      } // TODO [#1222]: remove global bypass


      if (isGlobalPatchingSkipped(this)) {
        return outerTextGetter.call(this);
      }

      return getInnerText(this);
    },

    set(v) {
      // Invoking the `outerText` setter on a host element should trigger its disconnection, but until we merge node reactions, it will not work.
      // We could reimplement the outerText setter in JavaScript ([blink implementation](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/html_element.cc;l=841-879;drc=6e8b402a6231405b753919029c9027404325ea00;bpv=0;bpt=1))
      // but the benefits don't worth the efforts.
      outerTextSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  });
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getShadowToken(node) {
  return node[KEY__SHADOW_TOKEN];
}
function setShadowToken(node, shadowToken) {
  node[KEY__SHADOW_TOKEN] = shadowToken;
}
/**
 * Patching Element.prototype.$shadowToken$ to mark elements a portal:
 *
 *  - we use a property to allow engines to set a custom attribute that should be
 *    placed into the element to sandbox the css rules defined for the template.
 *
 *  - this custom attribute must be unique.
 *
 **/

defineProperty(Element.prototype, KEY__SHADOW_TOKEN, {
  set(shadowToken) {
    const oldShadowToken = this[KEY__SHADOW_TOKEN_PRIVATE];

    if (!isUndefined(oldShadowToken) && oldShadowToken !== shadowToken) {
      removeAttribute.call(this, oldShadowToken);
    }

    if (!isUndefined(shadowToken)) {
      setAttribute.call(this, shadowToken, '');
    }

    this[KEY__SHADOW_TOKEN_PRIVATE] = shadowToken;
  },

  get() {
    return this[KEY__SHADOW_TOKEN_PRIVATE];
  },

  configurable: true
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DomManualPrivateKey = '$$DomManualKey$$'; // Resolver function used when a node is removed from within a portal

const DocumentResolverFn = function () {}; // We can use a single observer without having to worry about leaking because
// "Registered observers in a node’s registered observer list have a weak
// reference to the node."
// https://dom.spec.whatwg.org/#garbage-collection


let portalObserver;
const portalObserverConfig = {
  childList: true
};

function adoptChildNode(node, fn, shadowToken) {
  const previousNodeShadowResolver = getShadowRootResolver(node);

  if (previousNodeShadowResolver === fn) {
    return; // nothing to do here, it is already correctly patched
  }

  setShadowRootResolver(node, fn);

  if (node instanceof Element) {
    setShadowToken(node, shadowToken);

    if (isHostElement(node)) {
      // Root LWC elements can't get content slotted into them, therefore we don't observe their children.
      return;
    }

    if (isUndefined(previousNodeShadowResolver)) {
      // we only care about Element without shadowResolver (no MO.observe has been called)
      MutationObserverObserve.call(portalObserver, node, portalObserverConfig);
    } // recursively patching all children as well


    const childNodes = childNodesGetter.call(node);

    for (let i = 0, len = childNodes.length; i < len; i += 1) {
      adoptChildNode(childNodes[i], fn, shadowToken);
    }
  }
}

function initPortalObserver() {
  return new MO(mutations => {
    forEach.call(mutations, mutation => {
      /**
       * This routine will process all nodes added or removed from elm (which is marked as a portal)
       * When adding a node to the portal element, we should add the ownership.
       * When removing a node from the portal element, this ownership should be removed.
       *
       * There is some special cases in which MutationObserver may call with stacked mutations (the same node
       * will be in addedNodes and removedNodes) or with false positives (a node that is removed and re-appended
       * in the same tick) for those cases, we cover by checking that the node is contained
       * (or not in the case of removal) by the element.
       */
      const {
        target: elm,
        addedNodes,
        removedNodes
      } = mutation; // the target of the mutation should always have a ShadowRootResolver attached to it

      const fn = getShadowRootResolver(elm);
      const shadowToken = getShadowToken(elm); // Process removals first to handle the case where an element is removed and reinserted

      for (let i = 0, len = removedNodes.length; i < len; i += 1) {
        const node = removedNodes[i];

        if (!(compareDocumentPosition.call(elm, node) & _Node.DOCUMENT_POSITION_CONTAINED_BY)) {
          adoptChildNode(node, DocumentResolverFn, undefined);
        }
      }

      for (let i = 0, len = addedNodes.length; i < len; i += 1) {
        const node = addedNodes[i];

        if (compareDocumentPosition.call(elm, node) & _Node.DOCUMENT_POSITION_CONTAINED_BY) {
          adoptChildNode(node, fn, shadowToken);
        }
      }
    });
  });
}

function markElementAsPortal(elm) {
  if (isUndefined(portalObserver)) {
    portalObserver = initPortalObserver();
  }

  if (isUndefined(getShadowRootResolver(elm))) {
    // only an element from a within a shadowRoot should be used here
    throw new Error(`Invalid Element`);
  } // install mutation observer for portals


  MutationObserverObserve.call(portalObserver, elm, portalObserverConfig); // TODO [#1253]: optimization to synchronously adopt new child nodes added
  // to this elm, we can do that by patching the most common operations
  // on the node itself
}
/**
 * Patching Element.prototype.$domManual$ to mark elements as portal:
 *
 *  - we use a property to allow engines to signal that a particular element in
 *    a shadow supports manual insertion of child nodes.
 *
 *  - this signal comes as a boolean value, and we use it to install the MO instance
 *    onto the element, to propagate the $ownerKey$ and $shadowToken$ to all new
 *    child nodes.
 *
 *  - at the moment, there is no way to undo this operation, once the element is
 *    marked as $domManual$, setting it to false does nothing.
 *
 **/
// TODO [#1306]: rename this to $observerConnection$


defineProperty(Element.prototype, '$domManual$', {
  set(v) {
    this[DomManualPrivateKey] = v;

    if (isTrue(v)) {
      markElementAsPortal(this);
    }
  },

  get() {
    return this[DomManualPrivateKey];
  },

  configurable: true
});
/** version: 2.4.0 */
