import React, { useState } from "react";
import { Divider, HStack, Image, Pressable, VStack } from "native-base";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IGalleryImageCard } from "./GalleryImageCard.types";
import SelectInputImageTypeSheet from "@action-sheets/SelectInputImageTypeSheet/SelectInputImageTypeSheet";
import { IEditUserGallery } from "../../screens/account-screens/EditUserGallery/EditUserGallery.types";
import colors from "@colors";
import { useDeleteGalleryImageMutation } from "@store/api/userApi/userApiSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";

export default function GalleryImageCard({
  iconSize,
  boxHeight,
  boxWidth,
  image,
  index,
  images,
  fieldName,
  setImages,
  edit = false,
  ...rest
}: IGalleryImageCard) {
  const [loading, setLoading] = useState(false);
  const [deleteSingleImage, result] = useDeleteGalleryImageMutation();
  const deleteImage = async (id: string | undefined) => {
    try {
      setLoading(true);
      await deleteSingleImage(id);
      const newImages = images.filter((img) => img.id !== id);
      setImages(newImages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Pressable
        {...rest}
        position="relative"
        alignItems={"center"}
        justifyContent={"center"}
        borderWidth={!image ? "1px" : "0px"}
        borderColor={"#C7C7C7"}
        borderStyle={"dashed"}
        h={boxHeight}
        w={boxWidth}
        borderRadius={"5px"}
        overflow={"hidden"}
      >
        {image ? (
          <>
            <Image
              source={{ uri: image.uri }}
              alt={fieldName}
              overflow={"hidden"}
              h="full"
              w="full"
              resizeMode="cover"
            />
            {edit ? (
              <HStack
                w="full"
                position="absolute"
                bottom={0}
                alignItems={"center"}
                backgroundColor={"rgba(10, 10, 10, 0.5)"}
              >
                <Pressable
                  p="5px"
                  w="1/2"
                  justifyContent="center"
                  flexDirection="row"
                  onPress={() => deleteImage(image.id)}
                >
                  <AntDesign name="delete" size={16} color={colors.red[100]} />
                </Pressable>
                <Divider orientation="vertical" bg="gray.200" height="70%" />
                <Pressable
                  p="5px"
                  w="1/2"
                  justifyContent="center"
                  flexDirection="row"
                  {...rest}
                >
                  <AntDesign name="edit" size={16} color="white" />
                </Pressable>
              </HStack>
            ) : null}
          </>
        ) : (
          <AntDesign name="plus" size={iconSize} color="#C7C7C7" />
        )}
      </Pressable>
      <SelectInputImageTypeSheet
        sId={fieldName}
        setAsset={(res) => {
          let galleryImage: IEditUserGallery = {
            name: res?.assets?.[0]?.fileName,
            type: res?.assets?.[0]?.type,
            uri: res?.assets?.[0]?.uri,
            fieldName: fieldName,
          };

          let newImages = [...images];
          newImages[index] = galleryImage;
          setImages(newImages);
        }}
      />
      <CustomLoadingModal modalVisible={loading} />
    </>
  );
}
