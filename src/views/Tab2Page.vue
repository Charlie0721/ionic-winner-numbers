<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Historial de Números</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar
        animated
        debounce="500"
        placeholder="Buscar Producto"
        @ionChange="searchNumber($event)"
        @keypress.enter="searchWinnerNumber()"
      >
      </ion-searchbar>
      <ion-button @click="prevPage()" v-if="page > 1">Anterior</ion-button>
      <ion-button @click="nextPage()">Siguiente</ion-button>
      <span> página {{ page }} </span> <br />
      <span> Ganador--------Comb1-------Comb2------Comb3 </span>
      <ion-list :inset="true" v-for="result in results" :key="result.id">
        <ion-item>
          <ion-label> {{ result.lotteryWinningNumber }} </ion-label>
          <ion-label> {{ result.finalNumber }}</ion-label>
          <ion-label> {{ result.combinationOne }}</ion-label>
          <ion-label> {{ result.combinationTwo }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  IonSearchbar,
  IonButton,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { Number } from "../services/numbers.service";
export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonSearchbar,
    IonButton,
  },
  data() {
    return {
      results: [] as any,
      limit: 10 as number,
      page: 1 as number,
      offset: 0 as number,
      search: "" as string,
      totalPages: 0 as number,
    };
  },
  mounted() {
    this.getNumbers();
  },
  methods: {
    async getNumbers() {
      try {
        const response = await Number.getData(
          this.limit,
          this.page,
          this.search
        );
        this.results = response.data.data;
     
      } catch (error) {
        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "Error !!! ",
          message: `error: ${error}`,
          buttons: ["ACEPTAR"],
        });
        await alert.present();
        return false;
      }
    },

   async searchWinnerNumber() {
      await this.getNumbers(this.search)
    },
    async searchNumber(event: any) {
      try {
        this.search = event.detail.value;
        if (this.search === "") {
          return await this.getNumbers();
        }
      } catch (error) {
        console.log(error);
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.getNumbers();
      }
    },
    nextPage() {
      this.page++;
      this.getNumbers();
    },
  },
});
</script>