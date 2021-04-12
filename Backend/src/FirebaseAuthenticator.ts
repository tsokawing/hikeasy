import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from './entity/User';
import { HikEasyApp } from './HikEasyApp';

export class FirebaseAuthenticator {
  /**
   * Midleware. Authenticates the user from the token in the header.
   * @param req
   * @param res
   * @param next
   */
  static authenticate(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('jwt', { session: false })(req, res, next);
  }

  static extractFirebaseIdFromAuth(req: Request): string | undefined {
    interface TempUser {
      user_id: string;
    }
    const firebaseID = (req.user as TempUser)['user_id'] ?? undefined;
    return firebaseID;
  }

  /**
   * AFTER AUTHENTICATION, loads the user from the database with the given Firebase user ID.
   * @param req
   * @returns
   */
  static async extractProperUserFromAuth(
    req: Request
  ): Promise<User | undefined> {
    // Firebase authentication passed
    // based on the userID, find back the user ID and return it
    if (HikEasyApp.Instance?.EntityManager === undefined) {
      return undefined;
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
