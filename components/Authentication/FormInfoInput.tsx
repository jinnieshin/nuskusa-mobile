import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import React from "react";
import { Control, Controller } from "react-hook-form";

const FormInfoInput = ({
  isRequired,
  description,
  placeholder,
  subtitle1,
  subtitle2,
  controller,
  name,
  secureTextEntry,
  rules,
}: {
  isRequired: boolean;
  description: string;
  placeholder: string;
  subtitle1: string;
  subtitle2: string;
  controller: any;
  name: string;
  secureTextEntry: boolean;
  rules: any;
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
        <View style={{ marginBottom: 25 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.description, { color: "#E12B2B" }]}>
              {isRequired ? "*" : ""}{" "}
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
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
          {error && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 2 }}>
              {error.message || "Error"}
            </Text>
          )}
          {subtitle1 ? (
            <Text style={styles.subtitle}>
              {subtitle1}
              {"\n"}
              {subtitle2}
            </Text>
          ) : (
            <></>
          )}
        </View>
      )}
    />
  );
};

export default FormInfoInput;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.84,
    height: 46,
    // borderColor: "Black",
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  input: {
    alignContent: "center",
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 9,
    color: "#898A8D",
    marginTop: 4,
  },
});
