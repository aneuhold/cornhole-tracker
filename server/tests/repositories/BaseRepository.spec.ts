import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import { cleanupDoc } from '../testUtils';

it('can create a new document and delete it', async () => {
  const userRepository = UserRepository.getRepo();
  const newUser = new User('BaseRepositoryTestsTestUserName');
  const createResult = await userRepository.insertNew(newUser);
  expect(createResult.acknowledged).toBeTruthy();

  await cleanupDoc(userRepository, newUser);
});

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});
