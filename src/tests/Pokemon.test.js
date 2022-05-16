import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const details = 'More details';

describe('Teste do componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com o nome correto do pokémon', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    // O nome correto do pokémon deve ser mostrado na tela;
    const moreDetails = screen.getByRole('link', { name: details });
    userEvent.click(moreDetails);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.textContent).toBe(pokemons[0].name);

    // O tipo correto do pokémon deve ser mostrado na tela.
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType);
    expect(pokeType.textContent).toBe(pokemons[0].type);

    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.textContent)
      .toBe(`Average weight: ${pokemons[0]
        .averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`);

    //  imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite
    const allImages = screen.getAllByRole('img');
    const pokeImg = allImages[0];
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe(`${pokeName.textContent} sprite`);
  });
  test('Teste se o card do pokémon indicado na Pokédex contém'
  + ' um link de navegação para exibir detalhes deste pokémon.', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const moreDetails = screen.getByRole('link', { name: details });
    expect(moreDetails.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const moreDetails = screen.getByRole('link', { name: details });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    const fav = screen.getAllByRole('img');
    expect(fav[1].src).toBe('http://localhost/star-icon.svg');

    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon exibido.
    expect(fav[1].alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
