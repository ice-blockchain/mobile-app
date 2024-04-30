// SPDX-License-Identifier: ice License 1.0

import {ReferralHistoryRecord} from '@api/referrals/types';
import {ReferralType, User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {CollectionActions} from '@store/modules/Collections';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import produce from 'immer';

export interface State {
  users: {
    [userId: string]: User;
  };
  data: {
    [key in ReferralType]?: {
      active: number;
      total: number;
      referrals: string[];
      nextOffset: number;
    };
  };
  history: ReferralHistoryRecord[];
  pingCounter: number;
  pingSessionUserId: string | null;
  /**
   * Set it before refs ping session.
   * It will be user to display users in the ping session.
   * Don't use it for any other purpose
   */
  pingSessionUsers: string[];
}

const getReferralsActionCreator = ReferralsActions.GET_REFERRALS({})(null);
const actionCreatorPingReferral = ReferralsActions.PING_REFERRAL(null);
type Actions = ReturnType<
  | typeof CollectionActions.SEARCH_USERS.SUCCESS.create
  | typeof getReferralsActionCreator.SUCCESS.create
  | typeof actionCreatorPingReferral.SUCCESS.create
  | typeof actionCreatorPingReferral.FAILED.create
  | typeof ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof ReferralsActions.UPDATE_PING_COUNTER.STATE.create
  | typeof ReferralsActions.PING_REFERRALS.START.create
  | typeof ReferralsActions.PING_REFERRALS.RESET.create
  | typeof ReferralsActions.UPDATE_NEXT_PING_USER_ID.STATE.create
>;

const INITIAL_STATE: State = {
  users: {},
  data: {},
  history: [],
  pingCounter: 0,
  pingSessionUserId: null,
  pingSessionUsers: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case CollectionActions.SEARCH_USERS.SUCCESS.type:
        {
          const {result} = action.payload;

          draft.users = {
            ...draft.users,
            ...result.reduce<{
              [userId: string]: User;
            }>((usersByIds, user) => {
              usersByIds[user.id] = user;
              return usersByIds;
            }, {}),
          };
        }
        break;

      case getReferralsActionCreator.SUCCESS.type:
        {
          const {referralType, nextOffset, result, isInitial} = action.payload;

          const userIds: string[] = [];
          const usersByIds: {
            [userId: string]: User;
          } = {};

          result.referrals.forEach(user => {
            usersByIds[user.id] = user;
            userIds.push(user.id);
          });

          draft.users = {
            ...draft.users,
            ...usersByIds,
          };

          if (isInitial) {
            draft.data[referralType] = {
              ...result,
              referrals: userIds,
              nextOffset,
            };
          } else {
            draft.data[referralType] = {
              ...result,
              referrals: [
                ...(state.data[referralType]?.referrals ?? []),
                ...userIds,
              ],
              nextOffset,
            };
          }

          /**
           * If its pagination loading (isInitial: false) of
           * T1 referralType type and there are new users to ping,
           * add them to the ping session queue
           */
          if (
            !isInitial &&
            referralType === 'T1' &&
            draft.pingSessionUsers.length > 0
          ) {
            const refsToAdd = result.referrals
              .filter(ref => !ref.pinged)
              .map(ref => ref.id);

            draft.pingSessionUsers = [...draft.pingSessionUsers, ...refsToAdd];
          }
        }
        break;

      case ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.type:
        draft.history = action.payload.history;
        break;

      case ReferralsActions.UPDATE_PING_COUNTER.STATE.type:
        draft.pingCounter = draft.pingCounter + 1;
        break;

      case ReferralsActions.PING_REFERRAL(null).SUCCESS.type:
      case ReferralsActions.PING_REFERRAL(null).FAILED.type:
        {
          const {userId} = action.payload;

          draft.users[userId].pinged = true;
        }
        break;

      case ReferralsActions.UPDATE_NEXT_PING_USER_ID.STATE.type:
        draft.pingSessionUserId = action.payload.userId;
        break;

      case ReferralsActions.PING_REFERRALS.START.type:
        {
          const {userId} = action.payload;
          const currentNotPingedT1Refs = (
            draft.data.T1?.referrals || []
          ).filter(id => !draft.users[id].pinged);

          // /**
          //  * Slice the array to start from the user that is being pinged
          //  */
          const index = currentNotPingedT1Refs.findIndex(id => id === userId);
          const filtered = currentNotPingedT1Refs.slice(
            index,
            currentNotPingedT1Refs.length,
          );

          draft.pingSessionUsers = filtered;
          draft.pingCounter = 0;
        }

        break;
      case ReferralsActions.PING_REFERRALS.RESET.type:
        draft.pingSessionUserId = null;
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {
          ...INITIAL_STATE,
        };
    }
  });
}

export const referralsReducer = reducer;
