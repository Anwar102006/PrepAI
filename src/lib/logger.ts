// Production-ready structured logger
// Vercel handles console logs, but formatting them as JSON makes them easier to parse in Datadog/Axiom

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatLog = (level: LogLevel, message: string, meta?: any) => {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
    env: process.env.NODE_ENV,
  });
};

export const logger = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: (message: string, meta?: any) => {
    console.log(formatLog('info', message, meta));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn: (message: string, meta?: any) => {
    console.warn(formatLog('warn', message, meta));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (message: string, meta?: any) => {
    console.error(formatLog('error', message, meta));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatLog('debug', message, meta));
    }
  },
};
