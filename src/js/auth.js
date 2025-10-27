import { signIn, signUp, signOut, getCurrentUser } from 'aws-amplify/auth';

export class AuthService {
  static async login(username, password) {
    try {
      const user = await signIn({ username, password });
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async register(username, password, email) {
    try {
      const user = await signUp({
        username,
        password,
        options: { userAttributes: { email } }
      });
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async logout() {
    try {
      await signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getCurrentUser() {
    try {
      const user = await getCurrentUser();
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}