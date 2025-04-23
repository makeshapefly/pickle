import React, { memo } from "react";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import BasicTabBar from "components/BasicTabBar";
import { MY_RECOMMENDED } from "constants/Data";
import IRecommended from "components/IRecommended";
import ButtonFill from "components/ButtonFill";
import { globalStyle } from "styles/globalStyle";
import { RootStackParamList } from "navigation/types";

const FindScreen = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);

  const [selected, setSelected] = React.useState(0);
  const [dataRecommend, setRecommend] = React.useState(MY_RECOMMENDED);

  const _onMap = () => {
    navigate("ViewOnMap");
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("find:title")}
        accessoryRight={() => <NavigationAction icon="map" onPress={_onMap} />}
      />
      <BasicTabBar
        activeIndex={selected}
        onChange={setSelected}
        tabs={[t("find:recommended"), t("find:new_profile"), t("find:nearby")]}
      />
      <ViewPager selectedIndex={selected} style={styles.viewPager}>
        <Content contentContainerStyle={styles.content}>
          {dataRecommend &&
            dataRecommend.map((item, i) => {
              return <IRecommended item={item} key={i} mh={24} />;
            })}
        </Content>
        <Content contentContainerStyle={styles.content}>
          {dataRecommend &&
            dataRecommend.reverse().map((item, i) => {
              return <IRecommended item={item} key={i} mh={24} />;
            })}
        </Content>
        <Content contentContainerStyle={styles.content}>
          {dataRecommend &&
            dataRecommend.map((item, i) => {
              return <IRecommended item={item} key={i} mh={24} />;
            })}
        </Content>
      </ViewPager>
      <ButtonFill
        status="warning"
        icon="filter"
        size="large"
        style={styles.buttonFilter}
      />
    </Container>
  );
});

export default FindScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  content: {
    marginTop: 32,
    paddingBottom: 80,
  },
  buttonFilter: {
    position: "absolute",
    right: 16,
    bottom: 56,
    ...globalStyle.shadowFilter,
  },
});
