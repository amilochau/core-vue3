export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) {
    return true;
  }

  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    // If the values are Date, compare them as timestamps
    return false;
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }

  return Object.keys(a).every(p => deepEqual(a[p], b[p]));
};
