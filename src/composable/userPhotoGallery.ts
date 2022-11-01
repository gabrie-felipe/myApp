import {ref, onMounted, watch} from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Preferences } from "@capacitor/preferences";
import { Filesystem, Directory} from "@capacitor/filesystem";

export function userPhotoGallery() {
    const takePhoto = async () => {
const photo = await Camera.getPhoto ({
resultType: CameraResultType.Uri,
source: CameraSource.Camera,
quality: 100,
});
    }
    return {
        takePhoto,
    };
}