<template>
  <Modal v-if="visible" @close="close">
    <template v-slot:header>{{selectedFile.attributes.name}}</template>
    <template v-slot:body>
      <div v-if="isPdf(selectedFile)">
        <PdfViewer :urlLink="selectedFile.attributes.url" class="pdf-viewer"></PdfViewer>
      </div>
      <div v-else-if="isImage(selectedFile)">
        <img :src="ImageWithUrl(selectedFile.attributes.url)" alt="File Image" class="file-image modal-content">
      </div>
      <div v-else>
        <p>No preview available for this file type.</p>
      </div>
    </template>
    <template v-slot:footer>Modal Footer</template>
  </Modal>
</template>

<script>
import Modal from '../../Common/ReusableModal.vue';
import PdfViewer from './PdfViewr.vue';

export default {
  components: {
    Modal,
    PdfViewer,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    selectedFile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
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
    ImageWithUrl(url) {
      return `${process.env.VUE_APP_STORAGE_URL}${url}`;
    },
  },
};
</script>

<style scoped>
 .modal-content {
  width: 100%;
  height: 100%;
}
.pdf-viewer {
  height: 60vh;
}
</style>
