import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserList from '../src/components/UserList';
import { DUMMY_DATA } from './constant';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json([DUMMY_DATA]));
  }),
);

describe('User List Page', () => {
  
  test('Show loading screen while fetching list user', () => {
    renderWithProviders(<UserList />);
    expect(screen.getByRole('heading')).toHaveTextContent('User List');
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('Get list user success', async () => {
    render(<UserList />, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.getByTestId('user-list')).toBeInTheDocument();
    });
  });

  test('Get list user faild', async () => {
    //
  });

  test('Show no data found screen', async () => {
    //
  });

});
