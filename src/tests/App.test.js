import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste de rotas e renderização dos componentes', () => {
  it('Teste se os links possuem o texto correto', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText(/Home/);
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByText(/About/);
    expect(linkAbout).toBeInTheDocument();

    const linkFavPoke = screen.getByText(/Favorite Pokémons/);
    expect(linkFavPoke).toBeInTheDocument();
  });
  it('Teste se o link Home vai para a URL / ', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    // const aboutTitle = screen.getByText(/Encountered pokémons/);
    // expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se o link About vai para a URL /about ', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se o link Favorite Pokémons vai para a URL /favorites ', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavPoke).toBeInTheDocument();
    userEvent.click(linkFavPoke);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se é renderizada a página NotFound ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-que-nao-existe/');

    const aboutTitle = screen.getByText(/Page requested not found/);
    expect(aboutTitle).toBeInTheDocument();
  });
});
