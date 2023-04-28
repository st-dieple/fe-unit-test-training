import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import User from '../src/components/User';
import { API_DOMAIN } from '../src/shared/constant';

const DUMMY_USER = {
  'id': 3,
  'name': 'Clementine Bauch',
  'username': 'Samantha',
  'email': 'Nathan@yesenia.net',
  'address': {
    'street': 'Douglas Extension',
    'suite': 'Suite 847',
    'city': 'McKenziehaven',
    'zipcode': '59590-4157',
    'geo': {
      'lat': '-68.6102',
      'lng': '-47.0653'
    }
  },
  'phone': '1-463-123-4447',
  'website': 'ramiro.info',
  'company': {
    'name': 'Romaguera-Jacobson',
    'catchPhrase': 'Face to face bifurcated interface',
    'bs': 'e-enable strategic applications'
  }
};

const server = setupServer(
  rest.get(`${API_DOMAIN}/3`, (req, res, ctx) => {
    return res(ctx.json(DUMMY_USER ));
  }),
);

describe('User Information', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Show loading screen while fetching user info', () => {
    render(<User />, { wrapper: BrowserRouter });
    expect(screen.getByRole('heading')).toHaveTextContent('User Information');
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('Get list user success', async () => {
    render(<User />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByTestId('user-info')).toBeInTheDocument();
    });

    expect(screen.getByTestId('user-name').innerHTML).toBe('Name: Clementine Bauch');
    expect(screen.getByTestId('user-email').innerHTML).toBe('Email: Nathan@yesenia.net');
    expect(screen.getByTestId('user-phone').innerHTML).toBe('Phone: 1-463-123-4447');
    expect(screen.getByTestId('user-company').innerHTML).toBe('COmpany: Romaguera-Jacobson');
  });

  test('Get list user failed', async () => {
    server.use(
      rest.get(`${API_DOMAIN}/3`, (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );
    render(<User />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('user-not-found')).toBeInTheDocument();
    });
  });
});
