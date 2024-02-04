import OutlinedTextWithIcon from "@ui/OutlinedTextWithIcon/OutlinedTextWithIcon";
import { HStack, Text, VStack } from "native-base";
import React from "react";

export default function UserInterests({
  interestList,
}: {
  interestList: string[];
}) {
  return (
    <VStack mt={"30px"}>
      <Text fontSize="md" fontWeight={600}>
        Interests
      </Text>
      <HStack flexWrap={"wrap"} w={"full"} mt={"12px"}>
        {interestList?.map((interest, index) => (
          <OutlinedTextWithIcon key={index} interestName={interest} />
        ))}
      </HStack>
    </VStack>
  );
}
