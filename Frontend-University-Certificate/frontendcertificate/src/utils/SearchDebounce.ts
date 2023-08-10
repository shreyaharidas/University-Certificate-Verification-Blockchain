const searchDebounce = (callback: any, delay: number) => {
  let time: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default searchDebounce;
