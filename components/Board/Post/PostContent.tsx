import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Vibration,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import RenderHTML from "react-native-render-html";
import { FontAwesome5, Feather, FontAwesome } from "@expo/vector-icons";
import Comments from "./Comments";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import PostComment from "./PostComment";
import { setOpenCommentInput } from "../../../redux/features/openCommentInput";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../../../redux/features/refresher";
import * as Haptics from "expo-haptics";

const PostContent = ({
  navigation,
  postId,
  title,
  content,
  upvoteCount,
  upvoted,
  commentCount,
  userEmail,
}: {
  navigation: any;
  postId: number;
  title: string;
  content: string;
  upvoteCount: number;
  upvoted: boolean;
  commentCount: number;
  userEmail: string;
}) => {
  const [commentArr, setCommentArr] = useState<any>([]);
  // const [openComment, setOpenComment] = useState<boolean>(false);

  const openComment = useSelector((state: any) => state.openCommentInput.value);
  const currentUser = useSelector((state: any) => state.user.value);

  const dispatch = useDispatch();

  const upvotePost = async () => {
    const url =
      process.env.REACT_APP_HOST + "/api/post/pushPostUpvote/" + postId;
    const response = await fetch(url, {
      method: "POST",
    });

    if (response.status == 200) {
      const json = await response.json();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      dispatch(setRefresh());
    }
  };

  const handleEditPress = async () => {
    navigation.navigate("EditPostScreen", {
      postId: postId,
      prevTitle: title,
      prevContent: content,
    });
  };

  const source = {
    html: content,
  };

  const tagsStyles = {
    p: {
      fontSize: 14,
      lineHeight: "1.2em",
      marginVertical: 3,
    },
  };

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
    },
  };
  const refresh: string = useSelector((state: any) => state.refresh.value);

  const handleCommentPress = () => {
    // setOpenComment(!openComment);
    dispatch(setOpenCommentInput(true));
  };

  const handleDeleteConfirmation = async () => {
    Alert.alert("게시물을 삭제하시겠습니까?", "", [
      {
        text: "아니오",
        onPress: () => {},
        style: "cancel",
      },
      { text: "예", onPress: deletePost, style: "default" },
    ]);
  };

  const deletePost = async () => {
    const url = REACT_APP_HOST + "/api/post/deletePost/" + postId;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.status === 200) {
      Alert.alert("정상적으로 삭제되었습니다.");
      dispatch(setRefresh());
      navigation.goBack();
    } else {
      Alert.alert(
        "삭제 요처을 처리하는 도중 문제가 발생했습니다. 오류가 계속되면 하단의 한인회 IT팀에게 문의해주세요."
      );
    }
  };

  const fetchComments = async () => {
    const url = REACT_APP_HOST + "/api/post/getPostComments/" + postId;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const commentArr = await response.json();
      setCommentArr(commentArr);
    }
  };

  useEffect(() => {
    fetchComments().catch(console.error);
  }, [postId, refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <RenderHTML
          contentWidth={width}
          source={source}
          //@ts-ignore
          tagsStyles={tagsStyles}
          renderersProps={renderersProps}
        />
      </View>
      <View style={styles.contentCommentDivider}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleCommentPress}>
            <FontAwesome5 name="comment" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.counts}> {commentCount}</Text>

          <TouchableOpacity
            onPress={upvotePost}
            style={{ flexDirection: "row" }}
          >
            {upvoted ? (
              <FontAwesome name="heart" size={20} color="#DD0000" />
            ) : (
              <Feather name="heart" size={20} color="black" />
            )}
            <Text style={styles.counts}> {upvoteCount}</Text>
          </TouchableOpacity>
        </View>
        {userEmail === currentUser.email && (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleEditPress}>
              <Text style={styles.editPostButton}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteConfirmation}
              style={{ marginLeft: 15, marginRight: 3 }}
            >
              <Text style={styles.editPostButton}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ minHeight: 100 }}>
        {openComment && <PostComment postId={postId} commentId={null} />}
        {commentArr.map((item: any) => {
          return (
            <Comments
              id={item.id}
              author={item.author.name}
              content={item.content}
              upvoteCount={item.upvoteCount}
              upvoted={item.upvoted}
              postId={item.post}
              lastModified={new Date(item.createdAt)}
              // replyTo={item.replyTo}
              isMine={item.isMine}
              profileImage={item.author.profileImageUrl}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PostContent;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: width * 0.9,
  },
  titleContainer: {
    justifyContent: "flex-start",
    width: width * 0.9,
    borderBottomWidth: 1,
    paddingBottom:10,
    marginBottom: 20,
    flexDirection: "row"
  },
  contentContainer: {
    padding: 3,
    minHeight: 270,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    // marginLeft: 5,
    width: width * 0.9,
    flex: 1,
    flexWrap: "wrap"
  },
  contentCommentDivider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#0B121C5C",
    paddingVertical: 10,
    marginTop: 5,
  },
  counts: {
    fontWeight: "700",
    fontSize: 13,
    marginRight: 15,
  },
  editPostButton: {
    fontSize: 12.5,
    fontWeight: "700",
  },
});
