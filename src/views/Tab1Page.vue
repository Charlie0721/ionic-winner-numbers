<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Numero ganador Astro-Luna</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Numero 1</ion-label>
            <ion-input
              type="number"
              :value="numbers.numberOne"
              @input="numbers.numberOne = $event.target.value"
              pattern="^\d$"
              min="0"
              max="9"
              step="1"
            >
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Numero 2</ion-label>
            <ion-input
              type="number"
              :maxlength="1"
              :value="numbers.numberTwo"
              @input="numbers.numberTwo = $event.target.value"
              pattern="^\d$"
              min="0"
              max="9"
              step="1"
            >
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Numero 3</ion-label>
            <ion-input
              type="number"
              :maxlength="1"
              :value="numbers.numberThree"
              @input="numbers.numberThree = $event.target.value"
              pattern="^\d$"
              min="0"
              max="9"
              step="1"
            >
            </ion-input>
          </ion-item>
          <ion-button color="dark" expand="full" @click="saveData"
            ><ion-icon :icon="i.createSharp"></ion-icon>Guardar</ion-button
          >
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title
            >Numero Ganador Astro Luna:
            {{ numberResponse.lotteryWinningNumber }}</ion-card-title
          >
          <ion-card-subtitle
            ><h3>
              Combinación Uno : {{ numberResponse.finalNumber }}
              <h3>
                Combinación Dos: {{ numberResponse.combinationOne }} 
              </h3>
              <h3>
               Combinación Tres: {{ numberResponse.combinationTwo }}
              </h3>
            </h3></ion-card-subtitle
          >
        </ion-card-header>

        <ion-card-content>
          {{ numberResponse.finalNumber }}
          {{ numberResponse.combinationOne }}
          {{ numberResponse.combinationTwo }}

        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonCardContent,
  IonCard,
  IonIcon,
  alertController,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { Numbers } from "../Interface/numbers.interface";
import * as allIcons from "ionicons/icons";
import { Number } from "../services/numbers.service";

class NumberResponse {
  public lotteryWinningNumber: string;
  public finalNumber: string;
  public combinationOne: string;
  public combinationTwo: string;
  constructor(
    lotteryWinningNumber: string,
    finalNumber: string,
    combinationOne: string,
    combinationTwo: string
  ) {
    this.lotteryWinningNumber = lotteryWinningNumber;
    this.finalNumber = finalNumber;
    this.combinationOne = combinationOne;
    this.combinationTwo = combinationTwo;
  }
}

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonCardContent,
    IonCard,
    IonIcon,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
  },
  data() {
    return {
      numbers: {} as Numbers,
      i: allIcons,
      numberResponse: {} as NumberResponse,
    };
  },
  methods: {
    async saveData() {
      try {
        const response = await Number.sendData(this.numbers);
        this.numberResponse.lotteryWinningNumber =
          response.data.lotteryWinningNumber;
        this.numberResponse.combinationOne = response.data.combinationOne;
        this.numberResponse.combinationTwo = response.data.combinationTwo;
        this.numberResponse.finalNumber = response.data.finalNumber;
        if (response.data.status === 409) {
          const alert = await alertController.create({
            cssClass: "my-custom-class",
            header: " !!Atención !!! ",
            message: `¡Numero ya existente ! ¡${response.data.message} !`,
            buttons: ["ACEPTAR"],
          });
          await alert.present();
          return;
        }

        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "Confirmación !!! ",
          message: `numero digitado ganador de Atro Luna es: ${response.data.lotteryWinningNumber} `,
          buttons: ["ACEPTAR"],
        });
        await alert.present();
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
  },
});
</script>
