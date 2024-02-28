<template>
    <div class="pdf">
       <PDFViewer
        :source="url"
        style="height: 100vw; width: 100%"
        @download="handleDownload"
      />
    </div>
  </template>

  <script>
  import PDFViewer from 'pdf-viewer-vue';
  import {getFile} from "@/services/apiService"
  export default {
    components: {
      PDFViewer,
    },
    data() {
      return {
        url: "",
      };
    },
    methods: {
      handleDownload() {
        // Handle download event if needed
      },
      async getPdfFile() {
  try {
    const id = this.$route.params.id;
    const response = await getFile(id);
    if (response.data ) {
        console.log('hey',response.data)

      console.log(response.data.data, "files from page ");
      this.url = `${process.env.VUE_APP_STORAGE_URL}${response.data.url}`;
    }
  } catch (error) {
    console.error("Error fetching PDF file:", error);
  }
}

    },
    async mounted(){
    await this.getPdfFile()
    console.log("hey",this.url,process.env.VUE_APP_STORAGE_URL)
    }
  };
  </script>
  <style scoped>

</style>
