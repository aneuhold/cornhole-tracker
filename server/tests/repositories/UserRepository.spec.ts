import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';

it('can create a new user', async () => {
  const newUser = new User('testUserName');
  const result = await UserRepository.insertNewUser(newUser);
  expect(result.acknowledged).toBeTruthy();
});

it('can create a new user2', async () => {
  const newUser = new User('testUserName');
  const result = await UserRepository.insertNewUser(newUser);
  expect(result.acknowledged).toBeTruthy();
});

it('can create a new user3', async () => {
  const newUser = new User('testUserName');
  const result = await UserRepository.insertNewUser(newUser);
  expect(result.acknowledged).toBeTruthy();
});

afterAll(async () => {
  return DocumentDb.closeDbConnection();
});
