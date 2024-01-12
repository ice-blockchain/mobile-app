// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const userByIdSelector = (userId: string) => (state: RootState) =>
  state.users.entities[userId];

export const isOnboardingViewedSelector =
  (userId: string | undefined) => (state: RootState) =>
    state.users.onboardingIds.includes(userId || '');

export const isMigrationAgreementViewedSelector =
  (userId: string | undefined) => (state: RootState) =>
    state.users.migrationAgreementIds.includes(userId || '');
