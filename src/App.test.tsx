import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    // check if App components renders headline
  });
});
