import React, {memo} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Layout,
  Button,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
import NavigationAction from 'components/NavigationAction';
import {Controller, useForm} from 'react-hook-form';
import {globalStyle} from 'styles/globalStyle';
import {Images} from 'assets/images';

const AddChild = memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['more', 'filter', 'creat_job', 'common']);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: 'Marry',
    },
  });
  const SIZE_BG = 80 * (width / 375);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [typeAge, setTypeAge] = React.useState<string>('Toddler');

  const DATA = [
    {
      id: 0,
      title: t('filter:infant'),
      description: t('filter:infant_age'),
      icon: 'infant',
    },
    {
      id: 1,
      title: t('filter:toddler'),
      description: t('filter:toddler_age'),
      icon: 'toddler',
    },
    {
      id: 2,
      title: t('filter:pre_school'),
      description: t('filter:pre_school_age'),
      icon: 'preSchool',
    },
    {
      id: 3,
      title: t('filter:elementary'),
      description: t('filter:elementary_age'),
      icon: 'tutoring',
    },
    {
      id: 4,
      title: t('filter:junior_high'),
      description: t('filter:junior_high_age'),
      icon: 'junior',
    },
  ];

  const onChoose = React.useCallback(
    ({item, i}) =>
      () => {
        setSelectedIndex(i), setTypeAge(item.title);
      },
    [],
  );
  const onAdd = () => {};
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={t('more:add-child')}
      />
      <Content padder>
        <Text category="h8" mt={24} mb={40}>
          {t('more:add-child-title')}
        </Text>
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('more:child-name').toString()}
              status={errors.name ? 'warning' : 'basic'}
              style={styles.name}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.name?.message}
            />
          )}
        />
        <Text category="h6" bold mb={32}>
          {t('creat_job:age-of-children')}
        </Text>
        <View style={styles.content}>
          {DATA.map((item, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.54}
                onPress={onChoose({i, item})}
                style={[
                  styles.item,
                  {
                    width: 108 * (width / 375),
                  },
                ]}
                key={i}>
                <ImageBackground
                  source={i === selectedIndex ? Images.fillActive : Images.fill}
                  style={[
                    {
                      width: SIZE_BG,
                      height: SIZE_BG,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    selectedIndex === i
                      ? {...globalStyle.shadowBtn}
                      : undefined,
                  ]}>
                  <Icon
                    pack="assets"
                    name={item.icon}
                    style={{
                      ...globalStyle.icon40,
                      tintColor:
                        selectedIndex === i
                          ? theme['text-primary-color']
                          : theme['text-placeholder-color'],
                      zIndex: 10,
                      alignSelf: 'center',
                    }}
                  />
                </ImageBackground>
                <Text
                  category="h8"
                  bold
                  status={i === selectedIndex ? 'link' : 'placeholder'}
                  mt={12}>
                  {item.title}
                </Text>
                <Text category="h10" status={'placeholder'} mt={4}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Content>
      <Layout style={styles.bottom}>
        <Button
          children={t('more:add-child')}
          style={globalStyle.shadowBtn}
          onPress={onAdd}
        />
      </Layout>
    </Container>
  );
});

export default AddChild;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  name: {
    borderBottomWidth: 2,
    marginBottom: 40,
  },
  item: {
    paddingHorizontal: 9,
    alignItems: 'center',
    marginBottom: 24,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
});
