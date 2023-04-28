import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserList from '../src/components/UserList';
import { DUMMY_DATA } from './constant';
import { API_DOMAIN } from '../src/shared/constant';

const server = setupServer(
  rest.get(`${API_DOMAIN}`, (req, res, ctx) => {
    return res(ctx.json([DUMMY_DATA]));
  }),
);

describe('User List Page', () => {

  test('Show loading screen while fetching list user', () => {
    render(<UserList />, { wrapper: BrowserRouter });
    expect(screen.getByRole('heading')).toHaveTextContent('User List');
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('Get list user success', async () => {
    render(<UserList />, { wrapper: BrowserRouter });
    await waitFor(() => {
      // Use `queryBy*` queries rather than `getBy*` for checking element is NOT present
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('user-list')).toBeInTheDocument();
    });
  });

  test('Get list user faild', async () => {
    server.use(
      rest.get(`${API_DOMAIN}`, (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );
    render(<UserList />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Something wrong!')).toBeInTheDocument();
    })
  });

  test('Show no data found screen', async () => {
    server.use(
      rest.get(`${API_DOMAIN}`, (req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );
    render(<UserList />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('user-no-data')).toBeInTheDocument();
    });
    
  });

});
