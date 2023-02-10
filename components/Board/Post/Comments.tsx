import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Replies from "./Replies";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import * as Animatable from "react-native-animatable";

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
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReplies = async () => {
    const url = REACT_APP_HOST + "/api/post/getComments/" + id;
    const response = await fetch(url, {
      method: "GET",
    });
    console.log(url);
    console.log(response.status);
    if (response.status == 200) {
      const repliesArr = await response.json();
      console.log(repliesArr);
      setRepliesArr(repliesArr);
    }
  };

  const handleLoadReplies = () => {
    setShowReplies(!showReplies);
  };

  useEffect(() => {
    fetchReplies().catch(console.error);
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage == "" ? (
          <View style={styles.image} />
        ) : (
          <Image style={styles.image} source={{ uri: profileImage }}></Image>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.name}>{author}</Text>
          <Text style={{ fontSize: 9 }}>{"    "}25분 전</Text>
        </View>
        <Text style={styles.content}>{content}</Text>

        <View style={styles.buttonsContainer}>
          <Text style={[styles.buttons, { marginRight: 20 }]}>
            좋아요 {upvoteCount}개
          </Text>
          <TouchableOpacity>
            <Text style={styles.buttons}>답글 쓰기</Text>
          </TouchableOpacity>
        </View>
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
            <Animatable.View animation="slideInLeft">
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
                    // replyTo={reply.replyTo}
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
                  style={{ width: 20, height: 1, backgroundColor: "#808080" }}
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
    </View>
  );
};

export default Comments;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: width * 0.9,
    // borderWidth: 1,
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
    flex: 0.87,
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
  replyButton: {
    fontSize: 12,
    color: "#808080",
  },
});
