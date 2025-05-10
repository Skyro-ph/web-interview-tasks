import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

// Mock environment variables
const mockEnv = {
  VITE_API_HOST: 'http://test-api.example.com',
  VITE_API_TOKEN: 'test-token',
};

// Mock import.meta.env
Object.defineProperty(window, 'import', {
  writable: true,
  value: {
    meta: {
      env: mockEnv,
    },
  },
});

// Mock TextEncoder/TextDecoder
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: TextEncoder,
});

Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
