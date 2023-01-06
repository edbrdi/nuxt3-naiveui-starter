import { render, screen } from '@testing-library/vue';
import Logo from '~/components/svg/Logo.vue';

describe('Logo', () => {
  it('renders', () => {
    render(Logo);

    const logo = screen.getByRole('figure');
    expect(logo).toMatchSnapshot();
  });

  it('renders in dark mode', () => {
    render(Logo, {
      props: {
        darkMode: true,
      },
    });

    const logo = screen.getByRole('figure');
    expect(logo).toMatchSnapshot();
  });

  it('renders in short version', () => {
    render(Logo, {
      props: {
        short: true,
      },
    });

    const logo = screen.getByRole('figure');
    expect(logo).toMatchSnapshot();
  });

  it('renders in short version and dark mode', () => {
    render(Logo, {
      props: {
        short: true,
        darkMode: true,
      },
    });

    const logo = screen.getByRole('figure');
    expect(logo).toMatchSnapshot();
  });
});
