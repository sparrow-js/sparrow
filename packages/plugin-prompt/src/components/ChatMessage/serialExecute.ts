export function serialExecute<T>(tasks: Array<(prevResult?: T, pause?: () => void) => Promise<T>>): Promise<T> {
    let prevResult: T | undefined;
    let isPaused = false;
    let pauseCallback: (() => void) | undefined;

    const pause = (): void => {
      isPaused = true;
    };

    return tasks.reduce((prevTask, currTask) => {
      return prevTask.then((result: any) => {
        prevResult = result;

        return new Promise<T>((resolve, reject) => {
          const taskPromise = currTask(prevResult, pause);

          if (isPaused) {
            pauseCallback = (): void => {
              taskPromise.then(resolve).catch(reject);
            };
          } else {
            taskPromise.then(resolve).catch(reject);
          }
        });
      });
    }, Promise.resolve()).then((finalResult) => {
      return finalResult;
    });
}