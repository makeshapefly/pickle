import React, {memo} from 'react';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Content from 'components/Content';
import Container from 'components/Container';
import ButtonFill from 'components/ButtonFill';
import {
  DATA_PASS_APPLICATION,
  DATA_PASS_BOOKING,
  DATA_PAST_INTERVIEW,
} from 'constants/Data';
import NavigationAction from 'components/NavigationAction';
import RequestInterviewItem from './Components/RequestInterviewItem';
import {RequestsInPassScreenNavigationProp} from 'navigation/types';
import {Request_Type_Enum} from 'constants/Types';
import BookingItem from './Components/BookingItem';
import ApplicationItem from './Applications/ApplicationItem';

const RequestsInPast = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['request', 'common']);

  const route = useRoute<RequestsInPassScreenNavigationProp>();
  const request_type = route.params.requestType;
  const [title, setTitle] = React.useState<string>('');
  React.useEffect(() => {
    if (request_type === Request_Type_Enum.Interview) {
      setTitle('interviewInPast');
    } else if (request_type === Request_Type_Enum.Booking) {
      setTitle('bookingInPast');
    } else {
      setTitle('applicationInPass');
    }
  }, [request_type]);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="back" />}
        title={t('request:title').toString()}
      />
      <Content contentContainerStyle={styles.content}>
        {request_type === Request_Type_Enum.Interview ? (
          <>
            {DATA_PAST_INTERVIEW.map((item, i) => {
              return <RequestInterviewItem item={item} key={i} />;
            })}
          </>
        ) : request_type === Request_Type_Enum.Booking ? (
          <>
            {DATA_PASS_BOOKING.map((item, i) => {
              return <BookingItem item={item} key={i} />;
            })}
          </>
        ) : (
          <>
            {DATA_PASS_APPLICATION.map((item, i) => {
              return <ApplicationItem item={item} key={i} />;
            })}
          </>
        )}
      </Content>
      <ButtonFill
        icon="filter"
        status="warning"
        size="large"
        // onPress={show}
        style={styles.filter}
      />
    </Container>
  );
});

export default RequestsInPast;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  filter: {
    position: 'absolute',
    right: 12,
    bottom: 60,
  },
});
