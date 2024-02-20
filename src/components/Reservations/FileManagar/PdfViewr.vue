<template>
  <div class="pdf">
 <PDFViewer
      ref="pdfViewer"
      :source="url"
      style="height: 100%; width: 100%"
      @pdf-rendered="scrollToElement"
    />
  </div>
</template>
<script>
import PDFViewer from "pdf-viewer-vue";

export default {
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
       url: `http://localhost:1337${this.urlLink}`,
    };
  },
  methods: {
    handleDownload() {
      ///
     },
        scrollToElement() {
    const elementId = "my-target-element";

    const pdfViewer = this.$refs.pdfViewer;
    if (!pdfViewer) {
      console.error("PDF Viewer   not found.");
      return;
    }

     const targetElement = pdfViewer.$el.querySelector(`#${elementId}`);

    if (targetElement) {
       targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  },
  },
  mounted() {
    console.log(this.url, "url");
  },
};
</script>
<style scoped>

</style>
