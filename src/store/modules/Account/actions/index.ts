// SPDX-License-Identifier: ice License 1.0

import {FeatureToggleConfig} from '@api/auth/types';
import {User} from '@api/user/types';
import {
  SignInUserInfo,
  SocialSignInProvider,
} from '@services/auth/signin/types';
import {AuthToken} from '@services/auth/types';
import {createAction} from '@store/utils/actions/createAction';
import {CallEffect} from 'redux-saga/effects';

const SET_TOKEN = createAction('SET_TOKEN', {
  STATE: (token: AuthToken | null) => ({token}),
});

const SET_USER_METADATA = createAction('SET_USER_METADATA', {
  STATE: (metadata: string | null) => ({metadata}),
});

const USER_STATE_CHANGE = createAction('USER_STATE_CHANGE', {
  START: true,
  SUCCESS: (user: User | null, isAdmin: boolean | null) => ({user, isAdmin}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SIGN_OUT = createAction('SIGN_OUT', {
  START: ({
    skipMetadataUpdate = false,
  }: {skipMetadataUpdate?: boolean} = {}) => ({skipMetadataUpdate}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SIGN_IN_EMAIL_LINK = createAction('SIGN_IN_EMAIL_LINK', {
  START: (email: string) => ({email}),
  SET_TEMP_EMAIL: (email: string) => ({email}),
  CONFIRM_TEMP_EMAIL: (link: string) => ({link}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const SIGN_IN_EMAIL_CODE = createAction('SIGN_IN_EMAIL_CODE', {
  START: (email: string) => ({email}),
  SET_TEMP_EMAIL: (params: {email: string; code: string}) => params,
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const SIGN_IN_PHONE = createAction('SIGN_IN_PHONE', {
  START: (phoneNumber: string, isoCode: string) => ({phoneNumber, isoCode}),
  SET_TEMP_PHONE_AND_ISO: (phoneNumber: string, isoCode: string) => ({
    phoneNumber,
    isoCode,
  }),
  SET_MIGRATION_DATA: (params: {userId: string; phoneNumber: string}) => params,
  RESEND: true,
  RESEND_SUCCESS: true,
  CONFIRM_TEMP_PHONE: (code: string) => ({code}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR_ERROR: true,
  RESET: true,
});

const MIGRATE_PHONE_NUMBER_TO_EMAIL = createAction(
  'MIGRATE_PHONE_NUMBER_TO_EMAIL',
  {
    START: (email: string) => ({email}),
    SET_SESSION: (loginSession: string) => ({loginSession}),
    SUCCESS: true,
    FAILED: (errorMessage: string) => ({errorMessage}),
    RESET: true,
    EDIT_EMAIL: true,
    CLEAR: true,
  },
);

const SIGN_IN_SOCIAL = createAction('SIGN_IN_SOCIAL', {
  START: (provider: SocialSignInProvider) => ({
    provider,
  }),
  SUCCESS: (userInfo: SignInUserInfo) => ({userInfo}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR: true,
});

const DELETE_ACCOUNT = createAction('DELETE_ACCOUNT', {
  START: true,
  SUCCESS: true,
  FAILED: true,
});

const UPDATE_REF_BY_USERNAME = createAction('UPDATE_REF_BY_USERNAME', {
  START: (refUsername: string) => ({refUsername}),
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const UPDATE_ACCOUNT = createAction('UPDATE_ACCOUNT', {
  START: (
    userInfo: Partial<User>,
    raceConditionStrategy: (
      user: User,
    ) => Generator<CallEffect<void>, {retry: boolean}, void> = function* () {
      return {retry: true};
    },
  ) => ({
    userInfo,
    raceConditionStrategy,
  }),
  SUCCESS: (user: User, userInfo?: Partial<User>) => ({user, userInfo}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const GET_ACCOUNT = createAction('GET_ACCOUNT', {
  START: true,
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const MODIFY_EMAIL_WITH_LINK = createAction('MODIFY_EMAIL_WITH_LINK', {
  START: (email: string) => ({email}),
  SET_TEMP_EMAIL: (email: string) => ({email}),
  CONFIRM_TEMP_EMAIL: (link: string) => ({link}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const MODIFY_EMAIL_WITH_CODE = createAction('MODIFY_EMAIL_WITH_CODE', {
  START: (email: string) => ({email}),
  SET_TEMP_EMAIL: (params: {email: string; code: string}) => params,
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const VERIFY_PHONE_NUMBER = createAction('VERIFY_PHONE_NUMBER', {
  START: (phoneNumber: string) => ({phoneNumber}),
  SUCCESS: (phoneNumber: string, verificationId: string) => ({
    phoneNumber,
    verificationId,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const SET_PRIVACY_INFO_SHOW = createAction('SET_PRIVACY_INFO_SHOW', {
  STATE: (isPrivacyInfoShown: boolean) => ({isPrivacyInfoShown}),
});

const GET_AUTH_CONFIG = createAction('GET_AUTH_CONFIG', {
  SUCCESS: (config: FeatureToggleConfig | null) => ({config}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SET_INSTALL_REFERRER = createAction('SET_INSTALL_REFERRER', {
  STATE: (payload: {installReferrer: string}) => payload,
});

const SET_BSC_ADDR_WARNING_CONFIRMED = createAction(
  'SET_BSC_ADDR_WARNING_CONFIRMED',
  {
    STATE: true,
  },
);

const MIGRATE_EMAIL_WITH_CODE = createAction('MIGRATE_EMAIL_WITH_CODE', {
  START: true,
  SET_CODE: (code: string) => ({code}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

export const AccountActions = Object.freeze({
  SET_TOKEN,
  SET_USER_METADATA,
  SIGN_IN_EMAIL_LINK,
  SIGN_IN_EMAIL_CODE,
  SIGN_IN_PHONE,
  SIGN_IN_SOCIAL,
  SIGN_OUT,
  DELETE_ACCOUNT,
  UPDATE_REF_BY_USERNAME,
  UPDATE_ACCOUNT,
  GET_ACCOUNT,
  USER_STATE_CHANGE,
  MODIFY_EMAIL_WITH_LINK,
  MODIFY_EMAIL_WITH_CODE,
  VERIFY_PHONE_NUMBER,
  SET_PRIVACY_INFO_SHOW,
  GET_AUTH_CONFIG,
  SET_INSTALL_REFERRER,
  SET_BSC_ADDR_WARNING_CONFIRMED,
  MIGRATE_PHONE_NUMBER_TO_EMAIL,
  MIGRATE_EMAIL_WITH_CODE,
});
