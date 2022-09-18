import { ObjectId } from 'bson';
import CornholeGame, { FourPlayerPositioning } from 'shared/types/CornholeGame';
import User from 'shared/types/User';
import CornholeGameRepository from 'src/repositories/CornholeGameRepository';
import CornholeTeamRepository from 'src/repositories/CornholeTeamRepository';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import CornholeTeam from 'src/_shared/types/CornholeTeam';
import { cleanupDoc, cleanupDocs, expectToThrow } from '../testUtils';

/**
 * Valid cornhole teams that are backed up in the DB for use in these tests.
 */
let validCornholeTeams: CornholeTeam[];
/**
 * Valid cornhole users that are backed up in the DB for use in these tests.
 */
let validTeamUsers: User[];

it('can create a new game if the data is valid', async () => {
  const gameRepo = CornholeGameRepository.getRepo();
  const testGame = createValid4PersonCornholeGame();
  const result = await gameRepo.insertNew(testGame);
  expect(result.acknowledged).toBeTruthy();

  await cleanupDoc(gameRepo, testGame);
});

it('throws if a game is created with an owner that doesnt exist', async () => {
  const gameRepo = CornholeGameRepository.getRepo();
  const testGame = createValid4PersonCornholeGame();

  testGame.owner = new ObjectId();
  await expectToThrow(async () => {
    await gameRepo.insertNew(testGame);
  });
});

it('throws if a game is created with points less than 1', async () => {
  const gameRepo = CornholeGameRepository.getRepo();
  const testGame = createValid4PersonCornholeGame();

  testGame.pointsToWin = -31;
  await expectToThrow(async () => {
    await gameRepo.insertNew(testGame);
  });
  testGame.pointsToWin = 0;
  await expectToThrow(async () => {
    await gameRepo.insertNew(testGame);
  });
});

/**
 * Deletes all games!
 *
 * Make sure that the local DB you are working on doesn't have important
 * state before turning skip off on this one.
 *
 * To just do a cleanup, put `only` after `it`. So `it.only`
 */
it.skip('can delete all games', async () => {
  const gameRepo = CornholeGameRepository.getRepo();
  const result = await gameRepo.deleteAll();
  expect(result.acknowledged).toBeTruthy();
});

/**
 * Jest needs the function to return a promise in order to wait on it.
 */
beforeAll(async () => {
  const teamRepo = CornholeTeamRepository.getRepo();
  const userRepo = UserRepository.getRepo();

  // Create the users on the teams
  const newUsers: User[] = [];
  for (let i = 1; i <= 4; i += 1) {
    newUsers.push(new User(`CornholeGameTestsUserName${i}`));
  }
  const newUserPromises = newUsers.map((user) => userRepo.insertNew(user));
  await Promise.all(newUserPromises);

  // Create the teams
  const newTeams: CornholeTeam[] = [];
  for (let i = 0; i < 2; i += 1) {
    const teamPlayerIds = [newUsers[i * 2]._id, newUsers[i * 2 + 1]._id];
    newTeams.push(
      new CornholeTeam(
        `CornholeGameTests Team Name ${i}`,
        teamPlayerIds,
        newUsers[0]._id
      )
    );
  }
  const newTeamPromises = newTeams.map((team) => teamRepo.insertNew(team));
  await Promise.all(newTeamPromises);
  validCornholeTeams = newTeams;
  validTeamUsers = newUsers;
});

afterAll(async () => {
  const teamRepo = CornholeTeamRepository.getRepo();
  const userRepo = UserRepository.getRepo();
  const teamCleanupPromise = cleanupDocs(teamRepo, validCornholeTeams);
  const userCleanupPromise = cleanupDocs(userRepo, validTeamUsers);
  await Promise.all([teamCleanupPromise, userCleanupPromise]);
  await DocumentDb.closeDbConnection();
});

/**
 * Creates a valid {@link CornholeGame} for modification in testing.
 */
function createValid4PersonCornholeGame(): CornholeGame {
  const validTeamIds = validCornholeTeams.map((team) => team._id);
  const fourPlayerPoisitioning: FourPlayerPositioning = {
    board1Players: [validTeamUsers[0]._id, validTeamUsers[2]._id],
    board2Players: [validTeamUsers[1]._id, validTeamUsers[3]._id]
  };
  return new CornholeGame(
    validTeamIds,
    validTeamUsers[0]._id,
    fourPlayerPoisitioning
  );
}
