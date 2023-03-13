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

const PostReplies = ({
  postId,
  commentId,
}: {
  postId: number;
  commentId: any;
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>("");

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
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostReplies;

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
