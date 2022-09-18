import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';

let userRepository: UserRepository;

beforeAll(async () => {
  userRepository = UserRepository.getRepo();
});

it('can create a new user and delete them', async () => {
  const newUser = new User('testUserName');
  const createResult = await userRepository.insertNew(newUser);
  expect(createResult.acknowledged).toBeTruthy();

  // Delete the new user
  const deleteResult = await userRepository.delete(newUser._id);
  expect(deleteResult.acknowledged).toBeTruthy();
  const findResult = await userRepository.get(newUser._id);
  expect(findResult).toBeNull();
});

/**
 * Deletes all users!
 *
 * Make sure that the local DB you are working on doesn't have important
 * state before turning skip off on this one.
 */
it.skip('can delete all users', async () => {
  const result = await userRepository.deleteAll();
  expect(result.acknowledged).toBeTruthy();
});

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});
