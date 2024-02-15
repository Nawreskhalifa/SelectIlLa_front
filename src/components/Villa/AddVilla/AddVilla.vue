<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-product-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Name</label>
              <input
                v-model="name"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g.    Smart House"
              />
              <div v-if="nameError" class="text-danger">{{ nameError }}</div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"> City </label>
              <input
                v-model="city"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Ny"
              />
              <div v-if="cityError" class="text-danger">{{ cityError }}</div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Rooms
              </label>
              <input
                v-model="rooms"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 2"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Baths
              </label>
              <input
                v-model="baths"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 2"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"> Pool </label>
              <input
                v-model="pool"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 1"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"> View </label>
              <input
                v-model="view"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="view description   .... "
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                sleeps
              </label>
              <input
                v-model="sleeps"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 50"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Deposit
              </label>
              <input
                v-model="deposit"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g deposit"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Minioeuvre daily
              </label>
              <input
                v-model="minioeuvre_daily"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. minioeuvre_daily"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Description
              </label>
              <div class="mb-0">
                   <QuillEditor
                  theme="snow"
                  placeholder="Write your meta description"
v-model:content="description"

                   toolbar="full"
                />
              </div>
              <div v-if="descriptionError" class="text-danger">
                {{ descriptionError }}
              </div>
            </div>
          </div>

          <div class="col-md-8">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Category Villa
              </label>
              <!-- <ul
              style="
                display: flex;
                flex-direction: row;
                gap: 10px;
                justify-content: flex-start;
                align-items: center;
              "
            >
              <li
                class="single_cat"
                v-for="cat in AllSelected"
                :key="cat"
              >
                <span> {{ cat}}</span>
                <i
                  class="fas fa-times-circle"
                  @click="deleteFromCategories(cat)"
                ></i>
              </li>
            </ul> -->
              <select
                v-model="selectedCategory"
                class="form-select shadow-none fw-semibold rounded-0"
                @change="addToAllCat"
              >
                <option disabled>Select a Category</option>
                <option
  v-for="category in categories"
  :key="category.id"
  :value="category"
>
  {{ category.attributes.Name }}
</option>

              </select>
              <div
                class="members-list"
                v-if="AllSelected && AllSelected.length > 0"
              >
                <div
                  v-for="(perv, i) in AllSelected"
                  class="d-inline-block bg-gray rounded-1 fs-12 fw-medium text-primary p-5"
                  :key="i"
                >
                  {{ perv?.attributes.Name }}
                  <button
                    type="button"
                    class="bg-transparent p-0 border-0 lh-1 transition"
                    @click="deleteFromCategories(perv)"
                  >
                    <i class="flaticon-close"></i>
                  </button>
                </div>
              </div>
              <div v-if="categoryError" class="text-danger">
                {{ categoryError }}
              </div>
               <div    style="display: flex; flex-direction: row;"><span>+</span>
 <p class="fs-md-15 fs-lg-16"><a   style="cursor: pointer;" class="link-secondary" @click="OpenVilla">add new category  </a></p>
              </div>
            </div>
          </div>



          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"
                >New Daily</label
              >
              <input
                v-model="newDaily"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 50"
              />
            </div>
          </div>
