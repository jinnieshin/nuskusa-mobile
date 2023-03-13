import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome5, Octicons, AntDesign } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";
import timeAgo from "../TimeAgo";

type Props = {
  id: string;
  navigation: any;
  name: string;
  // time: number;
  title: string;
  content: string;
  isPinned: boolean;
  lastModified: any;
  // upvoteCount: number;
  // commentCount: number;
  // profileImage: string;
};

const PostThumbnail = ({
  navigation,
  id,
  name,
  title,
  content,
  isPinned,
  lastModified,
}: Props) => {
  const source = {
    html: content,
  };

  const handlePostPress = () => {
    navigation.navigate("PostScreen", { postId: id });
  };

  const htmlString = content;
  const temp = htmlString.replace(/&nbsp;/g, " ");
  const temp2 = temp.replace(/&nbsp/g, " ");
  const renderedContent = temp2.replace(/<[^>]+>/g, "");

  return (
    <TouchableOpacity onPress={handlePostPress} style={styles.container}>
      <View style={styles.upperContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.profileImage} />
            <View style={{ marginLeft: 7 }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.time}>{timeAgo(new Date(lastModified))}</Text>
            </View>
          </View>
          {isPinned && (
            <AntDesign
              name="pushpin"
              size={18}
              color="#333"
              style={{
                marginRight: 7,
                transform: [{ scaleX: -1 }],
              }}
            />
          )}
        </View>
        {/* Likes and comment count */}
        {/* <View style={{ flexDirection: "row", alignItems: "center", top: -5 }}>
          <FontAwesome5 name="comment" size={17} color="black" />
          <Text style={styles.count}> 3</Text>
          <Octicons
            name="heart-fill"
            size={17}
            color="#cc0000"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.count}> 3</Text>
        </View> */}
      </View>

      <View style={styles.lowerContainer}>
        <Text style={styles.title}>
          {title.slice(0, 23)}
          {title.length > 23 && "..."}
        </Text>
        {/* <RenderHtml source={source}/> */}
        <Text style={styles.content}>{renderedContent.slice(0, 70)}...</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostThumbnail;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 120,
    borderBottomWidth: 1,
    alignSelf: "center",
    padding: 3,
    marginBottom: 10,
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    backgroundColor: "#D9D9D9",
    height: 36,
    width: 36,
    borderRadius: 36,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
  },
  time: {
    fontSize: 10,
    marginTop: 3,
  },
  count: {
    fontSize: 13,
    fontWeight: "700",
  },
  lowerContainer: {
    marginTop: 13,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    fontSize: 12,
    marginTop: 3,
  },
});
