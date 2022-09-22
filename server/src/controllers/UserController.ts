import { ObjectId } from 'bson';
import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import {
  Body,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags
} from 'tsoa';
import BaseDocumentController from './BaseDocumentController';

/**
 * Handles operations related to users.
 */
@Route('users')
@Tags('Users')
export class UserController extends BaseDocumentController<User> {
  private userRepo: UserRepository = UserRepository.getRepo();

  /**
   * @summary Gets the user with the provided userId.
   */
  @Get('{userId}')
  @SuccessResponse('200')
  public async get(@Path() userId: ObjectId): Promise<User | null> {
    return this.baseGet(this.userRepo, { _id: userId });
  }

  /**
   * @summary Gets all users.
   */
  @Get('/')
  @SuccessResponse('200')
  public async getAll(): Promise<User[]> {
    return this.userRepo.getAll();
  }

  /**
   * @summary Gets a list of users with the provided IDs.
   */
  @Post('/list')
  @SuccessResponse('200')
  getList(@Body() userIds: ObjectId[]): Promise<User[]> {
    return this.userRepo.getList(userIds);
  }

  /**
   * @summary Deletes a user.
   */
  @Delete('{userId}')
  @SuccessResponse('204')
  public async delete(@Path() userId: ObjectId) {
    return this.baseDelete(this.userRepo, userId);
  }

  /**
   * @summary Updates the provided user with any new values.
   */
  @SuccessResponse('200')
  @Patch('/')
  public async update(@Body() user: User) {
    return this.baseUpdate(this.userRepo, user);
  }

  /**
   * @summary Creates a new user with the properties defined in the body.
   */
  @SuccessResponse('204')
  @Post('/')
  create(@Body() user: User): Promise<User | null> {
    return this.userRepo.insertNew(user);
  }
}
