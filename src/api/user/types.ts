// SPDX-License-Identifier: BUSL-1.1
export interface UserProfile {
  city: string | null;
  country: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phoneNumber: string | null;
  profilePictureURL: string | null;
  referralCount: number;
  username: string | null;
}

export interface UserUpdateResult extends UserProfile {
  agendaPhoneNumberHashes: string;
  createdAt: string;
  email: string;
  lastMiningStartedAt: string;
  lastPingAt: string;
  phoneNumberHash: string;
  referredBy: string;
  updatedAt: string;
}
