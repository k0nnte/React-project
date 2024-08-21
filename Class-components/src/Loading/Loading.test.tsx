import '@testing-library/jest-dom';
import Loading from './Loading';
import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('test Loading', () => {
  beforeEach(() => {
    render(<Loading />);
  });

  test('rendering Loading', () => {
    const imgElement = screen.getByAltText('loading');
    expect(imgElement).toBeInTheDocument();
  });
  test('element is img', () => {
    const imgElement = screen.getByAltText('loading');
    expect(imgElement).toHaveClass('image');
  });
});
