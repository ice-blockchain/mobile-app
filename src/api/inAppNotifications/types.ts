// SPDX-License-Identifier: ice License 1.0

export interface Activity {
  actor?: string;
  object?: string;
  verb?:
    | 'pinged' // someone pinged you -> their profile
    | 'mining' // mining related -> home screen
    | 'weekly_stats' // weekly stats -> stats screen
    | 'invite_friends' // invite friends -> share screen
    | 'follow_us' // follow/join us on XXX -> url
    | 'joined' // someone joined ur team -> t1 team screen
    | 'news' // news -> news screen
    | 'level' // level -> profile screen
    | 'role' // role related  -> profile > role screen
    | 'badge' // badge related -> badges screen > focus on badge
    | 'task' // task related -> home screen > focus on the task
    | 'adoption' // adoption related -> home screen > focus on adoption card
    | 'ref_joined' // friend join ice (from agenda, not referral) -> their profile
    | 'staking' // staking related -> home screen
    | 'login_linked' // new login method linked -> settings screen
    | 'announcements'; // announcements -> url
  extra?: ActivityExtraPayload | null;
  time?: Date | string | null;
  foreign_id?: string;
  id: string;
}

export interface ActivityExtraPayload {
  description?: string;
  deeplink?: string | null;
  imageUrl?: string;
  imageUrls?: string[];
}

export interface ActivitySection {
  sectionTitle?: string | null;
  data?: Activity[];
}
