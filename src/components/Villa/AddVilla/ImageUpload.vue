<template>
  <div class="file-upload text-center position-relative">
    <img
      v-for="(url, index) in imageUrls"
      :src="url"
      :key="index"
      alt="Uploaded Image"
      class="preview-image"
    />
    <span class="d-block text-muted">
      Drop Files Here Or
      <span @click="uploadImage" class="text-black fw-medium position-relative">
        Click To Upload
      </span>
    </span>
    <input
      type="file"
      class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
      ref="fileInput"
      @change="handleFileChange"
      multiple
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImageUpload",
  data() {
    return {
      selectedFiles: [] as File[],
      imageUrls: [] as string[],
    };
  },
  
  methods: {
    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedFiles = Array.from(input.files || []);
      this.previewImages();
    },
    previewImages() {
      this.imageUrls = [];

      for (const file of this.selectedFiles) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageUrls.push(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    async uploadImage() {
      if (this.selectedFiles.length === 0) return;

      const formData = new FormData();
      this.selectedFiles.forEach((file, index) => {
        formData.append(`image_${index}`, file);
      });

      try {
        const response = await fetch("/upload-endpoint", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          this.imageUrls = responseData.imageUrls; // Assuming the API returns an array of image URLs
        } else {
          console.error("Image upload failed.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
  },
});
</script>

<style scoped>
.preview-image {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 10px;
}
</style>
