import React from "react";
import { HStack, Input } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ISearchInput } from "./SearchInput.types";

export default function SearchInput({
  searchText,
  handleSearchText,
  ...rest
}: ISearchInput) {
  return (
    <Input
      leftElement={
        <HStack pl={"20px"}>
          <FontAwesome name="search" size={15} />
        </HStack>
      }
      placeholder="Search"
      color="dark.100"
      alignSelf={"center"}
      borderWidth={"1px"}
      borderColor="gray.100"
      h={"54px"}
      pl={"12px"}
      value={searchText}
      onChangeText={(text) => handleSearchText(text)}
      {...rest}
    />
  );
}
