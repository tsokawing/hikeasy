/*
  What: This is used to remove private information from User entity instances
  Who: Wong Wing Yan 1155125194
  Where: backend connection
  Why: Data privacy, do not want anyone to needlessly know user details; also to reduce code redundancy, User entity may appear in many places
  How: JS-delete the related attributes from the JS object
*/

//imports
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
