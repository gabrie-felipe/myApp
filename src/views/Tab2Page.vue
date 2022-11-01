<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Area De Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      
<div class="texto">
  <h1>Pagina De Navegação</h1>
</div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';


export default defineComponent({
  name: 'Tab2Page',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>

<style>
h1{
  color: rgb(255, 0, 0);
}
div{
  text-align: center;
  font-family: sans-serif;
}
.texto{
background-color: rgba(194, 194, 194, 0.295);
margin: 70px;
}
</style>