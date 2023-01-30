import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Badge = () => {
  const userdata = useSelector((state: any) => state.user.value);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {userdata.profileImageUrl == "" ? (
          <View style={styles.image}></View>
        ) : (
          <Image
            style={styles.image}
            source={{ uri: userdata.profileImageUrl }}
          ></Image>
        )}
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{userdata.name}</Text>
        <Text style={styles.major}>{userdata.major}</Text>
      </View>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 102,
    marginHorizontal: 10,
  },
  imageContainer: {
    flex: 0.45,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 93,
    height: 93,
    backgroundColor: "#D9D9D9",
    borderRadius: 93,
    marginRight: 5,
  },
  nameContainer: {
    flex: 0.55,
    justifyContent: "center",
    marginLeft: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    top: 7,
  },
  major: {
    fontSize: 13,
  },
});
