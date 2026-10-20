import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function signup() {
  return (
    <ScrollView>
      <View style={style.container}>
        <Link href="/">
          <Ionicons name="arrow-back-circle-outline" size={36} color="#000" />
        </Link>

        <Image
          source={require("../assets/seguranca-do-computador-com-cadeado-de-login-e-senha_107791-16191.avif")}
          style={style.Image}
          resizeMode="contain"
        />

        <Text style={style.Text}>Cadastre seu usuario</Text>

        <View style={style.form}>
          <Input
            placeholder="Cadastre seu email: "
            keyboardType="email-address"
          />
          <Input placeholder="Cadastre sua senha: " secureTextEntry />
          <Link href="/enter">
            <Button label="Cadastrar usuario" />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 32,
  },
  title: {
    width: "100%",
  },
  Image: {
    width: "100%",
    gap: 30,
    padding: 30,
    height: 300,
  },
  Text: {
    fontSize: 30,
    fontWeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginTop: 24,
    gap: 10,
  },
});
