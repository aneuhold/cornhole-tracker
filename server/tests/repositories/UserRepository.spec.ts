import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});

it('can create a new user and delete them', async () => {
  const userRepository = UserRepository.getRepo();
  const newUser = new User('testUserName');
  const createResult = await userRepository.insertNew(newUser);
  expect(createResult.acknowledged).toBeTruthy();

  await cleanupUser(userRepository, newUser);
});

it('throws if a user is created with a duplicate username', async () => {
  const userRepository = UserRepository.getRepo();
  const newUser1 = new User('duplicateUserName');
  const newUser2 = new User('duplicateUserName');

  const insertResult = await userRepository.insertNew(newUser1);
  expect(insertResult.acknowledged).toBeTruthy();

  let threwError = false;
  try {
    await userRepository.insertNew(newUser2);
  } catch {
    threwError = true;
  }
  expect(threwError).toBeTruthy();

  await cleanupUser(userRepository, newUser1);
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
  const userRepository = UserRepository.getRepo();
  const result = await userRepository.deleteAll();
  expect(result.acknowledged).toBeTruthy();
});

async function cleanupUser(userRepository: UserRepository, newUser: User) {
  const deleteResult = await userRepository.delete(newUser._id);
  expect(deleteResult.acknowledged).toBeTruthy();
  const findResult = await userRepository.get({ _id: newUser._id });
  expect(findResult).toBeNull();
}
