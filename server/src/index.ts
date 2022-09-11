import 'module-alias/register';
import User from 'shared/types/User';
import UserRepository from './repositories/UserRepository';
import DocumentDb from './util/DocumentDb';

async function main() {
  console.log('The server is beginning to start...');
  const newUser = new User('someTestUser');
  const result = await UserRepository.insertNewUser(newUser);
  console.log(result);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    DocumentDb.closeDbConnection();
  });
