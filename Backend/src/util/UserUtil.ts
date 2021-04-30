/*
  What: This is used to hide private information regarding the /user endpoint
  Who: Wong Wing Yan 1155125194
  Where: backend connection
  Why: Gather all the part to hide private information in /user endpoint to avoid redundanrt code segment
  How: use typescript to set up the template to notify error
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
