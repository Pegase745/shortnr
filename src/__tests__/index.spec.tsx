import * as ReactDOM from 'react-dom';
import App from '../App';
import { moduleHotAccept, renderApp } from '../index';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

describe('index.tsx', () => {
  describe('renderApp', () => {
    it('should call ReactDOM.render', () => {
      renderApp(App);
      expect(ReactDOM.render).toHaveBeenCalled();
    });
  });

  describe('moduleHotAccept', () => {
    it('should only call hot.accept() if hot is defined', () => {
      const mockModule = {
        id: '',
        filename: '',
        loaded: false,
        parent: null,
        children: null,
        paths: [],
        exports: jest.fn(),
        require: jest.fn(),
        hot: {
          decline: jest.fn(),
          dispose: jest.fn(),
          check: jest.fn(),
          apply: jest.fn(),
          addDisposeHandler: jest.fn(),
          removeDisposeHandler: jest.fn(),
          status: jest.fn(),
          active: false,
          addStatusHandler: jest.fn(),
          removeStatusHandler: jest.fn(),
          data: '',
          accept: jest.fn((a, b) => b()),
        },
      };

      moduleHotAccept(mockModule);
      expect(mockModule.hot.accept).toHaveBeenCalled();
    });

    it('should not throw if module is undefined', () => {
      expect(moduleHotAccept).not.toThrow();
    });
  });
});
