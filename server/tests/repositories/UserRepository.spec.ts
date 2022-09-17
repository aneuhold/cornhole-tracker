import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';

it('can create a new user and delete them', async () => {
  const newUser = new User('testUserName');
  const createResult = await UserRepository.insertNewUser(newUser);
  expect(createResult.acknowledged).toBeTruthy();

  // Delete the new user
  const deleteResult = await UserRepository.deleteUser(newUser.id);
  expect(deleteResult.acknowledged).toBeTruthy();
  const findResult = await UserRepository.getUser(newUser.id);
  expect(findResult).toBeNull();
});

/**
 * Deletes all users!
 *
 * Make sure that the local DB you are working on doesn't have important
 * state before turning skip off on this one.
 */
it.skip('can delete all users', async () => {
  const result = await UserRepository.deleteAllUsers();
  expect(result.acknowledged).toBeTruthy();
});

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});
