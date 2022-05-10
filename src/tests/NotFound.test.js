import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página exibe um <h2> com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const aboutTitle = screen.getByText(/Page requested not found/);
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const notFounndImgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = screen.getByRole('img', { name: /Pikachu crying/ });

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', notFounndImgSrc);
  });
});
