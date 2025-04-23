import React, {memo} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
import keyExtractor from 'utils/keyExtractor';
import {globalStyle} from 'styles/globalStyle';
import ICheckbox from 'components/ICheckbox';

const SelectLanguage = memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['filter', 'common']);

  const [data, setData] = React.useState(DATA);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('common:language')}
        accessoryLeft={
          <TouchableOpacity activeOpacity={0.54} onPress={goBack}>
            <Icon pack="assets" name="close" />
          </TouchableOpacity>
        }
        accessoryRight={
          <Text category="h7" status={'link'} bold>
            {t('common:clear')}
          </Text>
        }
      />
      <FlatList
        data={data}
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return (
            <ICheckbox
              style={styles.checkbox}
              title={item.name}
              checked={item.select}
              onChange={() => {
                const newData = data.map(newItem => {
                  if (newItem.name === item.name) {
                    return {
                      ...newItem,
                      select: true,
                    };
                  }
                  return {
                    ...newItem,
                    select: false,
                  };
                });
                setData(newData);
              }}
            />
          );
        }}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <Button
        children={t('common:ok')}
        style={[styles.button, {bottom: bottom + 8}]}
        onPress={goBack}
      />
    </Container>
  );
});

export default SelectLanguage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 40,
    paddingBottom: 120,
  },
  button: {
    position: 'absolute',
    left: 24,
    right: 24,
    ...globalStyle.shadowBtn,
  },
  checkbox: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
});
const DATA = [
  {name: 'Afrikaans', code: 'af', select: false},
  {name: 'Albanian', code: 'sq', select: false},
  {name: 'Amharic', code: 'am', select: false},
  {name: 'Arabic (Egyptian Spoken)', code: 'ar', select: false},
  {name: 'Arabic (Levantine)', code: 'ar', select: false},
  {name: 'Arabic (Modern Standard)', code: 'ar', select: false},
  {name: 'Arabic (Overview)', code: 'ar', select: false},
  {name: 'Aramaic', code: 'arc', select: false},
  {name: 'Armenian', code: 'hy', select: false},
  {name: 'Assamese', code: 'as', select: false},
  {name: 'Aymara', code: 'ay', select: false},
  {name: 'Azerbaijani', code: 'az', select: false},
  {name: 'Bashkir', code: 'ba', select: false},
  {name: 'Bavarian', code: 'bar', select: false},
  {name: 'Belarusian', code: 'be', select: false},
  {name: 'Bulgarian', code: 'bg', select: false},
];
