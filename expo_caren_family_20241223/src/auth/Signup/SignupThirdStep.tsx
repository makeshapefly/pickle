import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
import NavigationAction from 'components/NavigationAction';
import {Controller, useForm} from 'react-hook-form';
import {RuleEmail, RuleName, RulePassword} from 'utils/rules';
import useToggle from 'hooks/useToggle';
import AnimatedAppearance from 'components/AnimatedAppearance';
import {RootStackParamList} from 'navigation/types';

const SignupThirdStep = memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['auth', 'success', 'common']);

  const [invisible, setInvisible] = useToggle(true);
  const [canContinue, setContinue] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      full_name: '',
      email: 'lehieuds@gmail.com',
      password: '123456Aa',
    },
  });
  React.useEffect(() => {
    if (
      errors.email === undefined &&
      errors.password === undefined &&
      errors.full_name === undefined
    ) {
      setContinue(true);
    } else {
      setContinue(false);
    }
  }, [errors.email, errors.password, errors.full_name]);

  const handleSignup = React.useCallback(() => {
    navigate('SuccessScr', {
      successScr: {
        title: t('success:title_2'),
        logo: true,
        description: t('success:description_2'),
        children: [
          {
            title: t('success:see_your_dashboard'),
            onPress: () => navigate('MainBottomTab'),
            status: 'outline',
          },
          {
            title: t('success:create_new_job'),
            onPress: () => navigate('MainBottomTab'),
            status: 'basic',
          },
        ],
        buttonsViewStyle: {marginHorizontal: 68},
      },
    });
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <AnimatedAppearance>
        <Content padder>
          <Text mt={16}>{t('auth:heading_signup_3')}</Text>
          <Text mt={8} mb={16} category="h2">
            {t('auth:title_signup_3')}
          </Text>
          <Text mt={8} mb={48}>
            {t('auth:description_signup_3')}
          </Text>
          <Controller
            control={control}
            name="full_name"
            rules={RuleName}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('auth:full_name').toString()}
                status={errors.full_name ? 'warning' : 'basic'}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onBlur={onBlur}
                keyboardType="email-address"
                caption={errors.full_name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={RuleEmail}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('auth:email').toString()}
                status={errors.email ? 'warning' : 'basic'}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onBlur={onBlur}
                keyboardType="email-address"
                caption={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={RulePassword}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('auth:password').toString()}
                status={errors.password ? 'warning' : 'basic'}
                style={styles.input}
                value={value}
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                caption={errors.password?.message}
                secureTextEntry={invisible}
                accessoryRight={props => (
                  <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                    <Icon
                      {...props}
                      pack="assets"
                      name={!invisible ? 'eyeOn' : 'eyeOff'}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          />
          <Button
            children={t('auth:sign_up')}
            onPress={handleSignup}
            disabled={!canContinue}
          />
        </Content>
      </AnimatedAppearance>
    </Container>
  );
});

export default SignupThirdStep;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
});
