import '@testing-library/jest-dom';
import { expect } from '@jest/globals'; 
import { toHaveNoViolations } from 'jest-axe'; 

expect.extend(toHaveNoViolations); 

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
