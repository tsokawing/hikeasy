/*
  What: This is used to handle Firebase Authentication
  Who: Wong Wing Yan 1155125194
  Where: backend firebase connection
  Why: We need to authenicate the user when using the service regarding HikEasy
  How: Conveniently use relevant Passport Strategy from the passport module to authenticate our Firebase JWTs
*/

//imports
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from './entity/User';
import { HikEasyApp } from './HikEasyApp';
import { ResponseUtil } from './util/ResponseUtil';

export class FirebaseAuthenticator {
  /**
   * Midleware. Authenticates the user from the token in the header.
   * @param req
   * @param res
   * @param next
   */
  //parse out the JWT token
  static authenticate(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('jwt', { session: false })(req, res, next);
  }
  // encode the information in format that suits the firebase
  static extractFirebaseIdFromAuth(req: Request): string | undefined {
    interface TempUser {
      user_id: string;
    }
    const firebaseID = (req.user as TempUser)['user_id'] ?? undefined;
    return firebaseID;
  }

  /**
   * AFTER AUTHENTICATION, loads the user from the database with the given Firebase user ID.
   * WILL THROW EXCEPTIONS directly as a string:
   * - ResponseUtil.ERROR_DATABASE_UNREACHABLE (when database is unreachable)
   * @param req
   * @returns
   */
  //extracting the JWT token for the firebase
  static async extractProperUserFromAuth(
    req: Request
  ): Promise<User | undefined> {
    // Firebase authentication passed
    // based on the userID, find back the user ID and return it
    if (HikEasyApp.Instance?.EntityManager === undefined) {
      throw ResponseUtil.ERROR_DATABASE_UNREACHABLE;
    }
    // database is ready, now lets check the stuff
    const firebaseID = FirebaseAuthenticator.extractFirebaseIdFromAuth(req);
    if (firebaseID === undefined) {
      return undefined;
    }
    const userObject = await HikEasyApp.Instance.EntityManager.findOne(User, {
      where: { firebaseId: firebaseID },
    });
    if (userObject === undefined) {
      return undefined;
    }
    return userObject;
  }
}
