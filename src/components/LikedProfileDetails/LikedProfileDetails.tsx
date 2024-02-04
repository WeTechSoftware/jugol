import { HStack, Text, VStack, Pressable } from "native-base";
import React, { useState } from "react";
import { ILikedProfileDetails } from "./LikedProfileDetails.types";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function LikedProfileDetails({
  profileName,
  age,
  profession,
  location,
  distance,
  about,
}: ILikedProfileDetails) {
  const [readMoreSelected, setReadMoreSelected] = useState<boolean>(false);

  return (
    <VStack>
      {/* Liked profile bio details */}

      <HStack justifyContent={"space-between"} w={"full"}>
        <VStack justifyContent={"space-between"}>
          <Text fontWeight={700} fontSize={"24px"} mb={"5px"}>
            {profileName}, {age}
          </Text>
          <Text color="dark.200">{profession}</Text>
        </VStack>
        <Pressable
          alignItems={"center"}
          justifyContent={"center"}
          h={"52px"}
          w={"52px"}
          borderRadius={"15px"}
          borderWidth={"1px"}
          borderColor="gray.100"
        >
          <Feather name="send" color="#AF0DBD" size={25} />
        </Pressable>
      </HStack>

      {/* Liked profile location */}

      <HStack justifyContent={"space-between"} w={"full"} mt={"30px"}>
        <VStack justifyContent={"space-between"}>
          <Text fontWeight={700} fontSize={"16px"} mb={"5px"}>
            Location
          </Text>
          <Text color="dark.200">{location}</Text>
        </VStack>
        <Pressable
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection="row"
          h={"30px"}
          px={"7px"}
          borderRadius={"7px"}
          bg={"#fbedfc"}
        >
          <EvilIcons name="location" color="#AF0DBD" size={16} />
          <Text fontSize={"12px"} color="primary.100">
            {distance}
          </Text>
        </Pressable>
      </HStack>

      {/* Liked profile about */}

      <VStack mt={"30px"}>
        <Text fontWeight={700} fontSize={"16px"} mb={"5px"}>
          About
        </Text>
        <Text
          mb={"5px"}
          color="dark.100"
          numberOfLines={!readMoreSelected ? 3 : undefined}
          overflow={"hidden"}
        >
          {about}
        </Text>
        {about.length > 135 ? (
          <Pressable onPress={() => setReadMoreSelected(!readMoreSelected)}>
            <Text color="primary.100" fontWeight={700}>
              {readMoreSelected ? "Minimize" : "Read More"}
            </Text>
          </Pressable>
        ) : null}
      </VStack>
    </VStack>
  );
}
