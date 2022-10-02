import CornholeGame from '../_shared/types/CornholeGame';
import User from '../_shared/types/User';
import CornholeTeam from '../_shared/types/CornholeTeam';

export default class LocalData {
  /**
   * A prefix before all stored key names in case cache busting needs to happen
   * at some point.
   */
  private static PREFIX = 'v1-';

  private static storedKeyNames = {
    users: `${this.PREFIX}users`,
    user: `${this.PREFIX}user`,
    cornholeGames: `${this.PREFIX}cornholeGames`,
    cornholeTeams: `${this.PREFIX}cornholeTeams`
  };

  private static storeValue(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  private static getValue(key: string) {
    return window.localStorage.getItem(key);
  }

  static set users(newUsers: Partial<User>[]) {
    this.storeValue(LocalData.storedKeyNames.users, JSON.stringify(newUsers));
  }

  static get users(): Partial<User>[] {
    const currentlyStoredValue = this.getValue(LocalData.storedKeyNames.users);
    if (currentlyStoredValue && currentlyStoredValue !== '') {
      return JSON.parse(currentlyStoredValue);
    }
    return [];
  }

  static set user(newUser: Partial<User>) {
    this.storeValue(LocalData.storedKeyNames.user, JSON.stringify(newUser));
  }

  /**
   * The user currently in localStorage.
   *
   * If the user does not exist yet, then this returns an empty object.
   */
  static get user(): Partial<User> {
    const currentlyStoredValue = this.getValue(LocalData.storedKeyNames.user);
    if (currentlyStoredValue && currentlyStoredValue !== '') {
      return JSON.parse(currentlyStoredValue);
    }
    return {};
  }

  static set cornholeGames(updatedCornholeGames: CornholeGame[]) {
    this.storeValue(LocalData.storedKeyNames.cornholeGames, JSON.stringify(updatedCornholeGames));
  }

  static get cornholeGames(): CornholeGame[] {
    const currentlyStoredValue = this.getValue(LocalData.storedKeyNames.cornholeGames);
    if (currentlyStoredValue && currentlyStoredValue !== '') {
      return JSON.parse(currentlyStoredValue);
    }
    return [];
  }

  static set cornholeTeams(updatedCornholeTeams: CornholeTeam[]) {
    this.storeValue(LocalData.storedKeyNames.cornholeTeams, JSON.stringify(updatedCornholeTeams));
  }

  static get cornholeTeams(): CornholeTeam[] {
    const currentlyStoredValue = this.getValue(LocalData.storedKeyNames.cornholeTeams);
    if (currentlyStoredValue && currentlyStoredValue !== '') {
      return JSON.parse(currentlyStoredValue);
    }
    return [];
  }
}
