import AuthHeader from '@ui/AuthHeader/AuthHeader';
import React, {useState} from 'react';
import {
  Center,
  Divider,
  FlatList,
  HStack,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import BlockedUserCard from '@ui/BlockedUserCard/BlockedUserCard';
import {
  useDeleteBlockMutation,
  useGetAllBlockQuery,
} from '@store/api/blockApi/blockApiSlice';
import {IBlockedUserCard} from '@ui/BlockedUserCard/BlockedUserCard.types';

function EmptyCardComponent() {
  return (
    <VStack flex={1} alignItems={'center'} justifyContent={'center'}>
      <Text color="danger.400" fontSize={'20px'} fontWeight={400}>
        The blocked user list is empty!
      </Text>
    </VStack>
  );
}

export default function BlockedUsers() {
  const {
    data: allBlockedUsers,
    error: allBlockedUserError,
    isError: allBlockedUserIsError,
    isLoading: allBlockedUserIsLoading,
    isSuccess: allBlockedUserIsSuccess,
  } = useGetAllBlockQuery(undefined);

  console.log({allBlockedUsers, allBlockedUserIsLoading, allBlockedUserError});

  if (allBlockedUserIsLoading) {
    return (
      <VStack>
        <Center w="100%" h="full">
          <VStack
            w="90%"
            maxW="400"
            space={6}
            rounded="md"
            alignItems="center"
            _dark={{
              borderColor: 'coolGray.500',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}>
            <Skeleton h="40" />
            <Skeleton
              borderWidth={1}
              borderColor="coolGray.200"
              endColor="warmGray.50"
              size="40"
              rounded="full"
              mt="-70"
            />
            <HStack space="2">
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" />
            </HStack>
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton mb="3" w="40" rounded="20" />
            <Skeleton h="20" />
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton mb="3" w="40" rounded="20" />
          </VStack>
        </Center>
      </VStack>
    );
  }

  return (
    <VStack p={'40px'} bg={'white'} flex={1}>
      <AuthHeader title="Blocked Users" />
      {/* <Text mt={'30px'}>Users</Text> */}
      {!allBlockedUsers || allBlockedUserError?.status === 404 ? (
        <EmptyCardComponent />
      ) : (
        <FlatList
          data={allBlockedUsers}
          keyExtractor={(item: IBlockedUserCard) => item._id}
          renderItem={({item}) => <BlockedUserCard {...item} />}
        />
      )}
    </VStack>
  );
}
