import { render, screen } from '@testing-library/react';
import { Navbar, NavbarBrand, NavbarLinks, NavbarActions } from './Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar', () => {
  it('renders navbar components correctly', () => {
    render(
      <Navbar>
        <NavbarBrand>Brand Logo</NavbarBrand>
        <NavbarLinks>
          <a href="/">Home</a>
          <a href="/docs">Docs</a>
        </NavbarLinks>
        <NavbarActions>
          <button>Login</button>
        </NavbarActions>
      </Navbar>
    );

    expect(screen.getByText('Brand Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('applies sticky and blur classes based on props', () => {
    const { rerender } = render(<Navbar sticky={false} blur={false}>Simple Navbar</Navbar>);
    const navbar = screen.getByRole('banner');
    expect(navbar).not.toHaveClass('sticky');
    expect(navbar).not.toHaveClass('backdrop-blur-xl');

    rerender(<Navbar sticky={true} blur={true}>Interactive Navbar</Navbar>);
    expect(navbar).toHaveClass('sticky');
    expect(navbar).toHaveClass('backdrop-blur-xl');
  });

  it('renders a nav element inside NavbarLinks', () => {
    render(
      <Navbar>
        <NavbarLinks>Link Item</NavbarLinks>
      </Navbar>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
