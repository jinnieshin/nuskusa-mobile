import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import textInputType from "../../constants/textInputType";

const textInputBox = ({
  placeholder,
  controller,
  name,
  secureTextEntry = false,
  rules,
}: {
  placeholder: string;
  controller: Control;
  name: string;
  secureTextEntry: boolean;
  rules: object;
}) => {
  return (
    <Controller
      control={controller}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          {/* {error && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {error.message || "Error"}
            </Text>
          )} */}
          <View
            style={[styles.container, { borderColor: error ? "red" : "black" }]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        </>
      )}
    />
  );
};

export default textInputBox;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: width * 0.84,
    height: 50,
    borderColor: "Black",
    borderWidth: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
    marginVertical: -1,
  },
  input: {
    alignContent: "center",
    fontSize: 13,
    fontWeight: "500",
  },
});
