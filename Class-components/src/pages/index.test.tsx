import { test } from 'vitest';
import App from '.';
import { render } from '@testing-library/react';

test('render app', () => {
  render(<App />);
});
