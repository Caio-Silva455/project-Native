import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  type busca = { busca: string };

  return <TextInput style={style.input} {...rest} />;
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#070707",
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    paddingLeft: 12,
  },
});
