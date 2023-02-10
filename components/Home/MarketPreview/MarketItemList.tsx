import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MarketItem from "./MarketItem";
import { useDispatch } from "react-redux";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";

const MarketItemList = ({ navigation }: { navigation: any }) => {
  const itemArr = [1, 2, 3];
  const dispatch = useDispatch();

  const navigateMarket = () => {
    dispatch(setCurrentBoardPage("market"));
    navigation.navigate("PostList", { boardType: "market" });
  };

  return (
    <View style={styles.container}>
      {itemArr.map((item) => (
        <MarketItem />
      ))}
      <TouchableOpacity
        style={styles.viewAllContainer}
        onPress={navigateMarket}
      >
        <Text style={styles.viewAllButtonText}>+ View All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MarketItemList;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 320,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 13,
  },
  viewAllContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  viewAllButtonText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
