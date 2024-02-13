<template>
  <div v-if="documents">
    <div v-if="!selectedFile">
      <div v-for="(files, index) in documents" :key="index">
        <div>
          <div
            class="file-card"
            v-for="(file, index) in files.attributes.documents.data"
            :key="index"
            @click="selectFile(file)"
          >
            <div class="file-card-int">
              <img
                class="file-icon"
                src="../../../../assets/file.png"
                alt="File Icon"
              />
              <div class="file-name">{{ file.attributes.name }}</div>
            </div>
            <div class="download">
              <i class="fas fa-download" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <button @click="goBack" class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <div class="file-content">
        <PdfViewr
          v-if="isPdf(selectedFile)"
          :urlLink="selectedFile.attributes.url"
        ></PdfViewr>
        <img
          v-else-if="isImage(selectedFile)"
          :src="ImageWithurl(selectedFile.attributes.url)"
          alt="File Image"
          class="file-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PdfViewr from "./PdfViewr.vue";

export default {
  components: {
    PdfViewr,
  },
  props: {
    documents: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    ImageWithurl(url) {
      return `${process.env.VUE_APP_STORAGE_URL}${url}`;
    },
    selectFile(file) {
      if (this.isPdf(file)) {
        window.open(`/pdf/${file.id}`, "_blank");
      } else {
        this.selectedFile = file;
      }
    },
    isPdf(file) {
      if (!file || !file.attributes || !file.attributes.name) {
        return false;
      }
      const extension = file.attributes.name.split(".").pop().toLowerCase();
      return extension === "pdf";
    },
    isImage(file) {
      if (!file || !file.attributes || !file.attributes.name) {
        return false;
      }
      const extension = file.attributes.name.split(".").pop().toLowerCase();
      return (
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "gif"
      );
    },
    goBack() {
      this.selectedFile = null;
    },
  },
};
</script>

<style scoped>
.file-card-int {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  gap: 3px;
}

.file-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  gap: 3px;
}

.file-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.file-name {
  font-size: 16px;
}

.back-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button i {
  margin-right: 5px;
}

.file-content {
  margin-top: 20px;
}

.file-image {
  max-width: 100%;
  height: auto;
}
</style>
