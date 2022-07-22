// SPDX-License-Identifier: BUSL-1.1
export interface UserProfile {
  city: string | null;
  country: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phoneNumber: string | null | undefined;
  profilePictureURL: string | null;
  referralCount: number;
  username: string | null;
  email: string | undefined;
  phoneNumberHash: string | undefined;
}
export interface UserProfileUpdate {
  agendaPhoneNumberHashes?: string | null;
  city?: string | null;
  country?: string | null;
  email?: string | undefined;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  phoneNumberHash?: string | null;
  username?: string | null;
  profilePicture?: string | null;
}
export interface UserSearchInfo {
  active: boolean;
  city: string;
  country: string;
  firstName?: string;
  id: string;
  lastName?: string;
  phoneNumber?: string;
  pingAllowed?: boolean;
  profilePictureUrl: string;
  referralType?: string;
  username: string;
  pinged: boolean;
}
