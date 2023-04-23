import { AuthStorageService } from './authStorage.service';

const authStorageService = new AuthStorageService();
describe('Test Auth Storage Service', () => {
  const mockKey = 'token';
  const mockValue = '1/fFAGRNJru1FTz70BzhT3Zg';
  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
  const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
  test('Set token method is called', () => {
    authStorageService.setToken(mockValue);
    expect(mockSetItem).toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalledWith(mockKey, mockValue);
  });
  it('Get token method is called', () => {
    authStorageService.getToken();
    expect(mockGetItem).toHaveBeenCalled();
  });
  test('Remove Token', () => {
    authStorageService.removeToken();
    expect(mockRemoveItem).toHaveBeenCalled();
  });
});
