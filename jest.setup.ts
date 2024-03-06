import "@testing-library/jest-dom";

// Polyfill for crypto.randomUUID which isn't supported in jsdom https://github.com/jsdom/jsdom/issues/1612
const uuidGenerator = (() => {
  function* generator() {
    let id = 0;

    while (true) {
      yield (id++).toString();
    }
  }

  return generator();
})();

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => uuidGenerator.next().value,
  },
});

// Polyfill for structuredClone which isn't supported in jsdom https://github.com/jsdom/jsdom/issues/3363
Object.defineProperty(globalThis, "structuredClone", {
  value: (val: unknown) => {
    return JSON.parse(JSON.stringify(val));
  },
});
