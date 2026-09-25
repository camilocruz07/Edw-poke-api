import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";

const FavoritosScreen = () => {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Aún no tienes favoritos. Marca alguno con la ★ en la lista o el detalle.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Link href={`/pokemon/${item}`} asChild>
            <Pressable style={{ flex: 1 }}>
              <Text style={styles.name}>{item}</Text>
            </Pressable>
          </Link>
          <Pressable onPress={() => toggleFavorite(item)}>
            <Text style={styles.star}>★</Text>
          </Pressable>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  list: { padding: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: { fontSize: 18, textTransform: "capitalize" },
  star: { fontSize: 20, color: "#f5a623" },
});

export default FavoritosScreen;