import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Teste se a pagina contém as informações sobre a Pokedéx', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByText(/About Pokédex/);
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const info1 = screen.getByText(/This application simulates a Pokédex, a digital/,
      /encyclopedia containing all Pokémons/);
    expect(info1).toBeInTheDocument();

    const info2 = screen.getByText(/One can filter Pokémons by type, and see more/,
      /details for each one of them/);
    expect(info2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImg = screen.getByRole('img', { className: 'pokedex-image' });
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', pokedexImgSrc);
  });
});
