<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { getImages } from './http-api'
import { getImageFromId } from './http-api'
import { submitImage } from './http-api'
</script>

<script lang="ts">
export default defineComponent({
  mounted() {
    this.updateImages();
  },
  data() {
    return {
      images: [{ name: "loading", id: "0" }],
      files: null as FileList | null
    }
  },
  methods: {
    async updateImages() {
      console.log("update images");
      this.images = await getImages();
    },
    submitFile() {
      let list_of_file = this.files;
      submitImage(list_of_file as any);
    },
    handleFileUpload(event: Event) {
      if (event == null || event.target == null) return;
      if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files) {
        this.files = (event.target as HTMLInputElement).files;
      }
    }
  }
})
console.log("hello world")

// global variables
const count = ref(0);
const imgId = ref();
let imageSelector = "imageSelector";

</script>
<template>

  <div class="card">
    <p>images : {{ images }}</p>
  </div>

  <div class="ImageSelect">
    <select v-model="imgId" @change="getImageFromId(imgId, imageSelector)">
      <option value=" Please select one" selected disabled>Please select one</option>
      <option v-for="image in images" :key="image.id" :value="image.id" :text="image.name"></option>
    </select>
  </div>

  <br>

  <div>
    <img :id="imageSelector" width="100" height="100">
  </div>

  <br>

  <div class="ImageGalery">
    <p>Image Galery : </p>
    <br>
    <!-- <div v-for="image in images" v-on="getImageFromId(image.id, 'img' + image.id)">
      <img :id="'img' + image.id" width="100" height="100">
    </div> -->
  </div>

  <br>

  <template>
    <div class="container">
      <div class="large-12 medium-12 small-12 cell">
        <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload($event)" />
        </label>
        <button v - on:click=" submitFile()">Submit</button>
      </div>
    </div>
  </template>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

