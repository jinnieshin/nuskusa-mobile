import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Replies from "./Replies";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import * as Animatable from "react-native-animatable";
import { Feather, FontAwesome } from "@expo/vector-icons";
import EditComment from "./EditComment";
import { useSelector, useDispatch } from "react-redux";
import PostReplies from "./PostReplies";
import { setCommentContent } from "../../../redux/features/commentContent";
import * as Haptics from "expo-haptics";
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
  profileImage: string;
};

const Comments = ({
  id,
  author,
  content,
  upvoteCount,
  lastModified,
  isMine,
  upvoted,
  postId,
  profileImage,
}: commentObject) => {
  const [repliesArr, setRepliesArr] = useState<any>([]);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const [writeReplies, setWriteReplies] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const refresh: string = useSelector((state: any) => state.refresh.value);
  const currentUser: any = useSelector((state: any) => state.user.value);

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

  const deleteComment = async () => {
    const url = REACT_APP_HOST + "/api/post/deleteComment/" + id;
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
    });
    console.log("DELETE RESPONSE: ", response.status);
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
        replyTo: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 201) {
      setWriteReplies(false);
      dispatch(setRefresh());
      dispatch(setCommentContent(""));
    } else {
      Alert.alert(
        "댓글 작성에 실패했습니다. 오류가 계속되면 한인회 IT팀에게 문의해주세요."
      );
    }
  };

  const fetchReplies = async () => {
    const url = REACT_APP_HOST + "/api/post/getComments/" + id;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const repliesArr = await response.json();
      setRepliesArr(repliesArr);
    }
  };
  const editComment = async () => {
    if (comment == "") {
      Alert.alert("댓글 내용을 작성해주세요.");
      return;
    }
    const url = REACT_APP_HOST + "/api/post/editComment/" + id;
    console.log("CURRENT COMMENT: ", comment);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        content: comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("EDIT RESPONSE: ", response.status);
    if (response.status === 201) {
      setIsEditing(false);
      dispatch(setRefresh());
    } else {
      Alert.alert(
        "댓글 수정에 실패했습니다. 오류가 계속되면 한인회 IT팀에게 문의해주세요."
      );
    }
  };

  const handleLoadReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleOpenEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    fetchReplies().catch(console.error);
  }, [refresh]);

  const handleWriteComment = () => {
    setShowKeyboard(!showKeyboard);
    // Keyboard.
  };

  return isEditing ? (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage == "" ? (
          <View style={styles.image} />
        ) : (
          <Image style={styles.image} source={{ uri: profileImage }}></Image>
        )}
      </View>
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
    // </View>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage == "" ? (
          <View style={styles.image} />
        ) : (
          <Image style={styles.image} source={{ uri: profileImage }}></Image>
        )}
      </View>
      <>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.name}>{author}</Text>
            <Text style={{ fontSize: 9 }}>
              {"    "}
              25분 전
            </Text>
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
          {/* If there exist replies to the comment, have a button to load them */}
          {repliesArr.length > 0 && !showReplies ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 13,
              }}
              onPress={handleLoadReplies}
            >
              <View
                style={{ width: 20, height: 1, backgroundColor: "#808080" }}
              />
              <Text style={styles.replyButton}>
                {"  "}
                답글 {repliesArr.length}개 더 보기
              </Text>
            </TouchableOpacity>
          ) : (
            repliesArr.length > 0 && (
              <Animatable.View>
                {repliesArr.map((reply: any) => {
                  return (
                    <Replies
                      id={reply.id}
                      author={reply.author.name}
                      content={reply.content}
                      upvoteCount={reply.upvoteCount}
                      upvoted={reply.upvoted}
                      postId={reply.post}
                      lastModified={new Date(reply.updatedAt)}
                      replyTo={reply.replyTo}
                      isMine={reply.isMine}
                      profileImage={reply.author.profileImageUrl}
                    />
                  );
                })}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 13,
                  }}
                  onPress={handleLoadReplies}
                >
                  <View
                    style={{
                      width: 20,
                      height: 1,
                      backgroundColor: "#808080",
                    }}
                  />
                  <Text style={styles.replyButton}>
                    {"  "}
                    답글 숨기기
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            )
          )}
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
      </>
    </View>
  );
};

export default Comments;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: width * 0.9,
    flexDirection: "row",
    padding: 10,
  },
  imageContainer: {
    flex: 0.13,
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    marginTop: 2,
    flex: 0.79,
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
  // replyButton: {
  //   fontSize: 12,
  //   color: "#808080",
  // },
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
