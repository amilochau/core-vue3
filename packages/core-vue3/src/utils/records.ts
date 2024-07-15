/**
 * Get a new available key from a dictionary.
 * @param record Dictionary.
 * @param maxIndex Maximum value to use as a key.
 * @throws No value can be found.
 */
export const getNewKey = <TItem>(record: Record<string, TItem>, maxIndex: number = 100) => {
  let index = 0;

  while (index < maxIndex) {
    const indexAsString = `${index}`;
    if (!record[index]) {
      // The current index is free
      return indexAsString;
    }
    index++;
  }

  // No index is free
  throw new Error('Can\'t create new item!');
};
