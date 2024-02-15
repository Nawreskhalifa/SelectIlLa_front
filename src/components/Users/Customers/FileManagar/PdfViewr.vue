<template>
  <div class="pdf">
    <PDFViewer
      :source="url"
      style="height: 100px; width: 100vw"
      @download="handleDownload"
    />
  </div>
</template>

<script>
import PDFViewer from "pdf-viewer-vue";
import { defineComponent } from "vue";
import { storageUrl } from "../../../../utils/constants";

export default defineComponent({
  name: "PdfViewr",
  components: {
    PDFViewer,
  },
  props: {
    urlLink: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      url: storageUrl + this.urlLink,
    };
  },
  methods: {
    handleDownload() {
      // Handle download event if needed
    },
  },
  mounted() {
    console.log(this.url, "url");
  },
});
</script>
<style scoped>
.pdf {
  position: fixed;
  width: 100%;
}
</style>
