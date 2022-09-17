import { UUID } from 'bson';
import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import { Controller, Get, Path, Route, SuccessResponse } from 'tsoa';

/**
 * Just handles status requests
 */
@Route('users')
export class UserController extends Controller {
  /**
   * Gets the user with the provided userId.
   */
  @Get('{userId}')
  @SuccessResponse('200')
  public async getUser(@Path() userId: UUID): Promise<User | string> {
    const userDoc = await UserRepository.getUser(userId);
    if (userDoc) {
      this.setStatus(200);
      return userDoc;
    }
    this.setStatus(400);
    return `User with ID ${userId} not found.`;
  }

  /**
   * Gets all users.
   */
  @Get('/')
  @SuccessResponse('200')
  public async getAllUsers(): Promise<User[]> {
    const userDocs = await UserRepository.getAllUsers();
    this.setStatus(200);
    return userDocs;
  }
}
