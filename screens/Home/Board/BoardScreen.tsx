import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "../../../components/Themed";
import React from "react";
import Banner from "../../../components/Banner";
import BoardTypeSelect from "../../../components/Board/BoardTypeSelect";
import { useDispatch } from "react-redux";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";

const BoardScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  const navigateAnnouncement = () => {
    dispatch(setCurrentBoardPage("announcement"));
    navigation.navigate("PostList", { boardType: "announcement" });
  };
  const navigateFreshmen = () => {
    dispatch(setCurrentBoardPage("freshmen"));
    navigation.navigate("PostList", { boardType: "freshmen" });
  };
  const navigateGeneral = () => {
    dispatch(setCurrentBoardPage("general"));
    navigation.navigate("PostList", { boardType: "general" });
  };

  const navigateGraduated = () => {
    dispatch(setCurrentBoardPage("graduated"));
    navigation.navigate("PostList", { boardType: "graduated" });
  };
  const navigateMarket = () => {
    dispatch(setCurrentBoardPage("market"));
    navigation.navigate("PostList", { boardType: "market" });
  };
  const navigateJobs = () => {
    dispatch(setCurrentBoardPage("jobs"));
    navigation.navigate("PostList", { boardType: "jobs" });
  };

  return (
    <View style={{ flex: 1 }}>
      <Banner
        navigation={navigation}
        iconLeft="menu"
        iconRight="ios-notifications-outline"
      />
      <View style={styles.container}>
        <Text style={styles.title}> 게시판 목록</Text>
        <View style={styles.buttonsRowContainer}>
          <BoardTypeSelect
            handlePress={navigateAnnouncement}
            title="공지사항"
            subtitle1="공지는 여기에서!"
            subtitle2=""
          />
          <BoardTypeSelect
            handlePress={navigateFreshmen}
            title="신입생 게시판"
            subtitle1="재학생이 되기 전"
            subtitle2="궁금한 것은 여기로!"
          />
        </View>
        <View style={styles.buttonsRowContainer}>
          <BoardTypeSelect
            handlePress={navigateGeneral}
            title="자유게시판"
            subtitle1="자유게시판입니다!"
            subtitle2=""
          />
          <BoardTypeSelect
            handlePress={navigateGraduated}
            title="졸업생 게시판"
            subtitle1="졸업생들의 공간!"
            subtitle2=""
          />
        </View>
        <View style={styles.buttonsRowContainer}>
          <BoardTypeSelect
            handlePress={navigateMarket}
            title="벼룩시장"
            subtitle1="중고물품을 사고팔고"
            subtitle2="공동구매를 모집해요!"
          />
          <BoardTypeSelect
            handlePress={navigateJobs}
            title="취업/인턴"
            subtitle1="취업/인턴 관련 정보를"
            subtitle2="올리는 게시판!"
          />
        </View>
      </View>
    </View>
  );
};

export default BoardScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    marginBottom: 10,
  },
  buttonsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
