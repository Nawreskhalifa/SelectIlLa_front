<template>
    <div>
      <h1>File</h1>

      <PDFViewer
        :source="url"
        style="height: 100vh; width: 100vw"
        @download="handleDownload"
      />

      <h1>Base64</h1>

      <PDFViewer
        :source="base64"
        style="height: 100vh; width: 100vw"
        @download="handleDownload"
      />
    </div>
  </template>

  <script>
  import PDFViewer from 'pdf-viewer-vue'

  // OR THE FOLLOWING IMPORT FOR VUE 2
  // import PDFViewer from 'pdf-viewer-vue/dist/vue2-pdf-viewer'

  export default {
    components: {
      PDFViewer,
    },

    data() {
      return {
        url: '<PDF_URL>',
        // base64: '<BASE64_ENCODED_PDF>',
      }
    },
  }
  </script>