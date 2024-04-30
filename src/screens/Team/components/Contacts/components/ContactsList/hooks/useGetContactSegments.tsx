// SPDX-License-Identifier: ice License 1.0

import {SKELETONS_PER_SCREEN} from '@components/ListItems/UserListItem';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {IceFriendsTitle} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {contactsSelector} from '@store/modules/Contacts/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {t} from '@translations/i18n';
import React, {ReactNode, useEffect, useRef} from 'react';
import {Contact} from 'react-native-contacts';
import {useSelector} from 'react-redux';

export type ContactSection = {
  id: 'friends' | 'contacts';
  title?: string | ReactNode;
};

export type ContactSectionDataItem =
  | Contact
  | string
  | {element: 'Loading'}
  | {element: 'InviteFriendsButton'}
  | {element: 'NoContacts'}
  | {element: 'Error'; message: string};

const FETCH_COLLECTION_ARGS = {
  selector: referralsSelector({referralType: 'CONTACTS'}),
  action: ReferralsActions.GET_REFERRALS({referralType: 'CONTACTS'})(
    'CONTACTS',
  ),
};

export const useGetContactSegments = (focused: boolean) => {
  const contacts = useSelector(contactsSelector);

  const {
    fetch,
    data: referrals,
    error,
    loadNext,
    loadNextLoading,
    hasNext,
    refresh,
    refreshing,
  } = useFetchCollection(FETCH_COLLECTION_ARGS);

  const hasBeenFetchedRef = useRef(false);
  useEffect(() => {
    if (focused && !hasBeenFetchedRef.current) {
      hasBeenFetchedRef.current = true;
      fetch({isInitial: true});
    }
  }, [fetch, focused, hasBeenFetchedRef]);

  let iceFriends: ContactSectionDataItem[] = [];
  if (!referrals.length) {
    if (error) {
      iceFriends = [{element: 'Error', message: error}];
    } else if (hasNext) {
      iceFriends = Array(SKELETONS_PER_SCREEN).fill({element: 'Loading'});
    } else {
      iceFriends = [{element: 'InviteFriendsButton'}];
    }
  } else {
    iceFriends = referrals;
  }

  const sections: (ContactSection & {data: ContactSectionDataItem[]})[] = [];

  if (contacts.length) {
    sections.push({
      id: 'friends',
      title: referrals.length ? <IceFriendsTitle /> : null,
      data: iceFriends,
    });
  }

  if (contacts.length) {
    /**
     * Populate contacts section only when all the referrals are loaded or were failed to load
     */
    if (!hasNext || error) {
      sections.push({
        id: 'contacts',
        title: t('team.contacts_list.all_contacts'),
        data: contacts,
      });
    }
  } else {
    sections.push({
      id: 'contacts',
      data: [{element: 'NoContacts'}],
    });
  }

  return {sections, loadNext, loadNextLoading, refresh, refreshing};
};
