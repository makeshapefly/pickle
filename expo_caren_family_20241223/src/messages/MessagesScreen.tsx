import React, {memo} from 'react';
import {View, Image, FlatList} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Text from 'components/Text';
import Container from 'components/Container';
import keyExtractor from 'utils/keyExtractor';
import {Images} from 'assets/images';
import {Controller, useForm} from 'react-hook-form';
import {globalStyle} from 'styles/globalStyle';
import MessagesItem from './Components/MessagesItem';
import {RootStackParamList} from 'navigation/types';
import {DATA_MESSAGES} from 'constants/Data';

const MessagesScreen = memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['message', 'common']);

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const ListEmptyComponent = React.useCallback(() => {
    return (
      <View style={styles.empty}>
        <Image source={Images.emptyMess} />
        <Text category="h6" center mt={58} mb={16}>
          {t('message:empty_title')}
        </Text>
        <Text category="h8-s" center mh={24}>
          {t('message:empty_description')}
        </Text>
      </View>
    );
  }, []);
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <>
        <Controller
          control={control}
          name="search"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.search}
              value={value}
              status="info"
              size={'large'}
              placeholder={t('message:placeholder_input')}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              accessoryLeft={<Icon pack="assets" name="search" />}
            />
          )}
        />
      </>
    );
  }, [control, handleSubmit]);
  const renderItem = React.useCallback(({item}) => {
    return <MessagesItem item={item} _onPress={onMessage} />;
  }, []);
  const onMessage = React.useCallback(() => {
    navigate('MessagesStack', {screen: 'Chat'});
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation title={t('message:title').toString()} />
      <FlatList
        data={DATA_MESSAGES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
      />
    </Container>
  );
});

export default MessagesScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  empty: {
    alignItems: 'center',
    marginTop: 120,
  },
  search: {
    ...globalStyle.shadowFade,
    marginTop: 16,
    marginBottom: 32,
    ...globalStyle.marH24,
  },
  content: {},
});
