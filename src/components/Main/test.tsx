import { render, screen } from '@testing-library/react';
import Main from './index';

describe('<Main />', () => {
  it('should render the heading', async () => {
    const { container } = render(<Main />);

    expect(
      screen.getByRole('heading', { name: /react avançado/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
