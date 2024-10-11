import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { FormFieldProps } from "@/types";

const SearchInput = ({ initialQuery }: FormFieldProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  // Update local state when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

  const handleSearch = () => {
    if (!query.trim()) {
      return Alert.alert(
        "Missing query",
        "Please input something to search results across database"
      );
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query: query.trim() });
    } else {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#cdcde0"
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;