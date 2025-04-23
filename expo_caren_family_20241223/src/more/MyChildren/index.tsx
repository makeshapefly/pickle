import React, {memo} from 'react';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
import NavigationAction from 'components/NavigationAction';
import {RootStackParamList} from 'navigation/types';
import SwiperCard from 'components/SwiperCard';
import {globalStyle} from 'styles/globalStyle';
import Flex from 'components/Flex';

const MyChildren = memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['more', 'common']);

  const onAdd = () => {
    navigate('AddChild');
  };
  const onDelete = () => {};
  const onEdit = () => {};
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('more:my-children')}
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <NavigationAction icon="plusImg" size="small" onPress={onAdd} />
        }
      />
      <Content contentContainerStyle={styles.content}>
        {DATA.map((item, i) => {
          return (
            <SwiperCard
              id={`${i + item.name}`}
              key={i}
              widthAction={75}
              containerStyle={styles.swiperContainer}
              onDelete={onDelete}
              onEdit={onEdit}>
              <Flex
                vertical
                level="2"
                pv={24}
                ml={24}
                justify="flex-start"
                border={12}>
                <Text category="h6" bold ml={16}>
                  {item.name}
                </Text>
                <Text category="h8" mt={8} status="placeholder" ml={16}>
                  {item.ageType}
                </Text>
              </Flex>
            </SwiperCard>
          );
        })}
      </Content>
    </Container>
  );
});

export default MyChildren;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
  },
  swiperContainer: {
    ...globalStyle.shadow,
    marginBottom: 24,
    borderRadius: 12,
    marginRight: 24,
  },
});
const DATA = [{id: 0, name: 'John', ageType: 'Toddler'}];
