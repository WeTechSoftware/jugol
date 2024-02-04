import {Image} from 'react-native';

export default function useImageUri(imagePath: any): string {
  const image = Image.resolveAssetSource(imagePath).uri;
  return image;
}
