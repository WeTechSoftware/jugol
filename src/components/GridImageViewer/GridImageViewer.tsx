
import { Box, Center, HStack, Image, Modal, Pressable, Stack, Text, VStack } from 'native-base';
import React, { ReactElement } from 'react';
import { useNavigation } from '@react-navigation/native';
import { dashBoardRoutes } from '@routes/index';
import { IGridImageViewer } from './GridImageViewer.types';
import { scale } from 'react-native-size-matters';

export default function GridImageViewer({ images }: IGridImageViewer) {
    const navigation = useNavigation();

    if (images?.length === 0) {
        return null;
    }

    return (
        <HStack
            height={"180"}
            w={scale(220) + "px"}
            justifyContent="space-between"
            alignItems={"center"}
        >
            <VStack w={images.length > 1 ? "48%" : "100%"}>
                <Pressable h="100%" w="100%" onPress={() => navigation.navigate(dashBoardRoutes.galleryScreen.path as never, {
                    galleryPicture: images.map(image => ({
                        image: image
                    })),
                    id: 0,
                } as never)}>
                    <Image
                        alt="img1"
                        borderRadius={8}
                        source={{
                            uri: images[0],
                        }}
                        w="100%"
                        h="100%"
                        resizeMode="cover"
                    />
                </Pressable>
            </VStack>

            <VStack w="48%" h="100%" justifyContent={"space-between"}>
                <Stack
                    direction={
                        images.length === 2 || images.length === 3
                            ? "column"
                            : "row"
                    }
                    w="100%"
                    h={images?.length > 2 ? "48%" : "100%"}
                    space={2}
                >
                    {images[1] && (
                        <Pressable width={
                            images.length === 2 ||
                                images.length === 3
                                ? "100%"
                                : "48%"
                        } onPress={() => navigation.navigate(dashBoardRoutes.galleryScreen.path as never, {
                            galleryPicture: images.map(image => ({
                                image: image
                            })),
                            id: 1,
                        } as never)}>
                            <Image
                                alt="img1"
                                borderRadius={8}
                                width={'100%'}
                                h="100%"
                                source={{ uri: images[1] }}
                            />
                        </Pressable>
                    )}
                    {images[2] && (
                        <Pressable width={
                            images.length === 2 ||
                                images.length === 3
                                ? "100%"
                                : "48%"
                        } onPress={() => navigation.navigate(dashBoardRoutes.galleryScreen.path as never, {
                            galleryPicture: images.map(image => ({
                                image: image
                            })),
                            id: 2,
                        } as never)}>
                            <Image
                                alt="img1"
                                borderRadius={8}
                                w="100%"
                                h="100%"
                                source={{ uri: images[2] }}
                            />
                        </Pressable>
                    )}
                </Stack>

                <HStack w="100%" h="48%" space={2}>
                    {images[3] && (
                        <Pressable width={
                            images.length === 3 ||
                                images.length === 4
                                ? "100%"
                                : "48%"
                        } onPress={() => navigation.navigate(dashBoardRoutes.galleryScreen.path as never, {
                            galleryPicture: images.map(image => ({
                                image: image
                            })),
                            id: 3,
                        } as never)}>
                            <Image
                                alt="img1"
                                borderRadius={8}
                                source={{ uri: images[3] }}
                                w="100%"
                                h="100%"
                            />
                        </Pressable>
                    )}
                    {images.length > 3 && (
                        <Pressable width={"48%"} h="100%" onPress={() => navigation.navigate(dashBoardRoutes.galleryScreen.path as never, {
                            galleryPicture: images.map(image => ({
                                image: image
                            })),
                            id: 0,
                        } as never)}>
                            <Box
                                position="relative"
                                bg={
                                    images.length > 5
                                        ? "#000"
                                        : "transparent"
                                }
                                overflow={"hidden"}
                                borderRadius={8}
                                width="100%"
                                h="100%"
                            >
                                <Image
                                    opacity={
                                        images.length > 5 ? 30 : 100
                                    }
                                    alt="img1"
                                    borderRadius={8}
                                    width="100%"
                                    h="100%"
                                    source={{ uri: images[4] }}
                                />
                                {images.length >= 4 && (
                                    <Center opacity={100}>
                                        <Text
                                            fontSize={"2xl"}
                                            color="white"
                                            fontWeight="700"
                                            position="absolute"
                                            top={-60}
                                        >
                                            +{images.length - 4}
                                        </Text>
                                    </Center>
                                )}
                            </Box>
                        </Pressable>
                    )}
                </HStack>
            </VStack>
        </HStack>

    );
}
