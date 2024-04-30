// SPDX-License-Identifier: ice License 1.0

export type RoleType = 'snowman' | 'ambassador';

export interface Role {
  enabled: boolean;
  type: RoleType;
}

export interface LevelsAndRoles {
  level: number;
  roles?: Role[];
}

export type BadgeType = 'social' | 'coin' | 'level';

export type Badge = {
  achieved: boolean;
  achievingRange: AchievingRange;
  name: string;
  percentageOfUsersInProgress: number;
  type: BadgeType;
};

export type AchievingRange = {
  fromInclusive?: number;
  toInclusive?: number;
};

export type Achievements = {
  levelsAndRoles?: LevelsAndRoles;
  badges?: BadgeSummary[];
  socialBadges?: Badge[];
  coinBadges?: Badge[];
  levelBadges?: Badge[];
};

export type BadgeSummary = {
  name: string;
  type: BadgeType;
  index: number;
  lastIndex: number;
};
