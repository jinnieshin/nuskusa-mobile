import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import PostReplies from "./PostReplies";
import { useDispatch, useSelector } from "react-redux";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { setCommentContent } from "../../../redux/features/commentContent";
import * as Haptics from "expo-haptics";
import EditComment from "./EditComment";
import { setRefresh } from "../../../redux/features/refresher";

type commentObject = {
  id: number;
  author: string;
  content: string;
  upvoteCount: number;
  lastModified: any;
  upvoted: boolean;
  isMine: boolean;
  postId: number;
  replyTo: number;
  profileImage: string;
};

const Replies = ({
  id,
  author,
  content,
  upvoteCount,
  lastModified,
  isMine,
  replyTo,
  upvoted,
  postId,
  profileImage,
}: commentObject) => {
  const [writeReplies, setWriteReplies] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const openReplies = () => {
    setWriteReplies(true);
  };

  const cancelReply = () => {
    setWriteReplies(false);
  };

  const comment = useSelector((state: any) => state.commentContent.value);
  const dispatch = useDispatch();

  const upvoteComment = async () => {
    const url = REACT_APP_HOST + "/api/post/pushCommentUpvote/" + id;
    const response = await fetch(url, {
      method: "POST",
    });

    if (response.status == 200) {
      const json = await response.json();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      dispatch(setRefresh());
    } else {
      Alert.alert("좋아요 처리에 실패했습니다.");
    }
  };

  const addReply = async () => {
    if (comment == "") {
      Alert.alert("댓글 내용을 작성해주세요.");
      return;
    }
    const url = REACT_APP_HOST + "/api/post/addComment/" + postId;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        replyTo: replyTo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 201) {
      dispatch(setRefresh());
      setWriteReplies(false);
      dispatch(setCommentContent(""));
    } else {
      Alert.alert(
        "댓글 작성에 실패했습니다. 오류가 계속되면 한인회 IT팀에게 문의해주세요."
      );
    }
  };

  const deleteComment = async () => {
    const url = REACT_APP_HOST + "/api/post/deleteComment/" + id;
    const response = await fetch(url, {
      method: "POST",
    });
    if (response.status === 200) {
      dispatch(setRefresh());
    } else {
      Alert.alert(
        "댓글을 삭제하지 못했습니다. 삭제 권한이 없을 수도 있습니다. 오류가 계속되면 하단의 Contact Us 양식을 통해 문의해주세요."
      );
    }
  };

  const handleDeletePress = async () => {
    Alert.alert("댓글을 삭제하시겠습니까?", "", [
      {
        text: "아니오",
        onPress: () => {},
        style: "cancel",
      },
      { text: "예", onPress: deleteComment },
    ]);
  };
  const editComment = async () => {
    if (comment == "") {
      Alert.alert("댓글 내용을 작성해주세요.");
      return;
    }
    const url = REACT_APP_HOST + "/api/post/editComment/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        content: comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      setIsEditing(false);
      dispatch(setRefresh());
    } else {
      Alert.alert(
        "댓글 수정에 실패했습니다. 오류가 계속되면 한인회 IT팀에게 문의해주세요."
      );
    }
  };
  const handleOpenEdit = () => {
    setIsEditing(!isEditing);
  };

  return isEditing ? (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}>
        {profileImage == "" ? (
          <View style={styles.image} />
        ) : (
          <Image style={styles.image} source={{ uri: profileImage }}></Image>
        )}
      </View> */}
      <View style={styles.contentContainer}>
        <EditComment postId={postId} commentId={id} prevContent={content} />
        <View style={styles.postButtonsContainer}>
          <TouchableOpacity onPress={handleOpenEdit}>
            <Text style={styles.cancelButton}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={editComment}>
            <Text style={styles.postButton}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <View style={styles.container}>
        {/* <View style={styles.imageContainer}>
          {profileImage == "" ? (
            <View style={styles.image} />
          ) : (
            <Image style={styles.image} source={{ uri: profileImage }}></Image>
          )}
        </View> */}
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.name}>{author}</Text>
            <Text style={{ fontSize: 9 }}>{"    "}25분 전</Text>
          </View>
          <Text style={styles.content}>{content}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.buttonsContainer}>
              <Text style={[styles.buttons, { marginRight: 20 }]}>
                좋아요 {upvoteCount}개
              </Text>
              <TouchableOpacity onPress={openReplies}>
                <Text style={styles.buttons}>답글 쓰기</Text>
              </TouchableOpacity>
            </View>
            {isMine && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  top: -1,
                }}
              >
                <TouchableOpacity onPress={handleOpenEdit}>
                  <Text style={styles.editButtons}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeletePress}
                  style={{ marginLeft: 15 }}
                >
                  <Text style={[styles.editButtons]}>삭제</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{ flex: 0.08, height: 20, alignItems: "center" }}
          onPress={upvoteComment}
        >
          {upvoted ? (
            <FontAwesome name="heart" size={13} color="#DD0000" />
          ) : (
            <Feather name="heart" size={13} color="black" />
          )}
        </TouchableOpacity>
      </View>
      {writeReplies && (
        <View>
          <PostReplies postId={postId} commentId={id} />
          <View style={styles.postButtonsContainer}>
            <TouchableOpacity onPress={cancelReply}>
              <Text style={styles.cancelButton}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addReply}>
              <Text style={styles.postButton}>게시</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Replies;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: width,
    // borderWidth: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  imageContainer: {
    flex: 0.17,
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    marginTop: 2,
    flex: 0.75,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
  },
  content: {
    fontSize: 13,
    marginTop: 7,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 9,
  },
  buttons: {
    fontSize: 10.5,
    fontWeight: "700",
  },
  editButtons: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "grey",
  },
  replyButton: {
    fontSize: 12,
    color: "#808080",
  },
  postButtonsContainer: {
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
