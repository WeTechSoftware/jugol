import { HStack, Text, VStack } from "native-base";
import React from "react";
import { IAboutUser } from "./AboutUser.types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "@colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AboutUser({
  profession,
  location,
  about,
  userName,
  age,
  aboutMe = true,
}: IAboutUser) {
  return (
    <VStack>
      {userName && (
        <Text fontSize="2xl" fontWeight={700}>
          {userName}
          {age !== 0 ? ", " + age : null}
        </Text>
      )}
      {location.split(",")[0] && (
        <HStack alignItems={"center"}>
          <Ionicons name="location-outline" color={colors.primary[100]} />
          <Text ml={"5px"} color="dark.100">
            {location}
          </Text>
        </HStack>
      )}
      {profession && (
        <HStack alignItems={"center"}>
          <FontAwesome name="briefcase" color={colors.primary[100]} />
          <Text color="dark.200" ml="5px">
            {profession}
          </Text>
        </HStack>
      )}
      {about && (
        <>
          <Text fontSize="md" fontWeight={600} mt="30px" mb="10px">
            About {aboutMe ? "Me" : userName?.split(" ")[0]}
          </Text>
          <Text
            mb={"5px"}
            color="dark.100"
            numberOfLines={3}
            overflow={"hidden"}
          >
            {about}
          </Text>
        </>
      )}
    </VStack>
  );
}
