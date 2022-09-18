import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import { cleanupDoc, expectToThrow } from '../testUtils';

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});

it('can create a new user and delete them', async () => {
  const userRepository = UserRepository.getRepo();
  const newUser = new User('testUserName');
  const createResult = await userRepository.insertNew(newUser);
  expect(createResult.acknowledged).toBeTruthy();

  await cleanupDoc(userRepository, newUser);
});

it('throws if a user is created with a duplicate username', async () => {
  const userRepository = UserRepository.getRepo();
  const newUser1 = new User('duplicateUserName');
  const newUser2 = new User('duplicateUserName');

  const insertResult = await userRepository.insertNew(newUser1);
  expect(insertResult.acknowledged).toBeTruthy();

  await expectToThrow(async () => {
    await userRepository.insertNew(newUser2);
  });

  await cleanupDoc(userRepository, newUser1);
});

it('throws if a user is updated with a username that already exists', async () => {
  const userRepository = UserRepository.getRepo();
  const newUser = new User('duplicateUserName');
  const otherUserName = 'userName2';
  const userWithOtherUserName = new User(otherUserName);

  // Insert the users
  const insertResult1 = await userRepository.insertNew(newUser);
  expect(insertResult1.acknowledged).toBeTruthy();
  const insertResult2 = await userRepository.insertNew(userWithOtherUserName);
  expect(insertResult2.acknowledged).toBeTruthy();

  // Try to update the first user
  newUser.userName = otherUserName;
  await expectToThrow(async () => {
    await userRepository.update(newUser);
  });

  await Promise.all([
    cleanupDoc(userRepository, newUser),
    cleanupDoc(userRepository, userWithOtherUserName)
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
it.only('can delete all users', async () => {
  const userRepository = UserRepository.getRepo();
  const result = await userRepository.deleteAll();
  expect(result.acknowledged).toBeTruthy();
});
