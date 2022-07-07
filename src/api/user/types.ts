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
