import { PermissionsAndroid } from 'react-native';

/**
 * @name requestCameraAndAudioPermission
 * @description Function to request permission for Audio and Camera
 */
export default async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
      PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}
