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

  profilePicture?: string | null;
  profilePictureUrl?: string | null;

  referralCount?: number | null;
  agendaPhoneNumberHashes?: string | null;

  active?: boolean;
  pingAllowed?: boolean;
  pinged?: boolean;

  referralType?: 'CONTACTS' | 'T1' | 'T2';
};
