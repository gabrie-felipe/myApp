import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Preferences } from "@capacitor/preferences";
import { Filesystem, Directory } from "@capacitor/filesystem";

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

export function userPhotoGallery() {
    const photos = ref<UserPhoto[]>([]);

    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = {
            filepath: fileName,
            webviewPath: photo.webPath,
        };
        photos.value = [savedFileImage, ...photos.value];
    };
    return {
        photos,
        takePhoto,
    };
}



