import {Platform} from 'react-native';

import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {IIMagePickerProps} from './useImagePicker.types';

type TImagePicker = () => Promise<ImagePickerResponse>;

export default function useImagePicker({
  userLibraryOptions = {},
  userCameraOptions = {},
}: IIMagePickerProps) {
  const selectImage: TImagePicker = async () => {
    let response: ImagePickerResponse = {
      didCancel: true,
      errorCode: 'others',
      errorMessage: 'Permission denied',
    };

    let isGranted = false;
    if (Platform.OS === 'ios') {
      let permission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      isGranted = permission === RESULTS.GRANTED;
      if (!isGranted) {
        // request permission
        permission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        isGranted = permission === RESULTS.GRANTED;
      }
    }
    // if (Platform.OS === 'android') {
    //   let permission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    //   isGranted = permission === RESULTS.GRANTED;
    //   if (!isGranted) {
    //     // request permission
    //     permission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    //     isGranted = permission === RESULTS.GRANTED;
    //   }
    // }

    if (isGranted || Platform.OS === 'android') {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        includeBase64: false,
        presentationStyle: 'fullScreen',
        ...userLibraryOptions,
      };

      const callback = (res: ImagePickerResponse) => {
        response = res;
      };
      await launchImageLibrary(options, callback);
    }
    return response;
  };

  const captureImage: TImagePicker = async () => {
    let isGranted = false;
    let response: ImagePickerResponse = {
      didCancel: true,
      errorCode: 'others',
      errorMessage: 'Permission denied',
    };

    if (Platform.OS === 'ios') {
      let permission = await check(PERMISSIONS.IOS.CAMERA);
      isGranted = permission === RESULTS.GRANTED;

      // request permission
      if (!isGranted) {
        permission = await request(PERMISSIONS.IOS.CAMERA);
        isGranted = permission === RESULTS.GRANTED;
      }
    }
    if (Platform.OS === 'android') {
      let permission = await check(PERMISSIONS.ANDROID.CAMERA);
      isGranted = permission === RESULTS.GRANTED;
      // request permission
      if (!isGranted) {
        permission = await request(PERMISSIONS.ANDROID.CAMERA);
        isGranted = permission === RESULTS.GRANTED;
      }
    }

    if (isGranted) {
      const options: CameraOptions = {
        mediaType: 'photo',
        includeBase64: false,
        presentationStyle: 'fullScreen',
        ...userCameraOptions,
      };

      const callback = (res: ImagePickerResponse) => {
        response = res;
      };
      await launchCamera(options, callback);
    }

    return response;
  };

  return {selectImage, captureImage};
}
