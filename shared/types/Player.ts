import BaseDocument from './BaseDocument';

/**
 * A generalization of users and players in the software.
 */
export default interface Player extends BaseDocument {
  name?: string;
  userName: string;
}
