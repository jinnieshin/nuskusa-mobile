import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentBoardPage } from "../../redux/features/currentBoardPage";
import { setShowBoardDropDownList } from "../../redux/features/showBoardDropDownList";

const DropDownList = ({
  navigation,
  currentPage,
}: {
  navigation: any;
  currentPage: string;
}) => {
  const initialBoards = [
    "공지사항",
    "신입생 게시판",
    "자유게시판",
    "졸업생 게시판",
    "벼룩시장",
    "취업/인턴",
  ];

  const [boards, setBoards] = useState<any[]>(initialBoards);

  const boardTypeToEnglish = {
    공지사항: "announcement",
    "신입생 게시판": "freshmen",
    자유게시판: "general",
    "졸업생 게시판": "graduated",
    벼룩시장: "market",
    "취업/인턴": "jobs",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const filteredBoards = initialBoards.filter((x) => x != currentPage);
    setBoards(filteredBoards);
  }, [currentPage]);

  const navigateTo = (dest: number) => {
    //@ts-ignore
    dispatch(setCurrentBoardPage(boardTypeToEnglish[boards[dest]]));
    dispatch(setShowBoardDropDownList(false));
  };

  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={500}>
      <TouchableOpacity onPress={() => navigateTo(0)}>
        <Text style={styles.text}>{boards[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo(1)}>
        <Text style={styles.text}>{boards[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo(2)}>
        <Text style={styles.text}>{boards[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo(3)}>
        <Text style={styles.text}>{boards[3]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo(4)}>
        <Text style={styles.text}>{boards[4]}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default DropDownList;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: 163,
    height: 188,
    backgroundColor: "white",
    borderWidth: 1,
    position: "absolute",
    top: 163,
    left: "5%",
    justifyContent: "space-around",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
});
