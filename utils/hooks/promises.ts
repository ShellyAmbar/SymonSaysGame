function promiseTimeout({
  ms,
  actionBefor,
  actionAfter,
}: {
  ms: number;
  actionBefor?: () => void;
  actionAfter: () => void;
}) {
  let timeoutId;
  return new Promise<void>((resolve, reject) => {
    try {
      actionBefor && actionBefor();
      timeoutId = setTimeout(() => {
        actionAfter();
        clearTimeout(timeoutId);
        resolve();
      }, ms);
    } catch {
      clearTimeout(timeoutId);
      reject();
    }
  });
}

export { promiseTimeout };
