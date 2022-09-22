import crypto from 'crypto';
import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import { cleanupDoc } from '../testUtils';

it('can create a new document and delete it', async () => {
  const userRepository = UserRepository.getRepo();
  const newUser = new User(crypto.randomUUID());
  const createResult = await userRepository.insertNew(newUser);
  expect(createResult).toBeTruthy();

  await cleanupDoc(userRepository, newUser);
});

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});
