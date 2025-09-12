/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Ensure Buffer is globally available early (before any dynamic imports needing it)
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Buffer } = require('buffer');
  if (typeof window !== 'undefined' && !(window as any).Buffer) {
    (window as any).Buffer = Buffer;
  }
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('[Polyfills] Buffer polyfill failed', err);
}
