import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { usePokemonList } from "../hooks/usePokemonList";

const HomeScreen = () => {
  const { pokemons, loading, error } = usePokemonList(20);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Ocurrió un error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Link href="/favoritos" asChild>
          <Pressable style={styles.favLink}>
            <Text style={styles.favLinkText}>★ Ver favoritos</Text>
          </Pressable>
        </Link>
      }
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Link href={`/pokemon/${item.name}`} asChild>
            <Pressable style={styles.nameWrap}>
              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          </Link>
          <Pressable onPress={() => toggleFavorite(item.name)} hitSlop={10}>
            <Text style={styles.star}>
              {isFavorite(item.name) ? "★" : "☆"}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 16 },
  favLink: { paddingVertical: 12, marginBottom: 8 },
  favLinkText: { fontSize: 16, fontWeight: "bold", color: "#f5a623" },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  nameWrap: { flex: 1 },
  name: { fontSize: 18, textTransform: "capitalize" },
  star: { fontSize: 20, color: "#f5a623" },
});

export default HomeScreen;