import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTheme } from './useTheme';

describe('useTheme', () => {
  it('should throw an error when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrowError(
      'useTheme must be used within ThemeProvider',
    );
  });
});
