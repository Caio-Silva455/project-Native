import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { Input } from "@/components/Input";
import {Button} from "@/components/Button"

type materias = {
  nameMateria: string;
  cursoMateria: string;
  notaAtividade?: number;
  dataMateria: string[];
  notaMateria: number;
};

const list: materias[] = [
  {
    nameMateria: "DevOps",
    cursoMateria: "ADS",
    notaAtividade: 3,
    dataMateria: ["Terça", "Quinta"],
    notaMateria: 6,
  },
];

export default function End() {
  const [materia, setMateria] = useState("");



  return (
    <ScrollView>
        <View style={style.break}>
            <Link href="/prox"> <Button label="Voltar"></Button></Link>
        </View>
        <View style={style.container}>
            <Input value={materia} onChangeText={setMateria} placeholder="Digite uma materia"></Input>

            <Button label="Procurar Materia"></Button>
        </View>

        <View>

        </View>
      
    </ScrollView>
  );
}

const style = StyleSheet.create({
    break:{flex: 1, width: "100%", padding: 32, gap: 10},
    container:{flex: 1, padding: 32, gap: 10}, 
})
