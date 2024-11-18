import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

export const localLogin = (email: string, password: string): boolean => {
  const user = AuthService.getLocalUser(email, password);
  if (user) {
    UserService.setUser(user);
    return true;
  }
  return false;
};
