import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

import Text from 'components/Text';
import Container from 'components/Container';
import ApplicationItem, {ApplicationItemProps} from './ApplicationItem';
import {isEmpty} from 'lodash';
import {Images} from 'assets/images';

interface ApplicationScrProps {
  data: ApplicationItemProps[];
}

const Applications = memo(({data}: ApplicationScrProps) => {
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['notification', 'common']);
  const RenderEmpty = React.useCallback(() => {
    return (
      <View style={styles.emptyContent}>
        <Image source={Images.noApplication} />
        <Text category="h6" mt={46} mb={16}>
          {t('notification:empty_applications')}
        </Text>
        <Text center category="para-m" mh={40}>
          {t('notification:empty_applications_description')}
        </Text>
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      {isEmpty(data) ? (
        <RenderEmpty />
      ) : (
        <>
          {data.map((item, i) => {
            return <ApplicationItem item={item} key={i} />;
          })}
        </>
      )}
    </Container>
  );
});

export default Applications;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  findJob: {
    marginTop: 24,
  },
});
