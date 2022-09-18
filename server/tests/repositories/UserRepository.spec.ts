import crypto from 'crypto';
import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import { cleanupDoc, expectToThrow } from '../testUtils';

it('throws if a user is created with a duplicate username', async () => {
  const userRepo = UserRepository.getRepo();
  const duplicateUserName = `${crypto.randomUUID()}`;
  const newUser1 = new User(duplicateUserName);
  const newUser2 = new User(duplicateUserName);

  const insertResult = await userRepo.insertNew(newUser1);
  expect(insertResult.acknowledged).toBeTruthy();

  await expectToThrow(async () => {
    await userRepo.insertNew(newUser2);
  });

  await cleanupDoc(userRepo, newUser1);
});

it('throws if a user is updated with a username that already exists', async () => {
  const userRepo = UserRepository.getRepo();
  const userName1 = crypto.randomUUID();
  const userName2 = crypto.randomUUID();
  const newUser = new User(userName1);
  const userWithOtherUserName = new User(userName2);

  // Insert the users
  const insertResult1 = await userRepo.insertNew(newUser);
  expect(insertResult1.acknowledged).toBeTruthy();
  const insertResult2 = await userRepo.insertNew(userWithOtherUserName);
  expect(insertResult2.acknowledged).toBeTruthy();

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

/**
 * Deletes all users!
 *
 * Make sure that the local DB you are working on doesn't have important
 * state before turning skip off on this one.
 *
 * To just do a cleanup, put `only` after `it`. So `it.only('can delete all users'`
 */
it.skip('can delete all users', async () => {
  const userRepo = UserRepository.getRepo();
  const result = await userRepo.deleteAll();
  expect(result.acknowledged).toBeTruthy();
});

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});
