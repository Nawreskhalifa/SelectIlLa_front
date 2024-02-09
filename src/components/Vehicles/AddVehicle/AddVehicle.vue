<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-product-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Make</label>
              <input
                v-model="make"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Sensung Smart Watch"
              />
              <div v-if="makeError" class="text-danger">{{ makeError }}</div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Brand
              </label>
              <input
                v-model="brand"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Sensung Smart Watch"
              />
              <div v-if="brandError" class="text-danger">{{ brandError }}</div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                style
              </label>
              <input
                v-model="style"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. style"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                deposit
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
              <label class="d-block text-black fw-semibold mb-10"> msrp </label>
              <input
                v-model="msrp"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. msrp"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Description
              </label>
              <div class="mb-0">
                <textarea
                  v-model="description"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="Write your vehicle description"
                ></textarea>
              </div>
              <div v-if="descriptionError" class="text-danger">
                {{ descriptionError }}
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Category Vehicles
              </label>
              <select
                v-model="selectedCategory"
                class="form-select shadow-none fw-semibold rounded-0"
              >
                <option selected>Select a Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.attributes.name }}
                </option>
              </select>
              <div v-if="categoryError" class="text-danger">
                {{ categoryError }}
              </div>
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

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Mice</label>
              <div class="input-group">
                <span
                  class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                >
                  $
                </span>
                <input
                  v-model="mice"
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. 15"
                />
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

          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Vehicle Image
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

          <div class="col-md-6">
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
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Seats
              </label>
              <input
                v-model="seats"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 4"
              />
              <div v-if="seatsError" class="text-danger">{{ seatsError }}</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Partner
              </label>
              <select
                v-model="selectedPartner"
                class="form-select shadow-none fw-semibold rounded-0"
              >
                <option selected>Select a partner</option>
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
              Create Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import { fetchVehicleCategories  , fetchPartners} from "@/services/apiService";
import { postVehicle } from "@/services/apiService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "AddProduct",

  setup() {
    const router = useRouter();
    const allPartners = ref();
    const selectedPartner = ref("");
    const categories = ref();
    const make = ref("");
    const brand = ref("");
    const description = ref("");
    const selectedCategory = ref("");
    const selectedFiles = ref([]);
    const owner = ref("");
    const seats = ref("");
    const daily = ref("");
    const mice = ref("");
    const newDaily = ref("");
    const msrp = ref("");
    const style = ref("");
    const deposit = ref("");

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
    const fetchPartnersList = async () => {
      const data = await fetchPartners();
      allPartners.value = data;
      console.log(data, allPartners, "data");
    };
    const makeError = ref("");
    const brandError = ref("");
    const descriptionError = ref("");
    const categoryError = ref("");
    const imageError = ref("");
    const ownerError = ref("");
    const seatsError = ref("");
    const dailyError = ref("");
    const miceError = ref("");
    const newDailyError = ref("");
    const showToatSuccess = () => {
      toast.success("Vehicle Created  🚗 👍 ", {
        autoClose: 1000,
      });
    };
    const fetchCategories = async () => {
      const data = await fetchVehicleCategories();
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
    const submitForm = async () => {
      makeError.value = "";
      brandError.value = "";
      descriptionError.value = "";
      categoryError.value = "";
      ownerError.value = "";
      seatsError.value = "";
      dailyError.value = "";
      miceError.value = "";
      newDailyError.value = "";
      if (!make.value.trim()) {
        makeError.value = "Make is required.";
      }

      if (!brand.value.trim()) {
        brandError.value = "Brand is required.";
      }

      if (!description.value.trim()) {
        descriptionError.value = "Description is required.";
      }

      if (!selectedCategory.value) {
        categoryError.value = "Please select a category.";
      }

      if (selectedFiles.value.length === 0) {
        imageError.value = "Please upload at least one image.";
      }

      if (!owner.value.trim()) {
        ownerError.value = "Owner is required.";
      }

      if (!daily.value.trim()) {
        dailyError.value = "Daily amount is required.";
      }

      if (!mice.value.trim()) {
        miceError.value = "Mice amount is required.";
      }

      if (
        makeError.value ||
        brandError.value ||
        descriptionError.value ||
        categoryError.value ||
        ownerError.value ||
        seatsError.value ||
        dailyError.value ||
        miceError.value ||
        newDailyError.value
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const vehicleData = {
        data: {
          make: make.value,
          brand: brand.value,
          style: style.value,
          msrp: msrp.value,
          daily: parseFloat(daily.value),
          mice: parseFloat(mice.value),
          new_daily: parseFloat(newDaily.value),
          deposit: parseFloat(deposit.value),
          description: description.value,
          owner: owner.value,
          category_vehicles: [parseInt(selectedCategory.value)],
          seats: parseInt(seats.value),
          partner: [parseInt(selectedPartner.value)]
        },
      };

      console.log(vehicleData);

      const result = await postVehicle(selectedFilesRef, vehicleData);

      if (result.success) {
        showToatSuccess();
        router.push("/VehicleList");
      }
    };
    fetchPartnersList() ;
    fetchCategories();

    return {
      modules,
      categories,
      make,
      allPartners,
      brand,
      description,
      selectedCategory,
      selectedFiles,
      owner,
      seats,
      daily,
      deposit,
      style,
      msrp,
      showToatSuccess,
      mice,
      newDaily,
      makeError,
      brandError,
      descriptionError,
      categoryError,
      ownerError,
      seatsError,
      dailyError,
      miceError,
      newDailyError,
      selectedPartner,
      submitForm,
      selectedFilesRef,
      imageUrls,
      handleFileChange,
      uploadImage,
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
