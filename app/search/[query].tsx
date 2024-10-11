import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const query = useLocalSearchParams();
  const searchTerm = typeof query === "string" ? query : "";

   const {
     data: posts,
     refetch,
     loading,
   } = useAppwrite(() =>
     searchTerm ? searchPosts(searchTerm) : Promise.resolve([])
   );

  const [refreshing, setRefreshing] = useState(false);

   useEffect(() => {
     if (searchTerm) {
       refetch();
     }
   }, [searchTerm]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        //@ts-ignore
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query.query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query.query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
