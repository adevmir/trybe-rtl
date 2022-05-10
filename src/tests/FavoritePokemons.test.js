import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import data from '../data';

describe('No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavPoke = screen.getByText(/No favorite pokemon found/);
    expect(noFavPoke).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ data } />);
    // console.log(data);

    const pikachu = screen.getByText(/Pikachu/);
    const charmander = screen.getByText(/Charmander/);
    const caterpie = screen.getByText(/Caterpie/);
    const ekans = screen.getByText(/Ekans/);
    const alakazam = screen.getByText(/Alakazam/);
    const mew = screen.getByText(/Mew/);
    const rapidash = screen.getByText(/Rapidash/);
    const snorlax = screen.getByText(/Snorlax/);
    const dragonair = screen.getByText(/Dragonair/);

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();
    expect(mew).toBeInTheDocument();
    expect(rapidash).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
  });
});
