import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import Apps from '../../app/routes/_index';
import React from 'react';

describe('Apps Component', () => {
  test('should render without crashing', () => {
    render(<Apps />);
  });
});
