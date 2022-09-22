import { ObjectId } from 'bson';
import crypto from 'crypto';
import CornholeTeamRepository from 'src/repositories/CornholeTeamRepository';
import TempPlayerRepository from 'src/repositories/TempPlayerRepository';
import UserRepository from 'src/repositories/UserRepository';
import DocumentDb from 'src/util/DocumentDb';
import CornholeTeam from 'src/_shared/types/CornholeTeam';
import TempPlayer from 'src/_shared/types/TempPlayer';
import User from 'src/_shared/types/User';
import { cleanupDoc, cleanupDocs, expectToThrow } from '../testUtils';

/**
 * Valid cornhole users that are backed up in the DB for use in these tests.
 */
const validTeamUsers: User[] = [];
const validTeamTempPlayers: TempPlayer[] = [];

const teamRepo = CornholeTeamRepository.getRepo();
const userRepo = UserRepository.getRepo();
const tempPlayerRepo = TempPlayerRepository.getRepo();

describe('Create operations', () => {
  it('can create a team of temp players if the data is valid', async () => {
    console.log(
      JSON.stringify([validTeamUsers, validTeamTempPlayers], null, 2)
    );
    const testTeam = createValidCornholeTeamWithTempPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    await cleanupDoc(teamRepo, testTeam);
  });

  it('can create a team of users if the data is valid', async () => {
    const testTeam = createValidCornholeTeamWithUsers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    await cleanupDoc(teamRepo, testTeam);
  });

  it('can create a team of 1 player and 1 user if the data is valid', async () => {
    const testTeam = createValidCornholeTeamWithBothTypesOfPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    await cleanupDoc(teamRepo, testTeam);
  });

  it('can create a team of 1 tempPlayer if the data is valid', async () => {
    const testTeam = createValidCornholeTeamWith1TempPlayer();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    await cleanupDoc(teamRepo, testTeam);
  });

  it('throws if a team of 1 user is created, because all users should have their own team', async () => {
    const testTeam = createValidCornholeTeam([validTeamUsers[0]._id]);
    await expectToThrow(async () => {
      await teamRepo.insertNew(testTeam);
    });
  });

  it('throws if a team is created with an owner that doesnt exist', async () => {
    const testTeam = createValidCornholeTeamWithBothTypesOfPlayers();

    testTeam.owner = new ObjectId();
    await expectToThrow(async () => {
      await teamRepo.insertNew(testTeam);
    });
  });

  it('throws if a team is created with players that dont exist', async () => {
    const testTeam = createValidCornholeTeam([new ObjectId(), new ObjectId()]);

    await expectToThrow(async () => {
      await teamRepo.insertNew(testTeam);
    });
  });
});

describe('Update operations', () => {
  it('can update a team if valid data is provided', async () => {
    const testTeam = createValidCornholeTeamWithTempPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    testTeam.color = 'yellow';
    const updateResult = await teamRepo.update(testTeam);
    expect(updateResult.acknowledged).toBeTruthy();

    await cleanupDoc(teamRepo, testTeam);
  });

  it('throws if a team is updated with a player that doesnt exist', async () => {
    const testTeam = createValidCornholeTeamWithTempPlayers();
    const result = await teamRepo.insertNew(testTeam);
    expect(result).toBeTruthy();

    testTeam.players = [new ObjectId()];

    await expectToThrow(async () => {
      await teamRepo.update(testTeam);
    });

    await cleanupDoc(teamRepo, testTeam);
  });
});

const createValidCornholeTeamWithTempPlayers = () =>
  createValidCornholeTeam(validTeamTempPlayers.map((x) => x._id));

const createValidCornholeTeamWithUsers = () =>
  createValidCornholeTeam(validTeamUsers.map((x) => x._id));

const createValidCornholeTeamWithBothTypesOfPlayers = () =>
  createValidCornholeTeam([validTeamTempPlayers[0]._id, validTeamUsers[0]._id]);

const createValidCornholeTeamWith1TempPlayer = () =>
  createValidCornholeTeam([validTeamTempPlayers[0]._id]);

const createValidCornholeTeam = (players: ObjectId[]) =>
  new CornholeTeam('Some Test Team Name', players, validTeamUsers[0]._id);

/**
 * Creates the valid test users and tempPlayers
 */
beforeAll(async () => {
  for (let i = 0; i < 2; i += 1) {
    validTeamUsers.push(new User(crypto.randomUUID()));
  }
  for (let i = 0; i < 2; i += 1) {
    validTeamTempPlayers.push(new TempPlayer(crypto.randomUUID()));
  }
  const newUserPromises = validTeamUsers.map((user) =>
    userRepo.insertNew(user)
  );
  const newTempPlayerPromises = validTeamTempPlayers.map((tempPlayer) =>
    tempPlayerRepo.insertNew(tempPlayer)
  );
  const results = await Promise.all([
    ...newUserPromises,
    ...newTempPlayerPromises
  ]);
  results.forEach((result) => {
    expect(result).toBeTruthy();
  });
});

afterAll(async () => {
  const tempPlayerCleanupPromise = cleanupDocs(
    tempPlayerRepo,
    validTeamTempPlayers
  );
  const userCleanupPromise = cleanupDocs(userRepo, validTeamUsers);
  await Promise.all([tempPlayerCleanupPromise, userCleanupPromise]);
  await DocumentDb.closeDbConnection();
});
