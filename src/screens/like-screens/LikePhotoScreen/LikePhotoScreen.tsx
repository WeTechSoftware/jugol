/* eslint-disable react-native/no-inline-styles */
import { VStack, HStack } from "native-base";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ImageGallery } from "@georstat/react-native-image-gallery";
import BackButton from "@ui/BackButton/BackButton";
import colors from "@colors";

export default function LikePhotoScreen() {
  const params = useRoute().params as any;
  const [isOpen, setIsOpen] = useState(true);
  const closeGallery = () => setIsOpen(false);
  const images = params?.galleryPicture?.map((item, index) => {
    return {
      id: index,
      url: item.image,
    };
  });

  return (
    <VStack bg={"white"} h={"full"} pt={"18px"}>
      <VStack alignItems={"center"}>
        <ImageGallery
          renderHeaderComponent={() => (
            <HStack p="10px">
              <BackButton />
            </HStack>
          )}
          initialIndex={params?.id}
          close={closeGallery}
          isOpen={isOpen}
          images={images}
          thumbColor={colors.primary[100]}
        />
      </VStack>
    </VStack>
  );
}
