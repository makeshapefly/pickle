import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  ViewPager,
  Layout,
} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import BasicTabBar from 'components/BasicTabBar';
import {Images} from 'assets/images';
import {Onl_State_Types_Enum} from 'constants/Types';
import keyExtractor from 'utils/keyExtractor';
import Applications from './Applications';
import { ApplicationItemProps } from './ApplicationItem';

const Notification = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const {t} = useTranslation(['notification', 'common']);
  const [activeTab, setActiveTab] = React.useState(0);

  const renderItem = React.useCallback(() => {
    return (
      <Layout level={'1'}>
        <BasicTabBar
          tabs={[
            t('notification:applications'),
            t('notification:interview'),
            t('notification:bookings'),
          ]}
          activeIndex={activeTab}
          onChange={setActiveTab}
          style={styles.tabBar}
        />
      </Layout>
    );
  }, [activeTab]);

  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager selectedIndex={activeTab} onSelect={setActiveTab}>
        <Applications data={DATA} />
        <Applications data={[]} />
        <Applications data={[]} />
      </ViewPager>
    );
  }, [activeTab]);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={t('notification:title').toString()}
      />
      <FlatList
        data={[0]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
});

export default Notification;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    marginTop: 16,
  },
});
const DATA: ApplicationItemProps[] = [
  {
    id: 0,
    user: {
      name: 'Sandar Bulock',
      avatar: Images.avatar1,
      onlineState: Onl_State_Types_Enum.Online,
      id: 1,
      age: 24,
      mapLocation: {
        latitude: 37.767734,
        longitude: -122.416417,
      },
    },
    title: 'accepted your applications.',
    jobCare: '2 Children - John, Marry',
    nonRead: true,
    time: '20 mins ago',
  },
  {
    id: 1,
    user: {
      name: 'Bettie Chapman',
      avatar: Images.avatar3,
      onlineState: Onl_State_Types_Enum.Online,
      id: 1,
      age: 24,
      mapLocation: {
        latitude: 37.767734,
        longitude: -122.416417,
      },
    },
    title: 'accepted your applications.',
    jobCare: '2 Children - John, Marry',
    nonRead: false,
    time: '1 hour ago',
  },
  {
    id: 2,
    user: {
      name: 'Mary Shaw',
      avatar: Images.avatar4,
      onlineState: Onl_State_Types_Enum.Online,
      id: 1,
      age: 24,
      mapLocation: {
        latitude: 37.767734,
        longitude: -122.416417,
      },
    },
    title: 'accepted your applications.',
    jobCare: '2 Children - John, Marry',
    nonRead: false,
    time: 'Yesterday',
  },
  {
    id: 3,
    user: {
      name: 'Matilda Collins',
      avatar: Images.avatar5,
      onlineState: Onl_State_Types_Enum.Online,
      id: 1,
      age: 24,
      mapLocation: {
        latitude: 37.767734,
        longitude: -122.416417,
      },
    },
    title: 'accepted your applications.',
    jobCare: '1 Children - John',
    nonRead: false,
    time: '14:00 Sep 23',
  },
  {
    id: 4,
    user: {
      name: 'Theresa Davidson',
      avatar: Images.avatar6,
      onlineState: Onl_State_Types_Enum.Online,
      id: 1,
      age: 24,
      mapLocation: {
        latitude: 37.767734,
        longitude: -122.416417,
      },
    },
    title: 'accepted your applications.',
    jobCare: '1 Children - John',
    nonRead: false,
    time: '14:00 Sep 23',
  },
];
