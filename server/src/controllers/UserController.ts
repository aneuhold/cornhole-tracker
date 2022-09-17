import { UUID } from 'bson';
import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Route,
  SuccessResponse
} from 'tsoa';

/**
 * Handles operations related to users.
 */
@Route('users')
export class UserController extends Controller {
  /**
   * Gets the user with the provided userId.
   */
  @Get('{userId}')
  @SuccessResponse('200')
  public async getUser(@Path() userId: UUID): Promise<User | null> {
    const userDoc = await UserRepository.getUser(userId);
    if (userDoc) {
      return userDoc;
    }
    this.setStatus(400);
    return userDoc;
  }

  /**
   * Gets all users.
   */
  @Get('/')
  @SuccessResponse('200')
  public async getAllUsers(): Promise<User[]> {
    return UserRepository.getAllUsers();
  }

  /**
   * Deletes a user.
   */
  @Delete('{userId}')
  @SuccessResponse('204')
  public async deleteUser(@Path() userId: UUID) {
    return UserRepository.deleteUser(userId);
  }

  /**
   * Updates the provided user with any new values. Update operations.
   */
  @Patch(`/`)
  public async updateUser(@Body() user: User) {}
}
