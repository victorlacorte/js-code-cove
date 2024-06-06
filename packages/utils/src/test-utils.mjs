/**
 * @param {Array} tuples
 */
export function each(tuples) {
  /**
   * @param {(...tuple: Array<any>) => void} callback
   */
  return (callback) => {
    for (const tuple of tuples) {
      callback(...tuple);
    }
  };
}
