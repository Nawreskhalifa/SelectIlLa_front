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
                 <option
                  v-for="make in makes"
                  :key="make?.id"
                  :value="make"
                >
                  {{ make.attributes.name }}
                </option>
              </select>
<div class="accordion" id="basicAccordion">


<div class="accordion-item mb-0">


<button class="accordion-button shadow-none fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#basicCollapseOne" aria-expanded="true" aria-controls="basicCollapseOne">


Accordion Item #1


</button>


<div id="basicCollapseOne" class="accordion-collapse collapse" data-bs-parent="#basicAccordion">


<div class="accordion-body">


<p class="lh-base fs-md-15 fs-lg-16 text-paragraph mb-0"><strong class="text-black">This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>


</div>


</div>


</div>
</div>
              <div v-if="makeError" class="text-danger">{{ makeError }}</div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Brand
              </label>
 <select v-model="brand" class="form-select shadow-none fw-semibold rounded-0" :disabled="!make">
  <template v-if="brands && brands.length > 0">
    <option v-for="br in brands" :key="br?.id" :value="br">
      {{ br?.attributes?.name }}
    </option>
  </template>
  <template v-else>
    <option disabled>Select A Make First</option>
  </template>
</select>



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
import { defineComponent, ref  ,computed } from "vue";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import { fetchVehicleCategories  , fetchPartners,fetchMakes, fetchBrands,fetchBrandMyMake} from "@/services/apiService";
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
     const brand = ref("");
    const description = ref("");
    const selectedCategory = ref("");
    const selectedFiles = ref([]);
    const AllSelected = ref<string[]>([]);
    const makes =  ref([]) ;
    const brands=  ref([]);
    const owner = ref("");
    const seats = ref("");
    const daily = ref("");
    const mice = ref("");
    const newDaily = ref("");
    const msrp = ref("");
    const style = ref("");
    const deposit = ref("");
    const make = ref("")
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
    const  addToAllCat = () => {
    AllSelected.value.push(selectedCategory.value)
    console.log(AllSelected.value)
}
    const fetchPartnersList = async () => {
      const data = await fetchPartners();
      allPartners.value = data;
      console.log(data, allPartners, "data");
    };
    const selectedCategoryNames = computed(() => {
    return AllSelected.value.map((categoryId) => {
      const selectedCategory = categories.value.find(category => category.id === categoryId);
      return selectedCategory ? selectedCategory.attributes.name : '';
    });
  });
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
    const fetchMakesCat = async () => {
       const  {data}= await fetchMakes()
       makes.value = data

    }
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
      const selectedC= AllSelected.value.filter(item =>{
    return parseInt(item)
  })
  console.log(selectedC,"sele")
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
          category_vehicles: selectedC ,
          seats: parseInt(seats.value),
          partner: [parseInt(selectedPartner.value)]
        },
      };

      console.log(vehicleData);

      const result = await postVehicle(selectedFilesRef, vehicleData);

      if (result.success) {
        showToatSuccess();
        router.push("/vehiclelist");
      }
    };
   const getBrands = async (selectedMake) => {
  try {
     const { data } = await fetchBrandMyMake(selectedMake.id);
    brands.value = data;
  } catch (error) {
    console.error("Error fetching brands:", error);
  }
};


    fetchPartnersList() ;
    fetchCategories();
fetchMakesCat()
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
      makes,
      brands,
      getBrands,
       deposit,
      style,
      msrp,
      showToatSuccess,
      mice,
      deleteFromCategories,
      newDaily,
      makeError,
      brandError,
      descriptionError,
      selectedCategoryNames,
      categoryError,
      ownerError,
      seatsError,
      dailyError,
      miceError,
      newDailyError,
      selectedPartner,
      submitForm,
      selectedFilesRef,
      addToAllCat,
      AllSelected ,
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
