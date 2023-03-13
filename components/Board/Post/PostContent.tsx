import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Vibration,
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
  postId,
  title,
  content,
  upvoteCount,
  upvoted,
  commentCount,
}: {
  postId: number;
  title: string;
  content: string;
  upvoteCount: number;
  upvoted: boolean;
  commentCount: number;
}) => {
  const [commentArr, setCommentArr] = useState<any>([]);
  // const [openComment, setOpenComment] = useState<boolean>(false);

  const openComment = useSelector((state: any) => state.openCommentInput.value);

  const dispatch = useDispatch();
  console.log(content);

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

  const fetchComments = async () => {
    const url = REACT_APP_HOST + "/api/post/getPostComments/" + postId;
    const response = await fetch(url, {
      method: "GET",
    });
    console.log(url);
    console.log(response.status);
    if (response.status == 200) {
      const commentArr = await response.json();
      console.log("Comment", commentArr);
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
        <TouchableOpacity onPress={handleCommentPress}>
          <FontAwesome5 name="comment" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.counts}> {commentCount}</Text>

        <TouchableOpacity onPress={upvotePost} style={{ flexDirection: "row" }}>
          {upvoted ? (
            <FontAwesome name="heart" size={20} color="#DD0000" />
          ) : (
            <Feather name="heart" size={20} color="black" />
          )}
          <Text style={styles.counts}> {upvoteCount}</Text>
        </TouchableOpacity>
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
    height: 40,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 3,
    minHeight: 270,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    // marginLeft: 5,
  },
  contentCommentDivider: {
    flexDirection: "row",
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
});
