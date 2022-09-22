import { ObjectId } from 'bson';
import crypto from 'crypto';
import CornholeTeamRepository from 'src/repositories/CornholeTeamRepository';
import TempPlayerRepository from 'src/repositories/TempPlayerRepository';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import CornholeTeam from 'src/_shared/types/CornholeTeam';
import TempPlayer from 'src/_shared/types/TempPlayer';
import User from 'src/_shared/types/User';
import { cleanupDocs, expectToThrow } from '../testUtils';

const teamRepo = CornholeTeamRepository.getRepo();
const userRepo = UserRepository.getRepo();
const tempPlayerRepo = TempPlayerRepository.getRepo();

const usersToCleanup: User[] = [];
const teamsToCleanup: CornholeTeam[] = [];
const tempPlayersToCleanup: TempPlayer[] = [];

let validOwner: User;

describe('Create operations', () => {
  it('can create a team of temp players if the data is valid', async () => {
    const testTeam = await createValidCornholeTeamWithTempPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    teamsToCleanup.push(testTeam);
  });

  it('can create a team of users if the data is valid', async () => {
    const testTeam = await createValidCornholeTeamWithUsers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    teamsToCleanup.push(testTeam);
  });

  it('can create a team of 1 player and 1 user if the data is valid', async () => {
    const testTeam = await createValidCornholeTeamWithBothTypesOfPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    teamsToCleanup.push(testTeam);
  });

  it('can create a team of 1 tempPlayer if the data is valid', async () => {
    const testTeam = await createValidCornholeTeamWith1TempPlayer();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    teamsToCleanup.push(testTeam);
  });

  it('throws if a team of 1 user is created, because all users should have their own team', async () => {
    const newUser = new User(crypto.randomUUID());
    const insertResult = await userRepo.insertNew(newUser);
    expect(insertResult).toBeTruthy();
    const testTeam = createCornholeTeam([newUser._id]);
    await expectToThrow(async () => {
      await teamRepo.insertNew(testTeam);
    });
    usersToCleanup.push(newUser);
  });

  it('throws if a team is created with an owner that doesnt exist', async () => {
    const testTeam = await createValidCornholeTeamWithBothTypesOfPlayers();

    testTeam.owner = new ObjectId();
    await expectToThrow(async () => {
      await teamRepo.insertNew(testTeam);
    });
  });

  it('throws if a team is created with players that dont exist', async () => {
    const testTeam = createCornholeTeam([new ObjectId(), new ObjectId()]);

    await expectToThrow(async () => {
      await teamRepo.insertNew(testTeam);
    });
  });
});

describe('Update operations', () => {
  it('can update a team if valid data is provided', async () => {
    const testTeam = await createValidCornholeTeamWithTempPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    testTeam.color = 'yellow';
    const updateResult = await teamRepo.update(testTeam);
    expect(updateResult.acknowledged).toBeTruthy();

    teamsToCleanup.push(testTeam);
  });

  it('throws if a team is updated with a player that doesnt exist', async () => {
    const testTeam = await createValidCornholeTeamWithTempPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    testTeam.players = [new ObjectId()];

    await expectToThrow(async () => {
      await teamRepo.update(testTeam);
    });

    teamsToCleanup.push(testTeam);
  });
});

async function createValidCornholeTeamWithTempPlayers() {
  const newTempPlayer1 = new User(crypto.randomUUID());
  const newTempPlayer2 = new User(crypto.randomUUID());
  const insertResults = await Promise.all([
    tempPlayerRepo.insertNew(newTempPlayer1),
    tempPlayerRepo.insertNew(newTempPlayer2)
  ]);
  insertResults.forEach((result) => {
    expect(result).toBeTruthy();
  });
  tempPlayersToCleanup.push(newTempPlayer1);
  tempPlayersToCleanup.push(newTempPlayer2);
  return createCornholeTeam([newTempPlayer1._id, newTempPlayer2._id]);
}

async function createValidCornholeTeamWithUsers() {
  const newUser1 = new User(crypto.randomUUID());
  const newUser2 = new User(crypto.randomUUID());
  const insertResults = await Promise.all([
    userRepo.insertNew(newUser1),
    userRepo.insertNew(newUser2)
  ]);
  insertResults.forEach((result) => {
    expect(result).toBeTruthy();
  });
  usersToCleanup.push(newUser1);
  usersToCleanup.push(newUser2);
  return createCornholeTeam([newUser1._id, newUser2._id]);
}

async function createValidCornholeTeamWithBothTypesOfPlayers() {
  const newTempPlayer = new TempPlayer(crypto.randomUUID());
  const newUser = new User(crypto.randomUUID());
  const insertResults = await Promise.all([
    tempPlayerRepo.insertNew(newTempPlayer),
    userRepo.insertNew(newUser)
  ]);
  insertResults.forEach((result) => {
    expect(result).toBeTruthy();
  });
  tempPlayersToCleanup.push(newTempPlayer);
  usersToCleanup.push(newUser);
  return createCornholeTeam([newTempPlayer._id, newUser._id]);
}

async function createValidCornholeTeamWith1TempPlayer() {
  const newTempPlayer = new TempPlayer(crypto.randomUUID());
  const newPlayerResult = await tempPlayerRepo.insertNew(newTempPlayer);
  expect(newPlayerResult).toBeTruthy();
  tempPlayersToCleanup.push(newTempPlayer);
  return createCornholeTeam([newTempPlayer._id]);
}

const createCornholeTeam = (players: ObjectId[]) =>
  new CornholeTeam('Some Test Team Name', players, validOwner._id);

beforeAll(async () => {
  const newUser = new User(crypto.randomUUID());
  const newUserResult = await userRepo.insertNew(newUser);
  expect(newUserResult).toBeTruthy();
  if (newUserResult) {
    validOwner = newUserResult;
  } else {
    throw new Error('New user failed to be created before tests ran');
  }
});

afterAll(async () => {
  await Promise.all([
    cleanupDocs(tempPlayerRepo, tempPlayersToCleanup),
    cleanupDocs(userRepo, usersToCleanup),
    cleanupDocs(teamRepo, teamsToCleanup)
  ]);
  await DocumentDb.closeDbConnection();
});
