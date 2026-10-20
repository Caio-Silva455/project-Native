import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "expo-router";

export default function App() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.container}>
          <Image
            source={require("../assets/imag1.jpg")}
            style={style.illustation}
          />

          <Text style={style.title}>Entrar</Text>
          <Text style={style.subTitle}>
            {" "}
            Acesse sua conta com email e senha.{" "}
          </Text>

          <View style={style.form}>
            <Input placeholder="Email:" keyboardType="email-address" />
            <Input placeholder="Senha: " secureTextEntry />
            <Link href="/enter">
              <Button label="Entrar" />
            </Link>
          </View>
        </View>

        <Text style={style.footerText}>
          Não tenho uma conta?{" "}
          <Link href="/signup" style={style.footerLink}>
            Cadastre-se aqui
          </Link>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 32,
  },
  illustation: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
    marginTop: 62,
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
  },
  subTitle: {
    fontSize: 16,
  },
  form: {
    marginTop: 24,
    gap: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 32,
    color: "#bdbbbb",
  },
  footerLink: {
    color: "#4F6CF3",
    fontWeight: 700,
  },
});
