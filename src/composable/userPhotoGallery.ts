import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Preferences } from "@capacitor/preferences";
import { Directory, Filesystem, } from "@capacitor/filesystem";

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

export function userPhotoGallery() {
    const PHOTO_STORAGE = 'photos';
    const photos = ref<UserPhoto[]>([]);

    const cachePhotos = () => {
        Preferences.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(photos.value),
        });
    };

    const convertBlobToBase64 = (blob: Blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });

    const savePicture = async (photo: Photo, fileName: string):
        Promise<UserPhoto> => {
        //let base64Data: string;
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        const base64Data = (await convertBlobToBase64(blob)) as string;
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });
        return {
            filepath: fileName,
            webviewPath: photo.webPath,
        };
    };

    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(photo, fileName);



        photos.value = [savedFileImage, ...photos.value];
    };

    const loadSaved = async () => {
        const photoList = await Preferences.get({ key: PHOTO_STORAGE });
        const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

        for (const photo of photosInPreferences) {
            const file = await Filesystem.readFile({
                path: photo.filepath,
                directory: Directory.Data,
            });
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }

        photos.value = photosInPreferences;
    };

    watch(photos, cachePhotos);
    onMounted(loadSaved);
    return {
        photos,
        takePhoto,
    };
}



