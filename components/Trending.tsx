import icons from "@/constants/icons";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { FlatList, TouchableOpacity, ImageBackground, Image } from "react-native";
import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      //@ts-ignore
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            //@ts-ignore
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({viewableItems}: any) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      //@ts-ignore
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{itemVisiblePercentThreshold: 70}}
      contentOffset={{x: 170, y: 0}}
      horizontal
    />
  );
};

export default Trending;
