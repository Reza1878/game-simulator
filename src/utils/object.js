const transformFunc = (obj, key, func) => {
  if (has(obj, key)) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = func(obj[key]);
  }
};

export const transformProperty = (obj, keys, func) => {
  if (typeof keys === "string") {
    const key = keys;
    transformFunc(obj, key, func);
  } else if (Array.isArray(keys)) {
    keys.forEach((key) => transformFunc(obj, key, func));
  }
};
