<template>
    <div v-if="documents.data">
      <div v-if="!selectedFile">
        <div class="file-card" v-for="(file, index) in documents.data" :key="index"  >
          <div class="file-card-int" @click="selectFile(file)">
            <img class="file-icon" src="../../../assets/file.png" alt="File Icon">
          <div class="file-name">{{ file.attributes.name }}</div>
          </div>
<div class="download">
    <i class="fas fa-download" aria-hidden="true"></i>

</div>
        </div>
      </div>
      <div v-else>
        <button @click="goBack" class="back-button">Back</button>
        <div class="file-content">
          <!-- <h2>{{ selectedFile.name }}</h2>
          <p>{{ selectedFile.content }}</p> -->
<PdfViewr></PdfViewr>
        </div>
      </div>
    </div>
  </template>

  <script>
  import PdfViewr from './PdfViewr.vue';
  export default {
    components:{
        PdfViewr
    },
    props:{
        documents:{
            type:Array,
            required :true
        }
    },
    data() {
      return {
        files: [
          { name: "file1.txt", content: "Content of file 1" },
          { name: "file2.txt", content: "Content of file 2" },
          { name: "file3.txt", content: "Content of file 3" }
        ],
        selectedFile: null
      };
    },
    methods: {
      selectFile(file) {
        this.selectedFile = file;
      },
      goBack() {
        this.selectedFile = null;
      },
      getFileIcon(file) {
        const extension = file.name.split('.').pop().toLowerCase();
        // if (extension === 'txt') {
        //   return require('@/assets/txt-icon.png'); // Change the path to your file icons directory
        // } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
        //   return require('@/assets/image-icon.png'); // Change the path to your file icons directory
        // } else if (extension === 'pdf') {
        //   return require('@/assets/pdf-icon.png'); // Change the path to your file icons directory
        // } else {
        //   return require('@/assets/default-icon.png'); // Change the path to your default file icon
        // }
      }
    }
  };
  </script>

  <style scoped>
  .file-card-int{
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
    background-color: #2196F3;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .file-content {
    margin-top: 20px;
  }

  /* Add more styling as needed */
  </style>
