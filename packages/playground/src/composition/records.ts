function getNewKey<TItem>(record: Record<string, TItem>, maxIndex: number = 100) {
  var index = 0;

  while (index < maxIndex) {
    const indexAsString = `${index}`
    if (!record[index]) {
      // The current index is free
      return indexAsString;
    }
    index++;
  }

  // No index is free
  throw new Error("Can't create new item!");
}

export function useRecords() {
  return {
    getNewKey
  }
}
