import { Pressable, Text } from "native-base";
import React from "react";
import { PressableProps } from '../../types/native-base.types';

export default function SkipButton({ ...rest }: PressableProps) {
    return (
        <Pressable {...rest} mr="20px" alignItems={'center'} justifyContent="center">
            <Text fontSize="sm" color="primary.100" fontWeight={500}>Skip</Text>
        </Pressable>
    );
}
