import { HStack } from "native-base";
import React from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import useImagePicker from "../../hooks/useImagePicker";
import { actionSheetStyle } from "../DateSelectorSheet/DateSelectorSheet";
import { ISelectInputImageTypeSheetProps } from "./SelectInputImageTypeSheet.types";

import SelectInputType from "./SelectInputType";
import { CameraIcon, GalleryIcon } from "@assets/svg/icons";
import colors from "@colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const IMAGE_INPUT_SHEET_ID = "selectImageSheet";

export default function SelectInputImageTypeSheet({
  sId = IMAGE_INPUT_SHEET_ID,
  setAsset,
  userCameraOptions = {},
  userLibraryOptions = {},
  createAccount = false,
}: ISelectInputImageTypeSheetProps) {
  const { selectImage, captureImage } = useImagePicker({
    userCameraOptions,
    userLibraryOptions,
  });

  const handleCaptureImage = async () => {
    const response = await captureImage();
    if (!response.didCancel) {
      setAsset?.(response);
      SheetManager.hide(sId);
    }
  };

  const handleSelectImage = async () => {
    const response = await selectImage();
    if (!response.didCancel) {
      setAsset?.(response);
      SheetManager.hide(sId);
    }
  };

  return (
    <ActionSheet containerStyle={actionSheetStyle.container} id={sId}>
      <HStack
        px={8}
        py={10}
        justifyContent={!createAccount ? "space-between" : "center"}
      >
        <SelectInputType
          title="Select from Camera"
          onSelectPress={handleCaptureImage}
          icon={
            <CameraIcon
              style={{
                height: 30,
                width: 30,
                tintColor: colors.primary[100],
              }}
            />
          }
        />
        {!createAccount ? (
          <SelectInputType
            title="Select from Gallery"
            onSelectPress={handleSelectImage}
            icon={
              <FontAwesome name="image" color={colors.primary[100]} size={28} />
            }
          />
        ) : null}
      </HStack>
    </ActionSheet>
  );
}
