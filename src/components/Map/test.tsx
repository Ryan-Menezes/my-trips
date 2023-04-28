import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import Map from '.';

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map router={mockRouter} />);

    // screen.logTestingPlaygroundURL();

    expect(
      screen.getByRole('link', {
        name: /openstreetmap/i,
      })
    ).toBeInTheDocument();
  });

  it('should render with the marker in correct place', () => {
    const placeOne = {
      id: '1',
      name: 'Petrópolis',
      slug: 'petropolis',
      location: {
        latitude: 0,
        longitude: 0,
      },
    };

    const placeTwo = {
      id: '2',
      name: 'Reykjavik',
      slug: 'reykjavik',
      location: {
        latitude: 129,
        longitude: -50,
      },
    };

    render(<Map router={mockRouter} places={[placeOne, placeTwo]} />);

    expect(screen.getByTitle(/petrópolis/i)).toBeInTheDocument();
    expect(screen.getByTitle(/reykjavik/i)).toBeInTheDocument();
  });
});
