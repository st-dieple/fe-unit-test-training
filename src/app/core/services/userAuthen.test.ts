import { UserAuthen } from './userAuthen';

const user = new UserAuthen();

describe('UserAuthen Class', () => {
  const mockKey = 'token';
  const mockValue = '1/fFAGRNJru1FTz70BzhT3Zg';
  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
  const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
  test('User Login', () => {
    user.logIn(mockValue);
    expect(mockSetItem).toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalledWith(mockKey, mockValue);
  });
  test('User Logout', () => {
    user.logOut();
    expect(mockRemoveItem).toHaveBeenCalled();
  });
})
