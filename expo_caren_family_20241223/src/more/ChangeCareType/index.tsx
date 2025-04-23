import {
  Layout,
  StyleService,
  TopNavigation,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { Images } from "assets/images";
import Container from "components/Container";
import Content from "components/Content";
import NavigationAction from "components/NavigationAction";
import Text from "components/Text";
import useLayout from "hooks/useLayout";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Image, Pressable } from "react-native";

const ChangeCareType = () => {
  const theme = useTheme();
  const { width } = useLayout();
  const { t } = useTranslation(["common", "auth", "more"]);
  const styles = useStyleSheet(themedStyles);

  const sample = [
    { title: t("auth:child_care"), icon: Images.childCare },
    { title: t("auth:pet_care"), icon: Images.petCare },
    { title: t("auth:housekeeping"), icon: Images.housekeeping },
    { title: t("auth:special_needs"), icon: Images.specialNeeds },
    { title: t("auth:tutoring"), icon: Images.tutoring },
    { title: t("auth:senior_care"), icon: Images.seniorCare },
  ];
  const [active, setActive] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={t("more:change_the_care_type")}
      />
      <Content contentContainerStyle={styles.content}>
        <Layout style={styles.wrapper}>
          {sample.map((item, i) => {
            const isActive = active === i;
            return (
              <Pressable
                style={{
                  width: (width - 32 - 48) / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={i}
                onPress={() => setActive(i)}
              >
                <Layout key={i}>
                  <ImageBackground
                    style={styles.background}
                    source={isActive ? Images.fillActive : Images.fill}
                  >
                    <Image
                      source={item.icon}
                      style={{
                        width: 52,
                        height: 52,
                        tintColor: isActive
                          ? theme["text-primary-color"]
                          : theme["text-placeholder-color"],
                      }}
                    />
                  </ImageBackground>
                  <Text
                    center
                    mt={16}
                    category="h8"
                    bold
                    status={isActive ? "link" : "placeholder"}
                  >
                    {item.title}
                  </Text>
                </Layout>
              </Pressable>
            );
          })}
        </Layout>
      </Content>
    </Container>
  );
};

export default ChangeCareType;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  background: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 24,
    rowGap: 40,
    columnGap: 32,
  },
});
