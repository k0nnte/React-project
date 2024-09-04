import { describe, expect, test } from 'vitest';
import Loading from './Loading';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import gif from '../assets/await.gif';

describe('test loading', () => {
  test('render Loading', () => {
    const { getByAltText } = render(<Loading />);
    const imgElement = getByAltText('loading');
    expect(imgElement).toBeInTheDocument();
  });
  test('should render the image with correct src', () => {
    const { getByAltText } = render(<Loading />);
    const imgElement = getByAltText('loading');
    expect(imgElement).toHaveAttribute('src', gif);
  });
  test('should have the correct class names', () => {
    const { container } = render(<Loading />);
    const divElement = container.querySelector('.wrapper_image');
    const imgElement = container.querySelector('.image');
    expect(divElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });
});
