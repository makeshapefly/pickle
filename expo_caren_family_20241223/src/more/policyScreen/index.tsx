import * as React from "react";

import Container from "components/Container";
import {
  Layout,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import Content from "components/Content";
import Text from "components/Text";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";

const PolicyScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["common", "auth", "creat_job"]);
  const sampleQualifications = [
    "• Has a car",
    "• Comfortable with pets",
    "• Meal preparation",
    "• Will provide sick care",
    "• None Smoking",
    "• College degree",
  ];
  const sampleResponsibilities = [
    "• Pick-up or Drop-off",
    "• Homework help",
    "• Cooking",
    "• Light housekeeping",
    "• Crafts",
    "• Swimming supervision",
  ];
  return (
    <Container>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={t("auth:privacy_policy")}
      />
      <Content contentContainerStyle={styles.content}>
        <Text category="h3">{"Envato Policy"}</Text>
        <Text>{`I am looking for a great babysitter for 1 children in Rochester. I would prefer someone who could help out with meal preparation occasionally.

I would prefer a babysitter who has their own car and who is comfortable with pets. This would be occasional weekends only with one possible overnight a month.`}</Text>
        <Text category="h3">{t("auth:qualifications")}</Text>
        <Layout style={{ gap: 12 }}>
          {sampleQualifications.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </Layout>
        <Text category="h3">{t("creat_job:responsibilities")}</Text>
        <Layout style={{ gap: 12 }}>
          {sampleResponsibilities.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </Layout>
      </Content>
    </Container>
  );
};
export default PolicyScreen;

const themedStyles = StyleService.create({
  content: {
    padding: 24,
    gap: 24,
  },
});
