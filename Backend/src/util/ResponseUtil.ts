import { Response } from 'express';

/**
 * A util class that handles the printing of common JSON response messages (usually error messages).
 */
export class ResponseUtil {
  public static readonly ERROR_INVALID_TRAIL_ID = 'Invalid trail ID';
  public static readonly ERROR_INVALID_DIFFICULTY = 'Invalid difficulty';

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

  public static respondWithError(res: Response, message: string): void {
    this.respondWithStandardizedJson(res, false, message);
  }

  public static respondWithInvalidTrailID(res: Response): void {
    this.respondWithError(res, this.ERROR_INVALID_TRAIL_ID);
  }

  public static respondWithInvalidDifficulty(res: Response): void {
    this.respondWithError(res, this.ERROR_INVALID_DIFFICULTY);
  }
}
