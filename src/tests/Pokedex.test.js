import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const arrPokes = [
  /Pikachu/,
  /Charmander/,
  /Caterpie/,
  /Ekans/,
  /Alakazam/,
  /Mew/,
  /Rapidash/,
  /Snorlax/,
  /Dragonair/,
  /Pikachu/,
];
const prox = 'Próximo pokémon';
const poketypebutton = 'pokemon-type-button';
const testtype = 'data-testid';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const aboutTitle = screen.getByText(/Encountered pokémons/);
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    for (let a = 1; a < arrPokes.length; a += 1) {
      const nextPokeButton = screen.getByRole('button', { name: prox });
      expect(nextPokeButton).toBeInTheDocument();
      userEvent.click(nextPokeButton);

      const pokemon = screen.getByText(arrPokes[a]);
      expect(pokemon).toBeInTheDocument();
    }
  });
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonsInScreen = screen.getAllByRole('link', { name: 'More details' });
    expect(pokemonsInScreen.length).toEqual(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allTypes = screen.getByRole('button', { name: 'All' });
    const eleType = screen.getByRole('button', { name: 'Electric' });
    const firType = screen.getByRole('button', { name: 'Fire' });
    const bugType = screen.getByRole('button', { name: 'Bug' });
    const poiType = screen.getByRole('button', { name: 'Poison' });
    const psyType = screen.getByRole('button', { name: 'Psychic' });
    const norType = screen.getByRole('button', { name: 'Normal' });
    const draType = screen.getByRole('button', { name: 'Dragon' });

    expect(allTypes).toBeInTheDocument();
    expect(eleType).toBeInTheDocument();
    expect(eleType).toHaveAttribute(testtype, poketypebutton);
    expect(firType).toBeInTheDocument();
    expect(firType).toHaveAttribute(testtype, poketypebutton);
    expect(bugType).toBeInTheDocument();
    expect(bugType).toHaveAttribute(testtype, poketypebutton);
    expect(poiType).toBeInTheDocument();
    expect(poiType).toHaveAttribute(testtype, poketypebutton);
    expect(psyType).toBeInTheDocument();
    expect(psyType).toHaveAttribute(testtype, poketypebutton);
    expect(norType).toBeInTheDocument();
    expect(norType).toHaveAttribute(testtype, poketypebutton);
    expect(draType).toBeInTheDocument();
    expect(draType).toHaveAttribute(testtype, poketypebutton);

    const elePokes = [/Pikachu/];
    const firPokes = [/Charmander/, /Rapidash/];
    const bugPokes = [/Caterpie/];
    const poiPokes = [/Ekans/];
    const psyPokes = [/Alakazam/, /Mew/];
    const norPokes = [/Snorlax/];
    const draPokes = [/Dragonair/];

    const arrPokeTypes = [arrPokes, elePokes, firPokes, bugPokes,
      poiPokes, psyPokes, norPokes, draPokes];

    const arrTypes = ['All', 'Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];

    for (let a = 0; a < arrTypes.length; a += 1) {
      const typeButton = screen.getByRole('button', { name: arrTypes[a] });
      userEvent.click(typeButton);
      for (let b = 0; b < arrPokeTypes[a].length; b += 1) {
        const pokemon = screen.getByText(arrPokeTypes[a][b]);
        expect(pokemon).toBeInTheDocument();

        const allButton = screen.getByRole('button', { name: 'All' });
        expect(allButton).toBeInTheDocument();

        const nextPokeButton = screen.getByRole('button', { name: prox });
        expect(nextPokeButton).toBeInTheDocument();
        userEvent.click(nextPokeButton);
      }
    }
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    for (let a = 1; a < arrPokes.length; a += 1) {
      const nextPokeButton = screen.getByRole('button', { name: prox });
      expect(nextPokeButton).toBeInTheDocument();
      userEvent.click(nextPokeButton);

      const pokemon = screen.getByText(arrPokes[a]);
      expect(pokemon).toBeInTheDocument();
    }
  });
});
