import { Platform } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'
import DocumentPicker from 'react-native-document-picker';

export const PickImage = async () => {
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        // console.log(
        //   res.uri,
        //   res.type, // mime type
        //   res.name,
        //   res.size
        // );
        return res
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
};