// SPDX-License-Identifier: ice License 1.0

import {WalkthroughStepKey} from '@store/modules/Walkthrough/types';
import {SupportedLocale} from '@translations/localeConfig';

export type User = {
  id: string;
  username?: string;
  profilePictureUrl: string;

  /**
   * example: 2022-01-03T16:20:52.156534Z
   */
  createdAt: string;

  language: SupportedLocale;

  city?: string | null;
  country?: string | null;

  firstName?: string | null;
  lastName?: string | null;

  email?: string | null;

  phoneNumber?: string | null;
  phoneNumberHash?: string | null;

  profilePicture?: {
    uri: string;
    name: string;
    type: string;
  } | null;
  resetProfilePicture?: boolean | null;

  t1HumanReferralCount?: number | null;
  t1ReferralCount?: number | null;
  t2ReferralCount?: number | null;
  agendaPhoneNumberHashes?: string | null;

  active?: boolean;
  pinged?: boolean | null;

  referralType?: ReferralType;
  referredBy?: string | null;

  checksum: string;

  hiddenProfileElements?: HiddenProfileElement[] | null;

  clientData?: ClientData | null;

  skipEmailValidation?: boolean | null;
  skipPhoneNumberValidation?: boolean | null;

  loginSession?: string;

  /*
    0/undefined (show terms and conditions screen)
    1 (show selfie screen)
    2 (show emotion screens)
   */
  kycStepPassed?: number;

  /*
    0/undefined
    1 banned
   */
  kycStepBlocked?: number;

  /*
    A map of `kycStepPassed` keys and a timestamp as value.
    So if now > `repeatableKYCSteps[xxx]` you retry that step
   */
  repeatableKYCSteps?: Record<string, string>;

  miningBlockchainAccountAddress?: string;

  verified?: boolean | null;
};

export type ReferralType = 'CONTACTS' | 'T1' | 'T2' | 'TEAM';
export type AgendaType = 'AGENDA';
export type TeamUserType = ReferralType | AgendaType;

export type HiddenProfileElement =
  | 'globalRank'
  | 'referralCount'
  | 'level'
  | 'role'
  | 'badges';

export type WalkthroughStepProgress = {
  // To be future-proof. If we modify some screens we want to show that walkthrough again.
  // It should be a constant in the code, that we update when/if we change that specific UI.
  version: number;
};

export type RegistrationProcessFinalizedStep = 'onboarding' | 'iceBonus';

export type RateData = {
  firstMiningDate?: string | null;
  showingsCount?: number | null; //1, 2
  lastShowingDate?: string | null;
};

export type QuizData = {
  quizTermsAccepted?: boolean | null;
};

export type ClientData = {
  registrationProcessFinalizedSteps?: RegistrationProcessFinalizedStep[];
  walkthroughProgress?: {[key in WalkthroughStepKey]?: WalkthroughStepProgress};
  miningStateTooltipSeen?: string[];
  phoneNumberIso?: string | null;
  rate?: RateData | null;
  quiz?: QuizData | null;
};
