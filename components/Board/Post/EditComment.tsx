import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { View, Text } from "../../Themed";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenCommentInput } from "../../../redux/features/openCommentInput";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import { setCommentContent } from "../../../redux/features/commentContent";
import { setRefresh } from "../../../redux/features/refresher";

const EditComment = ({
  postId,
  commentId,
  prevContent,
}: {
  postId: number;
  commentId: any;
  prevContent: string;
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>("");

  const handleCancelPress = () => {
    dispatch(setOpenCommentInput(false));
  };

  const editComment = async () => {
    if (comment == "") {
      Alert.alert("댓글 내용을 작성해주세요.");
      return;
    }
    const url = REACT_APP_HOST + "/api/post/editComment/" + postId;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        replyTo: null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 201) {
      dispatch(setOpenCommentInput(false));
      dispatch(setRefresh());
    } else {
      Alert.alert(
        "댓글 수정에 실패했습니다. 오류가 계속되면 한인회 IT팀에게 문의해주세요."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.comment}
          placeholder="댓글 달기..."
          autoFocus={true}
          multiline={true}
          onChangeText={(newComment) => dispatch(setCommentContent(newComment))}
          defaultValue={prevContent}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditComment;

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    borderWidth: 1,
    borderColor: "#0B121C5C",
    height: 70,
    borderRadius: 2,
    padding: 3,
    marginHorizontal: 1,
  },
  comment: {
    fontSize: 12.5,
  },
});
