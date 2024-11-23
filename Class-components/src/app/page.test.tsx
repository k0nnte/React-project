import { describe, test } from 'vitest';
import Apps from './page';
import { render } from '@testing-library/react';

describe('test main page', () => {
  test('render main page', () => {
    render(<Apps />);
  });
});
