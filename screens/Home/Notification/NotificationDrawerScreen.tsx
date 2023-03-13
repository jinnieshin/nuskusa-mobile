import { StyleSheet, SafeAreaView } from "react-native";
import { View, Text } from "../../../components/Themed";
import React, { useEffect, useState } from "react";
import NotificationItem from "../../../components/Notification/NotificationItem";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const NotificationDrawerScreen = ({ navigation }: { navigation: any }) => {
  const [notificationArray, setNotificationArray] = useState<any>([]);

  const fetchNotification = async () => {
    const url = process.env.REACT_APP_HOST + "/api/profile/getNotifications";

    const response = await fetch(url);
    if (response.status == 200) {
      const data: Notification[] = await response.json();
      if (data.length == 0) {
        setNotificationArray(
          <View>
            <Text>알림이 없습니다.</Text>
          </View>
        );
      } else {
        setNotificationArray(
          data.map((notif) => <NotificationItem data={notif} />)
        );
      }
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10, backgroundColor: "#F3F4F6" }}>
        <Text style={styles.title}>알림</Text>
        <View
          style={{
            borderBottomWidth: 1,
            marginTop: 20,
            borderBottomColor: "#0B121C5C",
          }}
        />
        {notificationArray}
      </View>
    </SafeAreaView>
  );
};

export default NotificationDrawerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    paddingLeft: 20,
  },
});
