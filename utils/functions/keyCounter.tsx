const keysCounter = (data: any[]) => {
  const keysMap: { [key: string]: number } = {};
  data.forEach(dataItem => {
    if (keysMap[dataItem]) {
      keysMap[dataItem]++;
    } else {
      keysMap[dataItem] = 1;
    }
  });

  const countedKeys = Object.entries(keysMap).map(([key, quantity]) => ({
    key,
    quantity
  }));
  return countedKeys;
};

export default keysCounter;