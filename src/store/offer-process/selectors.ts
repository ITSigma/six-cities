import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {State} from '../../models/state.ts';

export const getAuthorizationStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
