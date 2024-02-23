<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-product-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Make</label>
              <select
                v-model="make"
                class="form-select shadow-none fw-semibold rounded-0"
                @change="getBrands(make)"
              >
                <option v-for="make in makes" :key="make?.id" :value="make">
                  {{ make.attributes.name }}
                </option>
              </select>
              <div v-if="makesLoading" class="loader"></div>

              <div style="display: flex; flex-direction: row">
                                                   <a  class="card-link-btn lnk text-decoration-none text-primary fw-medium position-relative d-inline-block mt-10 mt-sm-0"   style="cursor: pointer;"                       @click.prevent="addMake" ><i   class="flaticon-plus lh-2 me-16 position-relative top-1"></i> Add new make </a>


              </div>

              <div v-if="makeErrorVisible" class="text-danger">
                Make is required.
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Brand
              </label>
              <select
                v-model="brand"
                class="form-select shadow-none fw-semibold rounded-0"
                :disabled="!make"
              >
                <template v-if="brandsLoading">
                  <option>Loading brands...</option>
                </template>
                <template v-else-if="brands && brands.length > 0">
                  <option v-for="br in brands" :key="br?.id" :value="br">
                    {{ br?.attributes?.name }}
                  </option>
                </template>
                <template v-else>
                  <option disabled>
                    There is no Brands for {{ make?.attributes?.name }}
                  </option>
                </template>
              </select>
              <div v-if="brandsLoading" class="loader"></div>
              <div v-if="make" style="display: flex; flex-direction: row">
                                                                   <a  class="card-link-btn lnk text-decoration-none text-primary fw-medium position-relative d-inline-block mt-10 mt-sm-0"   style="cursor: pointer;"                       @click.prevent="addBrand" ><i   class="flaticon-plus lh-2 me-16 position-relative top-1"></i> Add Brand To {{ make.attributes.name }} </a>


              </div>

              <div v-if="brandErrorVisible" class="text-danger">
                Brand is required.
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Style</label>
              <select
                v-model="style"
                class="form-select shadow-none fw-semibold rounded-0"
               >
                <option v-for="st in styles" :key="st?.id" :value="st">
                  {{ st.attributes.name }}
                </option>
              </select>
              <!-- <div v-if="makesLoading" class="loader"></div> -->

              <div style="display: flex; flex-direction: row">
                                                                                   <a  class="card-link-btn lnk text-decoration-none text-primary fw-medium position-relative d-inline-block mt-10 mt-sm-0"   style="cursor: pointer;"                       @click.prevent="addStyleModal" ><i   class="flaticon-plus lh-2 me-16 position-relative top-1"></i>Add new Style </a>


              </div>

              <div v-if="makeErrorVisible" class="text-danger">
                Make is required.
              </div>
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
                min="0"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g deposit"
              />
              <div v-if="depositErrorVisible" class="text-danger">
                Deposit is required.
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                <abbr title="Manufacturer's Suggested Retail Price"
                  >MSRP</abbr
                ></label
              >
              <input
                v-model="msrp"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 2532152"
              />
              <div v-if="msrpErrorVisible" class="text-danger">
                MSRP is required.
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
              <div v-if="newDailyErrorVisible" class="text-danger">
                New Daily amount is required.
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Description
              </label>
              <div class="mb-0">
                <QuillEditor
                  style="height: 12em"
                  theme="snow"
                  placeholder="Write your meta description"
                  v-model:content="description"
                  toolbar="full"
                />
                <div v-if="descriptionErrorVisible" class="text-danger">
                  Description is required.
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Category Vehicle
              </label>
              <ul
              style="
                display: flex;
                flex-direction: row;
                gap: 10px;
                justify-content: flex-start;
                align-items: center;
              "
            >
            <li class="single_cat" v-for="catName in selectedCategoryNames" :key="catName">

                <span> {{ catName }}</span>
                <i
                  class="fas fa-times-circle"
                  @click="deleteFromCategories(catName )"
                ></i>
              </li>
            </ul>
              <select
                v-model="selectedCategory"
                class="form-select shadow-none fw-semibold rounded-0"
                @change="addToAllCat"
              >
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
          </div> -->

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
              <div v-if="dailyErrorVisible" class="text-danger">
                Daily amount is required.
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
              <div v-if="miceErrorVisible" class="text-danger">
                Mice amount is required.
              </div>
            </div>
          </div>



          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Vehicle Image
              </label>
              <div class="file-upload text-center position-relative">
                <!-- <img
                  v-for="(url, index) in imageUrls"
                  :src="url"
                  :key="index"
                  alt="Uploaded Image"
                  class="preview-image"
                /> -->
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
                  accept="image/*"
                />
              </div>
            </div>
            <div v-if="imageUrls.length > 0" class="image-preview">
              <div
                v-for="(photo, index) in imageUrls"
                :key="index"
                class="image-item"
              >
                <img :src="photo" alt="Selected Image" />
                <button
                  @click="removeImage(index)"
                  class="delete_icon"
                  type="button"
                >
                  <i class="fas fa-times-circle"></i>
                </button>
                <input
                  type="radio"
                  :id="'radio_' + index"
                  v-model="coverImageIndex"
                  :value="index"
                  class="set_cover_button"
                  title="Set as a cover image"
                  style="cursor: pointer"
                />
              </div>
            </div>
            <div v-if="imageErrorVisible" class="text-danger">
              Please upload at least one image.
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
                Seats
              </label>
              <input
                v-model="seats"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 4"
                max="10"
                min="2"
              />
              <div v-if="seatsErrorVisible" class="text-danger">
                Seats amount is required.
              </div>
              <div v-if="seats > 5" class="text-danger">
                Seats cannot exceed 5.
              </div>
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
            <div v-if="partnerErrorVisible" class="text-danger">
              Please select a partner.
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
   <div class="modal" :class="{ hide: !modalStyle }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Style</h5>
          <button type="button" class="btn-close" @click="closeModalStyle"></button>
        </div>
        <div class="modal-body">
          <label class="d-block text-black fw-semibold mb-10">Style:</label>
          <input v-model="newStyle" type="text" class="form-control" placeholder="Enter style name" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModalStyle">Close</button>
          <button type="button" class="btn btn-primary" @click="saveStyle">Save</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" :class="{ hide: !modal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Make</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <label class="d-block text-black fw-semibold mb-10">Make :</label>
          <input
            v-model="newMake"
            type="text"
            class="form-control"
            placeholder="e.g Ford"
          />
          <!-- <label class="d-block text-black fw-semibold mb-10">Brand :</label>
            <input v-model="newBrand" type="text" class="form-control" placeholder="e.g F -150" /> -->
        </div>
        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveChanges">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="make" class="modal" :class="{ hide: !modalBrand }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Brand To {{ make.attributes.name }}</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModalBrand"
          ></button>
        </div>
        <div class="modal-body">
          <label class="d-block text-black fw-semibold mb-10">Make :</label>
          <input
            type="text"
            class="form-control"
            :value="make.attributes.name"
            disabled
          />
          <label class="d-block text-black fw-semibold mb-10">Brand :</label>
          <input
            v-model="newBrand"
            type="text"
            class="form-control"
            placeholder="e.g F -150"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModalBrand"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveOnlyBrand">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import {
  fetchVehicleCategories,
  fetchPartners,
  fetchMakes,
  fetchBrands,
  fetchStyles,
  fetchBrandMyMake,
  postBrand,
  addStyle,
  postMake,
} from "@/services/apiService";
import { postVehicle } from "@/services/apiService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
import MakeModal from "../AddMake/MakeModal.vue";

export default defineComponent({
  name: "AddProduct",
  components: { Loading },

  setup() {
    const makesLoading = ref(false);
    const coverImageIndex = ref(0);

    const brandsLoading = ref(false);
    const router = useRouter();
    const allPartners = ref();
    const isLoading = ref(false);
    const fullPage = ref(true);
    const selectedPartner = ref("");
    const categories = ref();
    const brand = ref();
    const description = ref();
    const selectedFiles = ref([]);
    const AllSelected = ref<string[]>([]);
    const makes = ref([]);
    const brands = ref([]);
    const seats = ref("");
    const daily = ref("");
    const mice = ref("");
    const newDaily = ref("");
    const msrp = ref("");
    const styles = ref([]);
    const style= ref()
    const deposit = ref("");
    const make = ref();
    const newMake = ref("");
    const newBrand = ref("");
    const makeErrorVisible = ref(false);
    const brandErrorVisible = ref(false);
    const descriptionErrorVisible = ref(false);
    const seatsErrorVisible = ref(false);
    const dailyErrorVisible = ref(false);
    const miceErrorVisible = ref(false);
    const newDailyErrorVisible = ref(false);
    const imageErrorVisible = ref(false);
    const depositErrorVisible = ref(false);
    const msrpErrorVisible = ref(false);
    const styleErrorVisible = ref(false);
    const partnerErrorVisible = ref(false);
    const modal = ref(false);
    const modalBrand = ref(false);
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
    const addBrand = async () => {
      modalBrand.value = true;
    };
       const getStyles = async () => {
      const {data} = await fetchStyles();
      styles.value = data ;
      console.log(styles.value,"styless")
      // console.log(data, styles, "styles");
     };

    const makeError = ref("");
    const brandError = ref("");
    const descriptionError = ref("");
    const categoryError = ref("");
    const imageError = ref("");
    const seatsError = ref("");
    const dailyError = ref("");
    const miceError = ref("");
        const modalStyle = ref(false);
    const newStyle = ref("");
  const closeModalStyle = () => {
      modalStyle.value = false;
    };

    const newDailyError = ref("");
    const showToatSuccess = () => {
      toast.success("Vehicle Created  🚗 👍 ", {
        autoClose: 1000,
      });
    };
     const addStyleModal = () => {
      modalStyle.value = true;
    };

   const saveStyle = async () => {
      try {
        const response = await addStyle({data:{ name: newStyle.value} });
        if (response) {
           getStyles();
          closeModalStyle();
        } else {
          console.error("Failed to add style.");
        }
      } catch (error) {
        console.error("Error adding style:", error);
      }
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
    const fetchMakesCat = async () => {
      makesLoading.value = true;
      const { data } = await fetchMakes();
      makesLoading.value = false;

      makes.value = data;
    };
    const changeText = (event) => {
      console.log(event);
      const newText = event.delta.ops
        .filter((op) => op.insert)
        .map((op) => op.insert)
        .join("");

      description.value = newText;
      console.log(newText);
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
    makeErrorVisible.value = false;
    brandErrorVisible.value = false;
    descriptionErrorVisible.value = false;
    seatsErrorVisible.value = false;
    dailyErrorVisible.value = false;
    miceErrorVisible.value = false;
    newDailyErrorVisible.value = false;
    imageErrorVisible.value = false;
    depositErrorVisible.value = false;
    msrpErrorVisible.value = false;
    styleErrorVisible.value = false;
    partnerErrorVisible.value = false;

    isLoading.value = true;

    let hasError = false;

    if (!make.value) {
        makeErrorVisible.value = true;
        hasError = true;
    }

    if (!brand.value) {
        brandErrorVisible.value = true;
        hasError = true;
    }

    if (!description.value || !description.value.ops || !description.value.ops[0].insert) {
        descriptionErrorVisible.value = true;
        hasError = true;
    }

    if (!seats.value) {
        seatsErrorVisible.value = true;
        hasError = true;
    }

    if (!selectedPartner.value) {
        partnerErrorVisible.value = true;
        hasError = true;
    }

    if (!daily.value) {
        dailyErrorVisible.value = true;
        hasError = true;
    }

    if (!mice.value) {
        miceErrorVisible.value = true;
        hasError = true;
    }

    if (!deposit.value) {
        depositErrorVisible.value = true;
        hasError = true;
    }

    if (!msrp.value) {
        msrpErrorVisible.value = true;
        hasError = true;
    }

    if (!newDaily.value) {
        newDailyErrorVisible.value = true;
        hasError = true;
    }

    if (selectedFilesRef.value.length === 0) {
        imageErrorVisible.value = true;
        hasError = true;
    }

    if (!style.value) {
        styleErrorVisible.value = true;
        hasError = true;
    }

    if (hasError) {
        isLoading.value = false;
        return;
    }

    const selectedC = AllSelected.value.filter((item) => parseInt(item));
    const vehicleData = {
        data: {
            make: make.value.id,
            brand: brand.value.id,
            msrp: msrp.value,
            daily: parseFloat(daily.value),
            mice: parseFloat(mice.value),
            new_daily: parseFloat(newDaily.value),
            deposit: parseFloat(deposit.value),
            description: description.value.ops[0].insert,
            seats: parseInt(seats.value),
            partner: [parseInt(selectedPartner.value)],
            style: style.value,
            cover_image_index: [coverImageIndex.value]
        },
    };

    const result = await postVehicle(selectedFilesRef, vehicleData);
    if (result.success) {
        showToatSuccess();
        isLoading.value = false;
        router.push("/vehiclelist");
    }
};


    const getBrands = async (selectedMake) => {
      brandsLoading.value = true;

      try {
        const { data } = await fetchBrandMyMake(selectedMake.id);
        brands.value = data;
        brandsLoading.value = false;
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const closeModal = () => {
      console.log("Closing modal...");
      modal.value = false;
    };
    const closeModalBrand = () => {
      modalBrand.value = false;
    };
    const saveChanges = async () => {
      console.log("New Make:", newMake.value);
      console.log("New Brand:", newBrand.value);
      isLoading.value = true;
      const newMakePost = await postMake({ data: { name: newMake.value } });
      console.log(newMakePost.data, "posted make");
      if (newMakePost.data) {
        // const newBrandPost= await postBrand({data:{name:newBrand.value , make:newMakePost.data.id}})
        // if(newBrandPost){
        console.log("already");
        setTimeout(() => {
          isLoading.value = false;
          fetchMakesCat();
        }, 2000);
      }
      closeModal();
    };
    const saveOnlyBrand = async () => {
      try {
        isLoading.value = true;
        const response = await postBrand({
          data: { name: newBrand.value, make: make.value?.id },
        });

        if (response) {
          const res: any = await fetchBrandMyMake(make.value.id);
          console.log(res, "dfs");
          if (res) {
            brands.value = res?.data;
            newBrand.value = "";
            closeModalBrand();
            console.log("Brand added successfully:", response.data);
          } else {
            console.error("Failed to get brands.");
          }
        } else {
          console.error("Failed to add brand. Response:", response);
        }
      } catch (error) {
        console.error("Error adding brand:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const removeImage = (index) => {
      selectedFilesRef.value.splice(index, 1);
      imageUrls.value.splice(index, 1);
    };

    const addMake = () => {
      modal.value = true;
      console.log(modal.value, " add make ");
    };

    fetchPartnersList();
    // fetchCategories();
    fetchMakesCat();
    getStyles();
    return {
      modules,
        modalStyle,
       newStyle,
      addStyleModal,
      closeModalStyle,
      saveStyle,
      styles,
      makesLoading,
      brandsLoading,

      fullPage,
      addMake,
      make,
      allPartners,
      brand,
      description,
      selectedFiles,
      // owner,
      modal,
      isLoading,
      saveOnlyBrand,
      seats,
      daily,
      removeImage,
      newMake,
      newBrand,
      closeModal,
      saveChanges,
      makes,
      brands,
      getBrands,
      deposit,
       styleErrorVisible,
      partnerErrorVisible,
      addBrand,
      msrp,
      showToatSuccess,
      mice,
      deleteFromCategories,
      newDaily,
      makeError,
      brandError,
      descriptionError,
      categoryError,
      changeText,
      seatsError,
      dailyError,
      imageError,
      miceError,
      coverImageIndex,
      newDailyError,
      closeModalBrand,
      selectedPartner,
      submitForm,
      makeErrorVisible,
      brandErrorVisible,
      descriptionErrorVisible,
      style,
      seatsErrorVisible,
      dailyErrorVisible,
      miceErrorVisible,
      newDailyErrorVisible,
      imageErrorVisible,
      selectedFilesRef,
      depositErrorVisible,
      msrpErrorVisible,
      // addToAllCat,
      AllSelected,
      imageUrls,
      handleFileChange,
      uploadImage,
      modalBrand,
    };
  },
});
</script>
<style scoped>
.lnk{
  margin-top: 5px !important;
}
.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-left: 5px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.preview-image {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 10px;
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
  max-width: 500px;
}

.hide {
  visibility: hidden;
}
.modal-content {
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}

.btn-close {
  padding: 0.5rem 0.75rem;
  margin: -0.5rem -0.75rem -0.5rem auto;
}

.delete_icon {
  position: absolute;
  top: 5px; /* Ajustez la position verticale selon vos besoins */
  left: 5px; /* Ajustez la position horizontale selon vos besoins */
  background-color: transparent; /* Couleur de fond du bouton */
  color: #ffffff; /* Couleur du texte */
  border: none; /* Supprimer la bordure */
  padding: 5px; /* Espacement intérieur */
  border-radius: 50%; /* Bordure arrondie pour un aspect de bouton circulaire */
  cursor: pointer; /* Curseur pointeur au survol */
  transition: background-color 0.3s ease; /* Animation de transition */
  margin-right: 10px; /* Ajouter une marge à droite pour créer de l'espace entre les boutons */
}
.image-item {
  position: relative;
  max-width: 150px;
  /* Taille maximale d'une image */
  margin-bottom: 5px;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-x: auto;
  max-height: 200px;
  /* Ajustez la hauteur maximale si nécessaire */
}
.select-same-width {
  width: calc(100% - 24px); /* Réglez la largeur en fonction de vos besoins */
}
.set_cover_button {
  position: absolute;
  top: 5px; /* Ajustez la position verticale selon vos besoins */
  right: 5px; /* Ajustez la position horizontale selon vos besoins */
  background-color: transparent; /* Couleur de fond du bouton */
  color: #0056b3; /* Couleur du texte */
  border: none; /* Supprimer la bordure */
  padding: 5px; /* Espacement intérieur */
  border-radius: 50%; /* Bordure arrondie pour un aspect de bouton circulaire */
  cursor: pointer; /* Curseur pointeur au survol */
  transition: background-color 0.3s ease; /* Animation de transition */
}
</style>
