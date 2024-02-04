
import { HStack, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { ILikedProfileGalleryCard } from './LikedProfileGalleryCard.types';
import { useNavigation } from '@react-navigation/native';
import { accountRoutes, dashBoardRoutes } from '@routes/index';

export default function LikedProfileGalleryCard({
  galleryPicture,
}: ILikedProfileGalleryCard) {
  const length: number = galleryPicture.length;
  const navigation = useNavigation();

  const height: string = length === 1 ? '300px' : length === 2 || length === 4 ? '190px' : '190px';
  const width: string = length === 1 ? '100%' : length === 2 || length === 4 ? '48%' : '48%';

  if (length === 0) {
    return null;
  }
  return (
    <VStack mt={'30px'}>
      <Text fontWeight={700} fontSize={'16px'} mb={'5px'}>
        Gallery
      </Text>
      <HStack flexWrap={'wrap'} justifyContent={'space-between'}>
        {galleryPicture.map((picture, index) => {
          return (
            <Pressable
              key={index.toString() + 'gallery'}
              h={length < 5 ? length === 3 ? index < 1 ? '300px' : '190px' : height : index < 2 ? '190px' : '100px'}
              w={length < 5 ? length === 3 ? index < 1 ? '100%' : '48%' : width : index < 2 ? '48%' : '30%'}
              mb={'10px'}
              borderRadius={'5px'}
              overflow={'hidden'}
              onPress={() => navigation.navigate(dashBoardRoutes.galleryScreen.path as never, {
                galleryPicture: galleryPicture,
                id: index,
              } as never)}
            >
              <Image
                source={{ uri: picture.image }}
                alt={picture.fieldName}
                h="full"
                w="full"
                resizeMode={'cover'}
              />
            </Pressable>
          );
        })}
      </HStack>
    </VStack>
  );
}
