import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  Text
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenCommentInput } from "../../../redux/features/openCommentInput";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const PostComment = ({
  postId,
  commentId,
}: {
  postId: number;
  commentId: any;
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>("");

  const handleCancelPress = () => {
    dispatch(setOpenCommentInput(false));
  };

  const postComment = async () => {
    if (comment == "") {
      Alert.alert("댓글 내용을 작성해주세요.");
      return;
    }
    const url = REACT_APP_HOST + "/api/post/addComment/" + postId;
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
    } else {
      Alert.alert(
        "댓글 작성에 실패했습니다. 오류가 계속되면 한인회 IT팀에게 문의해주세요."
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
          onChangeText={(newComment) => setComment(newComment)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleCancelPress}>
          <Text style={styles.cancelButton}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={postComment}>
          <Text style={styles.postButton}>게시</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostComment;

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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    fontSize: 13,
    color: "#bfbfbf",
    margin: 10,
    marginRight: 20,
  },
  postButton: {
    fontSize: 13,
    color: "#BCA06D",
    margin: 10,
    fontWeight: "600",
  },
});
