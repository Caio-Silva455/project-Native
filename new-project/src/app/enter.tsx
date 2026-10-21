import { Link } from "expo-router";
import { useState } from "react"; // 1. IMPORTADO O USESTATE
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const LIST_DATA = [
  { id: "1", name: "Caio", age: 21, desc: "Estudante da UVV" },
  { id: "2", name: "Pedro", age: 19, desc: "Estudante da Faesa" },
  { id: "3", name: "João", age: 20, desc: "Estudante de Multivix" },
];

export default function Enter() {
  // 2. ESTADO PARA GUARDAR O TEXTO DE BUSCA
  const [pesquisa, setPesquisa] = useState("");

  // 3. LÓGICA DE FILTRAGEM (POR NOME OU IDADE)
  const listaFiltrada = LIST_DATA.filter((pessoa) => {
    const textoDigitado = pesquisa.toLowerCase().trim();

    // Se o input estiver vazio, mostra todo mundo
    if (!textoDigitado) return true;

    const nomeBate = pessoa.name.toLowerCase().includes(textoDigitado);
    const idadeBate = pessoa.age.toString() === textoDigitado;

    return nomeBate || idadeBate;
  });

  return (
    <ScrollView style={style.screen}>
      <Link href="/prox">
        <Text>proxima pagina</Text>
      </Link>
      <Text style={style.title}>Buscar:</Text>

      <View style={style.searchContainer}>
        {/* 4. CONECTANDO O INPUT AO ESTADO */}
        <Input
          value={pesquisa}
          onChangeText={setPesquisa}
          placeholder="Digite o nome ou idade..."
        />
        <Button label="Procurar" />
      </View>

      {/* 5. RENDERIZANDO A LISTA JÁ FILTRADA */}
      <View style={style.listContainer}>
        {listaFiltrada.length > 0 ? (
          listaFiltrada.map((pessoa) => (
            <View key={pessoa.id} style={style.card}>
              <Text style={style.cardTitle}>
                {pessoa.name} ({pessoa.age} anos)
              </Text>
              <Text style={style.cardDesc}>{pessoa.desc}</Text>
            </View>
          ))
        ) : (
          <Text style={style.noResult}>Nenhum estudante encontrado.</Text>
        )}
      </View>

      <View style={style.proxPagin}>
        <Link href="/prox">
          <Button label="Proxima tela"></Button>
        </Link>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 40,
  },
  searchContainer: {
    width: "100%",
    padding: 20,
    gap: 10,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  noResult: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
  proxPagin: {
    flex: 1, 
    padding: 32, 
    gap: 10, 
  }
});
