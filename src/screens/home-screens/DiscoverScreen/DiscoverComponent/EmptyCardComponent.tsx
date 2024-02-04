import { selectfilterData } from "@store/features/filterSlice/filterSlice";
import { selectLoading } from "@store/features/user/userSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import { Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EmptyCardComponent() {
  const loading = useSelector(selectLoading);
  return (
    <VStack flex={1} alignItems={"center"} justifyContent={"center"}>
      <Text color="primary.100" fontSize={"lg"} fontWeight={400}>
        Users are not available!
      </Text>
      <Text color="gray.600" fontSize="sm" fontWeight={400}>
        Pull down to refresh.
      </Text>
      <CustomLoadingModal modalVisible={loading} />
    </VStack>
  );
}
