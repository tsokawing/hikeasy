import { User } from '../entity/User';

export class UserUtil {
  /**
   * In-place removal of sensitive info from the user project
   * @param user
   */
  static stripSensitiveInfo(user: User): void {
    delete user.firebaseId;
    delete user.email;
    delete user.password;
  }
}
