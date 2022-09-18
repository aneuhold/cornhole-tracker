import { Document, ObjectId } from 'bson';
import { InsertOneResult } from 'mongodb';
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
  SuccessResponse
} from 'tsoa';
import BaseDocumentController from './BaseDocumentController';

/**
 * Handles operations related to users.
 */
@Route('users')
export class UserController extends BaseDocumentController<User> {
  private userRepo: UserRepository = UserRepository.getRepo();

  /**
   * @summary Gets the user with the provided userId.
   */
  @Get('{userId}')
  @SuccessResponse('200')
  public async get(@Path() userId: ObjectId): Promise<User | null> {
    const userDoc = this.userRepo.get({ _id: userId });
    if (userDoc) {
      return userDoc;
    }
    this.setStatus(400);
    return userDoc;
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
   * @summary Deletes a user.
   */
  @Delete('{userId}')
  @SuccessResponse('204')
  public async delete(@Path() userId: ObjectId) {
    const result = await this.userRepo.delete(userId);
    if (result.acknowledged && result.deletedCount >= 1) {
      this.setStatus(204);
    } else {
      this.setStatus(400);
    }
    return result;
  }

  /**
   * @summary Updates the provided user with any new values.
   */
  @SuccessResponse('200')
  @Patch('/')
  public async update(@Body() user: User) {
    const response = await this.userRepo.update(user);
    if (response.acknowledged) {
      this.setStatus(200);
    } else {
      this.setStatus(400);
    }
    return response;
  }

  /**
   * @summary Creates a new user with the properties defined in the body.
   */
  @SuccessResponse('204')
  @Post('/')
  create(@Body() user: User): Promise<InsertOneResult<Document>> {
    return this.userRepo.insertNew(user);
  }
}
