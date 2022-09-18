import BaseDocument from 'shared/types/BaseDocument';
import BaseRepository from 'src/repositories/BaseRepository';

export async function expectToThrow(func: () => Promise<void>) {
  let threwError = false;
  try {
    await func();
  } catch {
    threwError = true;
  }
  expect(threwError).toBeTruthy();
}

/**
 * Removes the provided doc from the DB
 */
export async function cleanupDoc<TDocType extends BaseDocument>(
  repo: BaseRepository<TDocType>,
  doc: TDocType
) {
  const deleteResult = await repo.delete(doc._id);
  expect(deleteResult.acknowledged).toBeTruthy();
  const findResult = await repo.get({ _id: doc._id } as Partial<TDocType>);
  expect(findResult).toBeNull();
}
