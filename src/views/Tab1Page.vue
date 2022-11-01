<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pasta De Fotos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/vue';
import { camera } from "ionicons/icons";
import {userPhotoGallery} from "@/composable/userPhotoGallery";
export default defineComponent({
  name: 'Tab1Page',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon
  },
  setup() {
    const { takePhoto } = userPhotoGallery();
    return {
      camera,
      takePhoto
    }

  },
});
</script>