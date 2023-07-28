import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, Text, text, View, FlatList, Image } from "react-native";

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuary = "pokemon?limit=151&offset=0";
const firstGenPokemonPath = `${pokePath}${pokeQuary}`;

export default function App() {
  const [firstGenPokemonDetails, setFirstGenPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

      const firstGenPokemonDetails = await Promise.all(
        firstGenPokemonIdsBody.results.map(async (p) => {
          const pDetails = await fetch(p.url);

          return await pDetails.json();
        })
      );

      setFirstGenPokemonDetails(firstGenPokemonDetails);
    };

    fetchFirstGenPokemons();
  }, []);

  const renderPokemon = ({ item }) => {
    return (
      <View style={{ backgroundColor: "grey", marginTop: 15 }}>
        <Text style={{ fontSize: 32, alignSelf: "center", marginTop: 10 }}>{`${
          item.name.charAt(0).toUpperCase() + item.name.slice(1)
        }`}</Text>
        <Image
          style={{ width: 200, height: 200, alignSelf: "center" }}
          source={{
            uri: item.sprites.front_default,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, alignSelf: "center", marginBottom: 10 }}>
        Daftar-daftar Pokemon
      </Text>
      <FlatList data={firstGenPokemonDetails} renderItem={renderPokemon} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
  },
});
