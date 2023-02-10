import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import RenderHTML from "react-native-render-html";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import Comments from "./Comments";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const PostContent = ({
  postId,
  title,
  content,
}: {
  postId: number;
  title: string;
  content: string;
}) => {
  const [commentArr, setCommentArr] = useState<any>([]);

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
    console.log("slfjasldkfjaslk", commentArr.length);
  }, [postId]);

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
        <FontAwesome5 name="comment" size={22} color="black" />
        <Text style={styles.counts}> 3</Text>
        <Feather name="heart" size={23} color="black" />
        <Text style={styles.counts}> 4</Text>
      </View>
      <View>
        {commentArr.map((item: any) => {
          return (
            <Comments
              id={item.id}
              author={item.author.name}
              content={item.content}
              upvoteCount={item.upvoteCount}
              upvoted={item.upvoted}
              postId={item.post}
              lastModified={new Date(item.updatedAt)}
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
