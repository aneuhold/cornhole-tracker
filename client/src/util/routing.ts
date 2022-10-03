import { goto } from '$app/navigation';

export enum RoutePath {
  login = '/login',
  app = '/app',
  createAccount = '/createaccount'
}

export function routeTo(path: RoutePath, updateBrowserNavStack = true) {
  goto(path, {
    replaceState: !updateBrowserNavStack
  });
}
