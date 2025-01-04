import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {State} from '../../models/state.ts';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUserData = (state: State) => state[NameSpace.User].userData;