<div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Daily</label>
              <div class="input-group">
                <span
                  class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                >
                  $
                </span>
                <input
                  v-model="daily"
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. 120.00"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Villa Image
              </label>
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
                  <span
                    @click="uploadImage"
                    class="text-black fw-medium position-relative"
                  >
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
            </div>
          </div>

          <div class="col-md-12 text-danger"></div>

          <!-- <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Owner</label>
              <input
                v-model="owner"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Leonardo DiCaprio"
              />
              <div v-if="ownerError" class="text-danger">{{ ownerError }}</div>
            </div>
          </div> -->

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Partner
              </label>
              <select
                v-model="selectedPartner"
                class="form-select shadow-none fw-semibold rounded-0"
              >
                <option disabled selected>Select a partner</option>
                <option
                  v-for="partner in allPartners"
                  :key="partner.id"
                  :value="partner.id"
                >
                  {{ partner.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Create Villa
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
   <!-- <div class="members-list">
                <div
                  class="d-inline-block bg-gray rounded-1 fs-12 fw-medium text-primary p-5"
                >
                  Designer
                  <button
                    type="button"
                    class="bg-transparent p-0 border-0 lh-1 transition"
                  >
                    <i class="flaticon-close"></i>
                  </button>
                </div>
                <div
                  class="d-inline-block bg-gray rounded-1 fs-12 fw-medium text-primary p-5"
                >
                  Brand Designer
                  <button
                    type="button"
                    class="bg-transparent p-0 border-0 lh-1 transition"
                  >
                    <i class="flaticon-close"></i>
                  </button>
                </div>
                <div
                  class="d-inline-block bg-gray rounded-1 fs-12 fw-medium text-primary p-5"
                >
                  Motion Designer
                  <button
                    type="button"
                    class="bg-transparent p-0 border-0 lh-1 transition"
                  >
                    <i class="flaticon-close"></i>
                  </button>
                </div>
              </div> -->
                 <loading
        v-model:active="isLoading"
        :can-cancel="true"
         :is-full-page="true"
      />
              <AddVillaCategoryModal @addedCat="addedCategory" :show="showModal" @close="closeModal" />
 </template>
<script lang="ts">
import { Ref, defineComponent, ref } from "vue";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import {
  postVilla,
  fetchVillaCategories,
  fetchPartners,
} from "@/services/apiService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
 import AddVillaCategoryModal from "../AddVillaCategoryModal/AddVillaCategoryModal.vue"
export default defineComponent({
  name: "AddVilla",
   components: {
    AddVillaCategoryModal,
    Loading
   },
  setup() {
    const router = useRouter();
   const AllSelected = ref<Array<any>>([]);
const selectedCategory: Ref<any | null> = ref(null);
     const selectedFiles = ref([]);
         const  isLoading=  ref(false);
    const categories = ref();
    const  started = ref(true )
    const allPartners = ref();
    const name = ref("");
    const city = ref("");
    const rooms = ref("");
    const baths = ref("");
    const pool = ref("");
    const view = ref("");
    const sleeps = ref("");
    const daily = ref("");
    const newDaily = ref("");
    const deposit = ref("");
    const description = ref();
    const minioeuvre_daily = ref("");
    const showModal = ref(false)
    // const owner = ref("");
    const selectedPartner = ref("");
    const modules = {
      module: BlotFormatter,
      ImageUploader,
      options: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            resolve("fake-image-url");
          });
        },
      },
    };
    const closeModal = async ()=>{
       showModal.value =false

    }
    const OpenVilla = async () => {
      console.log("okay")
       showModal.value =true
       console.log(showModal.value)
    }
    const addedCategory = async(event) =>{
categories.value.push(event)
    }
    const nameError = ref("");
    const cityError = ref("");
    const descriptionError = ref("");
    const categoryError = ref("");
     const seatsError = ref("");
    const dailyError = ref("");
    const roomsError = ref("");
    const newDailyError = ref("");
    const showToatSuccess = () => {
      toast.success("Villa Created  🚗 👍 ", {
        autoClose: 1000,
      });
    };
    const  addToAllCat = () => {
    AllSelected.value.push(selectedCategory.value)
    console.log(AllSelected.value,"are selected")
}
    const fetchPartnersList = async () => {
      const data = await fetchPartners();
      allPartners.value = data;
      console.log(data, allPartners, "data");
    };
    const fetchCategories = async () => {
      const data = await fetchVillaCategories();
      categories.value = data.data;
    };
    const selectedFilesRef = ref([] as File[]);
    const imageUrls = ref([] as string[]);

    const handleFileChange = (event) => {
      const input = event.target;
      selectedFilesRef.value = Array.from(input.files || []);
      previewImages();
    };

    const previewImages = () => {
      imageUrls.value = [];

      for (const file of selectedFilesRef.value) {
        const reader = new FileReader();
        reader.onload = (event) => {
          imageUrls.value.push(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    const uploadImage = async () => {
      const formData = new FormData();
      selectedFilesRef.value.forEach((file, index) => {
        formData.append(`image_${index}`, file);
      });

      try {
        const response = await fetch("/upload-endpoint", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          imageUrls.value = responseData.imageUrls;
        } else {
          console.error("Image upload failed.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
    const deleteFromCategories = (cat) => {
  AllSelected.value = AllSelected.value.filter((item) => item !== cat);
};

    const submitForm = async () => {
        isLoading.value = true;
      nameError.value = "";
      cityError.value = "";
      descriptionError.value = "";
      categoryError.value = "";
       seatsError.value = "";
      dailyError.value = "";
      roomsError.value = "";
      newDailyError.value = "";
      if (!name.value.trim()) {
        nameError.value = "name is required.";
      }

      if (!city.value.trim()) {
        cityError.value = "city is required.";
      }



      if (!selectedCategory.value) {
        categoryError.value = "Please select a category.";
      }

      // if (!owner.value.trim()) {
      //   ownerError.value = "Owner is required.";
      // }

      if (!daily.value.trim()) {
        dailyError.value = "Daily amount is required.";
      }

      if (
        nameError.value ||
        roomsError.value ||
        descriptionError.value ||
        categoryError.value ||
         seatsError.value ||
        dailyError.value ||
        cityError.value ||
        newDailyError.value
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const selectedC= AllSelected.value.filter(item =>{
    return parseInt(item.id)
  })
  console.log(selectedC,"categories check ")
      const vehicleData = {
        data: {
          name: name.value,
          city: city.value,
          rooms: parseInt(rooms.value),
          baths: parseInt(baths.value),
          pool: parseInt(pool.value),
          view: view.value,
          sleeps: parseInt(sleeps.value),
          daily: parseFloat(daily.value),
          new_daily: parseFloat(newDaily.value),
          deposit: parseFloat(deposit.value),
           description: description.value.ops[0].insert,
          minioeuvre_daily: minioeuvre_daily.value.toString(),
          partner: [parseInt(selectedPartner.value)],
          category_villas: selectedC,
        },
      };

      const result = await postVilla(selectedFilesRef, vehicleData);

      if (result.success) {
        showToatSuccess();
                isLoading.value = false;

        router.push("/villalist");
      }else{
    console.error("Error:", result.error);

      }
    };

    fetchCategories();
    fetchPartnersList();
    // fetchPartnersList();

    return {
      modules,
      started,
      categories,
      addToAllCat,
      allPartners,
      description,
      selectedCategory,
      selectedFiles,
       addedCategory,
      daily,
      deposit,
      showToatSuccess,
      newDaily,
      descriptionError,
      categoryError,
       seatsError,
      dailyError,
      OpenVilla,
  showModal,
      newDailyError,
      submitForm,
      selectedFilesRef,
      isLoading ,
      imageUrls,
      handleFileChange,
      uploadImage,
      city,
      cityError,
      name,
      pool,
      view,
      baths,
      sleeps,
      AllSelected,
      minioeuvre_daily,
      deleteFromCategories,
      selectedPartner,
      rooms,
      nameError,
      closeModal
    };
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
