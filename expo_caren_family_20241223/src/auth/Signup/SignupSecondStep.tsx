import React, {memo} from 'react';
import {View} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Autocomplete,
  AutocompleteItem,
  Icon,
  Button,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
import NavigationAction from 'components/NavigationAction';
import {globalStyle} from 'styles/globalStyle';
import Flex from 'components/Flex';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import AnimatedAppearance from 'components/AnimatedAppearance';
import {Images} from 'assets/images';
import {RootStackParamList} from 'navigation/types';

interface AutocompleteItemProps {
  id: number;
  title: string;
}

const SignupSecondStep = memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['auth', 'common', 'success']);

  const refMap = React.useRef<MapView | null>(null);
  const refInput = React.useRef<Autocomplete | null>(null);
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(DATA_AUTO_COMPLETE);

  const filter = (item: AutocompleteItemProps, query: string) =>
    item.title.toLowerCase().includes(query.toLowerCase());
  const onSelect = (index: number) => {
    setValue(data[index].title);
    refInput.current?.blur();
  };

  const onChangeText = (query: string) => {
    setValue(query);
    setData(data.filter(item => filter(item, query)));
  };

  const initialRegion = {
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
  };
  const [pinLocation, setPin] = React.useState<Region>(initialRegion);
  const [showAutoComplete, setComplete] = React.useState(false);

  const _onPress = React.useCallback(
    item => {
      setPin(item.region);
    },
    [refMap],
  );
  React.useEffect(() => {
    refMap.current?.animateToRegion(pinLocation);
  }, [pinLocation, refMap]);

  const _onChooseLocation = () => {
    navigate('AuthStack', {screen: 'SignupThirdStep'});
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <Content>
        <View style={styles.content}>
          <Text mt={16}>{t('auth:heading_signup_2')}</Text>
          <Text mt={8} mb={40} category="h2">
            {t('auth:title_signup_2')}
          </Text>
          <Autocomplete
            placeholder={t('auth:enter_address_zip_code_')}
            value={value}
            onChangeText={nextValue => onChangeText(nextValue)}
            accessoryLeft={<Icon pack="assets" name="search" />}
            style={styles.search}
            status="basic"
            size="large"
            ref={refInput}
            onSelect={onSelect}
            onFocus={() => {
              setComplete(true);
            }}
            onBlur={() => setComplete(false)}>
            {DATA_AUTO_COMPLETE.map((item, i) => {
              return (
                <AutocompleteItem
                  key={i}
                  accessoryLeft={<Icon pack="assets" name="searchHistory" />}>
                  <Flex justify="flex-start" itemsCenter ml={24}>
                    <Icon pack="assets" name="searchHistory" />
                    <Text category="h8" ml={16} status="link">
                      {item.title}
                    </Text>
                  </Flex>
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
          <Flex
            itemsCenter
            mb={16}
            justify="flex-start"
            ml={24}
            onPress={() => _onPress(initialRegion)}>
            <Icon pack="assets" name="pinMap" style={styles.iconPin} />
            <View>
              <Text category="h8" status={'link'} mb={4}>
                {t('auth:use_current_location')}
              </Text>
              <Text category="h8-s">150 Greene St, New York, NY 10012</Text>
            </View>
          </Flex>
        </View>
        {showAutoComplete ? (
          <></>
        ) : (
          <AnimatedAppearance>
            <MapView
              ref={refMap}
              initialRegion={{...initialRegion}}
              showsUserLocation={false}
              showsMyLocationButton={false}
              showsTraffic={false}
              showsBuildings={false}
              onUserLocationChange={event => {
                console.log(event.nativeEvent.coordinate);
              }}
              style={[
                styles.mapView,
                {width: width, height: 581 * (height / 812)},
              ]}>
              <Marker
                image={Images.pinLocation}
                coordinate={pinLocation ? pinLocation : initialRegion}
              />
            </MapView>
          </AnimatedAppearance>
        )}
      </Content>
      <Button
        style={[styles.button, {marginBottom: bottom + 8}]}
        children={t('auth:choose_this_location')}
        onPress={_onChooseLocation}
        size="large"
      />
    </Container>
  );
});

export default SignupSecondStep;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  search: {
    ...globalStyle.shadow,
    marginBottom: 24,
    backgroundColor: 'background-basic-color-2',
  },
  iconPin: {
    ...globalStyle.icon24,
    tintColor: 'text-placeholder-color',
    marginRight: 16,
  },
  button: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
  },
  mapView: {},
});

const DATA_AUTO_COMPLETE = [
  {
    id: 0,
    title: '00 Nora Mountains Apt. 929',
    region: {
      latitude: 37.688834,
      longitude: -121.406317,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0421,
    },
  },
  {
    id: 0,
    title: '100 Nora Mountains Apt. 1929',
    region: {
      latitude: 37.781834,
      longitude: -122.401317,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0421,
    },
  },
];
