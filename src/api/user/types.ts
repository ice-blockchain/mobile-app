// SPDX-License-Identifier: BUSL-1.1

export type User = {
  id?: string;

  city?: string | null;
  country?: string | null;

  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;

  email?: string | null;

  phoneNumber?: string | null;
  phoneNumberHash?: string | null;

  profilePicture?: {
    uri: string;
    name: string;
    type: string;
  } | null;
  profilePictureUrl?: string;

  referralCount?: number | null;
  agendaPhoneNumberHashes?: string | null;

  active?: boolean;
  pinged?: boolean;

  referralType?: ReferralType;
};

export type ReferralType = 'CONTACTS' | 'T1' | 'T2';
