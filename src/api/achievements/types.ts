// SPDX-License-Identifier: ice License 1.0

export type RoleType = 'snowman' | 'ambassador';

export interface Role {
  enabled: boolean;
  type: RoleType;
}
