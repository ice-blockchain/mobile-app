// SPDX-License-Identifier: BUSL-1.1

import {ShareResourceType} from '@services/segment/types';
import {JsonMap} from '@segment/analytics-react-native';
import {Content, StoreState, User} from '@store/types';

export function getPageName(
  routeName: string,
  parentRouteName?: string,
): string {
  switch (routeName) {
    case 'Profile':
      return 'Profile';
    case 'MyRoles':
      return `${parentRouteName}/MyRoles`;
    case 'MyBadges':
      return `${parentRouteName}/MyBadges`;
    case 'InviteFriends':
      return 'Invite Friends';
  }
  return '';
}

export async function getPageNameAndProperties({
  routName,
  parentRouteName,
  params,
  state,
}: {
  routName: string;
  parentRouteName?: string;
  params: Record<string, unknown>;
  state: StoreState;
}): Promise<{pageName: string; props: JsonMap}> {
  const pageName = getPageName(routName, parentRouteName);
  try {
    switch (pageName) {
      case 'Profile': {
        const {userId} = params;
        return {
          pageName,
          props: {
            'Profile User ID': userId ?? 'N/A',
          },
        };
      }

      case 'Invite Friends': {
        const {screenSource} = params;
        const source = getPageName(String(screenSource));
        return {
          pageName,
          props: {
            Source: source,
          },
        };
      }
    }
  } catch {}
  return {pageName: '', props: {}};
}

export async function getShareEventProperties({
  resourceType,
  resource,
}: {
  resourceType: ShareResourceType;
  resource: Content;
}): Promise<JsonMap> {
  try {
    switch (resourceType) {
      case 'Invite': {
        const user: User = resource as unknown as User;
        return {
          'User ID': user?.id ?? 'N/A',
          'User username': user?.username ?? 'N/A',
        };
      }
    }
  } catch {}
  return {};
}
