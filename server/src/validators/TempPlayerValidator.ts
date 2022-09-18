import TempPlayer from 'shared/types/TempPlayer';
import IValidator from './BaseValidator';

/**
 * Validates {@link TempPlayer}s.
 */
export default class TempPlayerValidator extends IValidator<TempPlayer> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateNewObject(_: TempPlayer): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateUpdateObject(_: TempPlayer): Promise<void> {}
}
