import { Response } from 'express';

/**
 * A util class that handles the printing of common JSON response messages (usually error messages).
 */
export class ResponseUtil {
  public static readonly ERROR_DATABASE_UNREACHABLE = 'Database unreachable';

  public static readonly ERROR_MISSING_USER_ID = 'Missing user ID';
  public static readonly ERROR_INVALID_USER_ID = 'Invalid user ID';

  public static readonly ERROR_MISSING_TRAIL_ID = 'Missing trail ID';
  public static readonly ERROR_INVALID_TRAIL_ID = 'Invalid trail ID';
  public static readonly ERROR_INVALID_DIFFICULTY = 'Invalid difficulty';

  public static readonly ERROR_MISSING_EVENT_ID = 'Missing event ID';
  public static readonly ERROR_INVALID_EVENT_ID = 'Invalid event ID';

  public static respondWithStandardizedJson(
    res: Response,
    success: boolean,
    message: string,
    response: unknown = undefined
  ): void {
    res.json({
      success: success,
      message: message.length > 0 ? message : undefined,
      response: response,
    });
  }

  public static respondWithError_DirectlyFromException(
    res: Response,
    message: unknown
  ): void {
    if (typeof message === 'string') {
      this.respondWithError(res, message);
    } else {
      this.respondWithError(
        res,
        'Some error occured but failed to extract error message'
      );
    }
  }

  public static respondWithError(res: Response, message: string): void {
    this.respondWithStandardizedJson(res, false, message);
  }

  public static respondWithDatabaseUnreachable(res: Response): void {
    this.respondWithError(res, this.ERROR_DATABASE_UNREACHABLE);
  }

  public static respondWithMissingUserID(res: Response): void {
    this.respondWithError(res, this.ERROR_MISSING_USER_ID);
  }

  public static respondWithInvalidUserID(res: Response): void {
    this.respondWithError(res, this.ERROR_INVALID_USER_ID);
  }

  public static respondWithMissingTrailID(res: Response): void {
    this.respondWithError(res, this.ERROR_MISSING_TRAIL_ID);
  }

  public static respondWithInvalidTrailID(res: Response): void {
    this.respondWithError(res, this.ERROR_INVALID_TRAIL_ID);
  }

  public static respondWithInvalidDifficulty(res: Response): void {
    this.respondWithError(res, this.ERROR_INVALID_DIFFICULTY);
  }

  public static respondWithMissingEventID(res: Response): void {
    this.respondWithError(res, this.ERROR_MISSING_EVENT_ID);
  }

  public static respondWithInvalidEventID(res: Response): void {
    this.respondWithError(res, this.ERROR_INVALID_EVENT_ID);
  }
}
