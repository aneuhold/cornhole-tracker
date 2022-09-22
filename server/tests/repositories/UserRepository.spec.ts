import crypto from 'crypto';
import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import { cleanupDoc, expectToThrow } from '../testUtils';

const userRepo = UserRepository.getRepo();

describe('Create operations', () => {
  it('throws if the username is a duplicate username', async () => {
    const duplicateUserName = `${crypto.randomUUID()}`;
    const newUser1 = new User(duplicateUserName);
    const newUser2 = new User(duplicateUserName);

    const insertResult = await userRepo.insertNew(newUser1);
    expect(insertResult).toBeTruthy();

    await expectToThrow(async () => {
      await userRepo.insertNew(newUser2);
    });

    await cleanupDoc(userRepo, newUser1);
  });
});

describe('Update operations', () => {
  it('succeeds in updating the username if the username doesnt already exist', async () => {
    const userName1 = crypto.randomUUID();
    const userName2 = crypto.randomUUID();
    const newUser = new User(userName1);

    // Insert the user
    const insertResult = await userRepo.insertNew(newUser);
    expect(insertResult).toBeTruthy();

    // Try to update the user
    newUser.userName = userName2;
    const updateResult = await userRepo.update(newUser);
    expect(updateResult.acknowledged).toBeTruthy();

    await cleanupDoc(userRepo, newUser);
  });

  it('throws if no id is defined', async () => {
    const newUser = new User(crypto.randomUUID()) as Partial<User>;
    delete newUser._id;
    await expectToThrow(async () => {
      await userRepo.update(newUser);
    });
  });

  it('throws if the username is updated and already exists', async () => {
    const userName1 = crypto.randomUUID();
    const userName2 = crypto.randomUUID();
    const newUser = new User(userName1);
    const userWithOtherUserName = new User(userName2);

    // Insert the users
    const insertResult1 = await userRepo.insertNew(newUser);
    expect(insertResult1).toBeTruthy();
    const insertResult2 = await userRepo.insertNew(userWithOtherUserName);
    expect(insertResult2).toBeTruthy();

    // Try to update the first user
    newUser.userName = userName2;
    await expectToThrow(async () => {
      await userRepo.update(newUser);
    });

    await Promise.all([
      cleanupDoc(userRepo, newUser),
      cleanupDoc(userRepo, userWithOtherUserName)
    ]);
  });

  it('throws if the user doesnt exist', async () => {
    const newUser = new User(crypto.randomUUID());

    // Try to update the user
    await expectToThrow(async () => {
      await userRepo.update(newUser);
    });
  });
});

/**
 * Deletes all users!
 *
 * Make sure that the local DB you are working on doesn't have important
 * state before turning skip off on this one.
 *
 * To just do a cleanup, put `only` after `it`. So `it.only('can delete all users'`
 */
it.skip('can delete all users', async () => {
  const result = await userRepo.deleteAll();
  expect(result.acknowledged).toBeTruthy();
});

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});
