import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "expo-router";
import { memo, useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

type Produto = {
  id: number;
  numberProd?: number;
  nameProd: string;
  dateProd: string;
  localDestino?: string;
  desc: string;
};

const MENSAGEM_SEM_ENDERECO = "O pedido não tem endereço, irá para base";

const PLANILHA: Produto[] = [
  {
    id: 1,
    numberProd: 32,
    nameProd: "Pen",
    dateProd: "2026/07/06",
    desc: "Of 1890, origin from Inglaterra ",
  },
  {
    id: 2,
    numberProd: 33,
    nameProd: "Book",
    dateProd: "2020/10/05",
    desc: "Avencture",
  },
  {
    id: 3,
    numberProd: 34,
    nameProd: "phone",
    dateProd: "2026/12/09",
    desc: "Iphone 17",
  },
  {
    id: 4,
    numberProd: 35,
    nameProd: "Computer",
    dateProd: "2026/10/05",
    desc: "Linux Debian 12",
    localDestino: "Espirito Santo - Vila Velha",
  },
];

PLANILHA.forEach((List) => {
  if (!typeof List.nameProd) {
    return MENSAGEM_SEM_ENDERECO;
  } else {
    return true;
  }
});

function normalizar(texto: string): string {
  return texto
    .normalize("NFC")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatarData(data: string): string {
  const partes = data.split("/");
  if (partes.length !== 3) {
    return data;
  }
  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

function getDestino(item: Produto): string {
  const destino = item.localDestino?.trim();
  return destino ? destino : MENSAGEM_SEM_ENDERECO;
}

const ProdutoCard = memo(function ProdutoCard({ item }: { item: Produto }) {
  const semEndereco = !item.localDestino?.trim();

  return (
    <View style={style.card}>
      <View style={style.cardHeader}>
        <Text style={style.cardTitle}>{item.nameProd}</Text>
        <Text style={style.cardNumber}>Nº {item.numberProd ?? "—"}</Text>
      </View>

      <Text style={style.cardText}>{item.desc}</Text>
      <Text style={style.cardMeta}>Data: {formatarData(item.dateProd)}</Text>

      <Text style={[style.cardMeta, semEndereco && style.cardAlerta]}>
        Destino: {getDestino(item)}
      </Text>
    </View>
  );
});

export default function Prox() {
  const [produto, setProduto] = useState("");

  const listaFiltrada = useMemo(() => {
    const termo = normalizar(produto);
    if (!termo) return PLANILHA;
    return PLANILHA.filter((item) => normalizar(item.nameProd).includes(termo));
  }, [produto]);

  const limparBusca = useCallback(() => setProduto(""), []);

  const renderItem = useCallback(
    ({ item }: { item: Produto }) => <ProdutoCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Produto) => String(item.id), []);

  const cabecalho = (
    <View style={style.header}>
      <Link href="/enter">
        <Text style={style.link}>Voltar</Text>
      </Link>

      <View style={style.searchContainer}>
        <Input
          value={produto}
          onChangeText={setProduto}
          placeholder="Digite o nome do produto"
        />
        {produto.length > 0 && (
          <Button label="Limpar busca" onPress={limparBusca} />
        )}
      </View>

      <Text style={style.contador}>
        {listaFiltrada.length}{" "}
        {listaFiltrada.length === 1
          ? "produto encontrado"
          : "produtos encontrados"}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <FlatList
        data={listaFiltrada}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={cabecalho}
        ListEmptyComponent={
          <Text style={style.vazio}>Nenhum produto encontrado.</Text>
        }
        contentContainerStyle={style.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />

      <Link href="/end">
        <Button label="Pagina final">Ir para a pagina final</Button>
      </Link>
    </ScrollView>
  );
}

const COLORS = {
  text: "#111111",
  muted: "#666666",
  border: "#080808",
  alerta: "#B45309",
};

const style = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  header: {
    gap: 16,
    marginBottom: 8,
  },
  link: {
    fontSize: 16,
    color: COLORS.text,
  },
  searchContainer: {
    width: "100%",
    gap: 10,
  },
  contador: {
    fontSize: 14,
    color: COLORS.muted,
  },
  vazio: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 24,
  },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
  },
  cardNumber: {
    fontSize: 14,
    color: COLORS.muted,
  },
  cardText: {
    fontSize: 15,
    color: COLORS.text,
  },
  cardMeta: {
    fontSize: 13,
    color: COLORS.muted,
  },
  cardAlerta: {
    color: COLORS.alerta,
    fontWeight: "500",
  },
  button:{
    width: "90%",
    padding: 20,
    gap: 10,
  }
});
