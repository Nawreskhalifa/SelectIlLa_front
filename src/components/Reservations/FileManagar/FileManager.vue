<template>
  <div style="width: 100%; height: 100%;">
    <ModalFiles :visible="modalVisible" :selectedFile="selectedFile" @close="closeModal" />
    <div class="file-management">
      <div  >
        <div class="file-grid">
          <div class="file-card" v-for="(file, index) in documents?.data" :key="index" @click="selectFile(file)">
            <div class="file-card-int">
              <img class="file-icon" :src="getIcon(file.attributes.name)" alt="File Icon">
              <div class="file-name">{{ truncatedFileName(file.attributes.name) }}</div>
            </div>
            <div class="download" @click="downloadFile(file.attributes.url)">
              <i class="fas fa-download" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-else>
        <button @click="goBack" class="back-button">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <div class="file-content">
          <PdfViewer v-if="isPdf(selectedFile)" :urlLink="selectedFile.attributes.url"></PdfViewer>
          <img v-else-if="isImage(selectedFile)" :src="ImageWithUrl(selectedFile.attributes.url)" alt="File Image" class="file-image">
        </div>
      </div> -->
    </div>
    <!-- <button @click="openModal">Open Modal</button> -->
  </div>
</template>

<script>
// import PdfViewer from './PdfViewr.vue';
import ModalFiles from './FileModal.vue';
import {downloadItem } from "@/services/apiService"
export default {
  components: {
    // PdfViewer,
    ModalFiles,
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
      modalVisible: false,
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    selectFile(file) {
      if (this.isPdf(file) || this.isImage(file)) {
        this.selectedFile = file;
        this.openModal();
      } else {
        window.open(`/pdf/${file.id}`, '_blank');
      }
    },
    isPdf(file) {
      if (!file || !file.attributes || !file.attributes.name) {
        return false;
      }
      const extension = file.attributes.name.split('.').pop().toLowerCase();
      return extension === 'pdf';
    },
    isImage(file) {
      if (!file || !file.attributes || !file.attributes.name) {
        return false;
      }
      const extension = file.attributes.name.split('.').pop().toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
    },
    getIcon(fileName) {
      const extension = fileName.split('.').pop().toLowerCase();
      if (this.isPdf({ attributes: { name: fileName } })) {
        return require('@/assets/pdf.png');
      } else if (this.isImage({ attributes: { name: fileName } })) {
        return require('@/assets/picture.png');
      } else {
        return require('@/assets/file.png');
      }
    },
  async downloadFile(url) {
  try {
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    await downloadItem({ url, label: fileName });
  } catch (error) {
    console.error(error);
  }
},

    goBack() {
      this.selectedFile = null;
    },
    truncatedFileName(fileName) {
      const maxLength = 15;
      if (fileName.length > maxLength) {
        return fileName.substring(0, maxLength) + '...';
      } else {
        return fileName;
      }
    },
    ImageWithUrl(url) {
      return `${process.env.VUE_APP_STORAGE_URL}${url}`;
    },
  },
};
</script>

<style scoped>
.file-management {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.file-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  gap: 5px;
}

.file-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.file-card:hover {
  background-color: #f0f0f0;
}

.file-card-int {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:2px ;

}

.file-icon {
  width: 40px;
  height: 40px;
}

.file-name {
  font-size: 14px;
  text-align: center;
}

.download {
  margin-top: 5px;
  color: #2196F3;
  cursor: pointer;
}

.download:hover {
  color: #0d47a1;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2196F3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0d47a1;
}

.file-content {
  margin-top: 20px;
}

 @media screen and (max-width: 768px) {
  .file-card {
    max-width: 150px;
  }
}
</style>