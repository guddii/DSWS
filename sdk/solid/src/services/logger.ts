interface ILoggerOptions {
  caller?: string;
  error?: any;
  warn?: any;
  log?: any;
}

export const logger = (options: ILoggerOptions) => {
  if (options?.log) {
    console.log(`${options?.caller || "Logger"}:`, options.log);
  }
  if (options?.warn) {
    console.warn(`${options?.caller || "Logger"}:`, options.warn);
  }
  if (options?.error) {
    console.error(`${options?.caller || "Logger"}:`, options.error);
  }
};
