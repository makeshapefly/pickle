import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import ButtonOptional, {
  ButtonOptionalProps,
} from "./Components/ButtonOptional";

import HeaderMoreOption from "./Components/HeaderMoreOption";

import ThemeContext from "ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";

const MoreSrc = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["more", "payment", "common"]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const checked = React.useMemo(() => {
    if (theme === "dark") {
      return true;
    } else {
      return false;
    }
  }, [theme]);

  const DATA_DETAILS: ButtonOptionalProps[] = [
    {
      title: t("more:my-post"),
      icon: "myPost",
      status: "facebook",
      navigateSrc: "MyPost",
    },
    {
      title: t("more:my-children"),
      icon: "stats",
      status: "warning",
      navigateSrc: "MyChildren",
    },
    {
      title: t("payment:payment-method"),
      icon: "payment",
      status: "success",
      navigateSrc: "PaymentMethod",
    },
  ];
  const DATA_APPLICATION: ButtonOptionalProps[] = [
    {
      title: t("more:about-caren"),
      icon: "stats",
      status: "basic",
      onPress: () => navigate("AboutScreen"),
    },
    {
      title: t("more:help-&-faq"),
      icon: "helpWhite",
      status: "placeholder",
      onPress: () => navigate("FaqScreen"),
    },
    {
      title: t("more:privacy-of-policy"),
      icon: "term",
      status: "green",
      onPress: () => navigate("PolicyScreen"),
    },
  ];
  return (
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <HeaderMoreOption
          name={"Edith Johnson"}
          avatar={Images.avatar2}
          email={"lehieuds@gmail.com"}
        />
        <View style={styles.details}>
          <Text category="h6" bold>
            {t("more:myDetails")}
          </Text>
          {DATA_DETAILS.map((item, i) => {
            return (
              <ButtonOptional
                icon={item.icon}
                title={item.title}
                status={item.status}
                key={i}
                navigateSrc={item.navigateSrc}
              />
            );
          })}
          <ButtonOptional
            title={t("more:change-the-care-type")}
            icon={"changeJob"}
            status={"neutral"}
            navigateSrc={"ChangeCareType"}
            onPress={() => {
              navigate("ChangeCareType");
            }}
          />
        </View>
        <View style={styles.application}>
          <Text category="h6" bold>
            {t("more:application")}
          </Text>
          {DATA_APPLICATION.map((item, i) => {
            return (
              <ButtonOptional
                icon={item.icon}
                title={item.title}
                status={item.status}
                key={i}
                onPress={item.onPress}
                navigateSrc={item.navigateSrc}
              />
            );
          })}
          <ButtonOptional
            withToggle
            icon="darkMode"
            title={t("more:switch-dark-mode")}
            status={"danger"}
            checked={checked}
            onPress={() => {
              toggleTheme();
            }}
            navigateSrc={undefined}
          />
          <ButtonOptional
            title={t("more:refer-friend-&-family")}
            icon={"share"}
            status={"twitter"}
            navigateSrc={"ReferFriend"}
          />
        </View>
      </Content>
    </Container>
  );
});

export default MoreSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 80,
  },

  details: {
    marginBottom: 48,
  },
  application: {},
});
