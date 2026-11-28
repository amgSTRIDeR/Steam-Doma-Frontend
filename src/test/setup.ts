import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

class TestResizeObserver implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    void callback;
  }

  observe(target: Element): void {
    void target;
  }

  unobserve(target: Element): void {
    void target;
  }

  disconnect(): void {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  configurable: true,
  value: TestResizeObserver,
});

afterEach(() => {
  cleanup();
});
