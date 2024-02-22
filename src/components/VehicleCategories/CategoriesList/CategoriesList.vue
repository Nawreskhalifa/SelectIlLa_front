<template>
  <UpdateModal :show="ModalVisible" @close="closeModal" @addMake="addAMake" />
  <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
  <div v-if="makeToEdit">
    <edit-make
      :show="EditMakeModal"
      :make="makeToEdit"
      @close="closeMake"
      @editedMakeName="editMake"
    />
  </div>
  <div v-if="openedMakeFull">
    <AddBrand
      :show="showAddBrand"
      @close="closeAddBrand"
      :make="openedMakeFull"
      @addBrand="CreateANewBrand"
    />
  </div>
  <div v-if="brandToEdit">
    <EditBrand
      :show="editBrandModal"
      @close="closeEditBrand"
      :brand="brandToEdit"
      @editedBrand="editBrandMethod"
    />
  </div>

  <div class="row">
    <div class="col-lg-4 col-xxxl-3">
      <div
        class="card mb-25 border-0 rounded-0 bg-white letter-spacing chat-sidebar"
      >
        <div class="card-body">
          <input
            type="text"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search Makes"
            v-model="searchInput"
            @input="searchMake"
          />

          <button
            class="btn btn-primary d-block w-100"
            type="button"
            @click="openAdd"
          >
            Add New Make
          </button>

          <div class="chat-users-list">
            <div class="card mb-25 border-0 rounded-0 bg-white to-do-list-box">
              <div class="card-body letter-spacing">
                <div
                  class="scrollable-container"
                 style="max-height: 400px; overflow-y: auto;"
                >
                  <ul class="to-do-list style-two ps-0 list-unstyled mb-0">
                    <li
                      v-for="make in makes"
                      :key="make.id"
                      :class="{ selected: make.selected }"
                      class="to-do-list-item d-flex align-items-center justify-content-between hoverli"
                      @click.prevent="openBrandsFormMake(make)"
                    >
                      <div style="width: 95%; cursor: pointer">
                        <div
                          class="'form-check mb-0 fs-md-15 fs-lg-16 text-black fw-medium'"
                          v-if="
                            make && make.attributes && make?.attributes?.name
                          "
                        >
                          <label class="aria-label">
                            <h6
                              style="cursor: pointer"
                              class="card-title fw-bold mb-0"
                            >
                              {{ make.attributes.name }}
                            </h6>
                          </label>
                        </div>
                      </div>
                      <div class="dropdown">
                        <button
                          class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="flaticon-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              @click.prevent="openEditMake(make)"
                            >
                              <i class="flaticon-pen lh-1 me-8"></i>
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              @click.prevent="deleteMakeMeth(make.id)"
                            >
                              <i class="flaticon-delete lh-1 me-8"></i>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- <div
                  class="text-center mt-2"
                  v-if="!showAllItems && makes.length > pageSize"
                >
                  <button class="btn btn-link" @click="showAllItems = true">
                    Show more
                  </button>
                </div>
                <div class="text-center mt-2" v-else-if="showAllItems">
                  <button class="btn btn-link" @click="showAllItems = false">
                    Show less
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-xxxl-4">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div
            class="mb-15 mb-md-30 d-sm-flex align-items-center justify-content-between"
          >
            <h6 class="card-title fw-bold mb-0">
              Brand
              <span class="badge bg-primary fs-20" v-if="openedMake">{{
                openedMake
              }}</span>
            </h6>
            <div
              class="card-select mt-10 mt-md-0 mb-10 mb-md-0 d-inline-block d-sm-flex align-items-center ps-10 pe-10 pt-5 pb-5"
              v-if="openedMake"
            >
              <span
                class="fw-medium text-muted me-8"
                @click="addNewBrand()"
                style="cursor: pointer"
                >+ brand for {{ openedMake }}</span
              >
            </div>
          </div>
          <div class="responsive">
            <div class="row">
              <div class="col-lg-12"               style="max-height: 400px; overflow-y: auto;">
                 <div  v-for="brand in brands" :key="brand.id">
                  <div
                    class="card mb-3"
                    @click="handleBrandClick(brand)"
                    :class="{ selected: brand.selected }"
                    style="cursor: pointer"
                  >
                    <div
                      class="card-body hoverli"
                      style="
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <h6 class="card-title fw-bold mb-0">
                        {{ brand?.attributes?.name }}
                      </h6>
                      <div class="dropdown">
                        <button
                          class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="flaticon-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              @click.prevent="openEditBrand(brand)"
                              >Edit</a
                            >
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              @click.prevent="deleteBrandMethode(brand.id)"
                              >Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="!showAllBrands && brands.length > pageSize">
                  <button class="btn btn-link" @click="showAllBrands = true">
                    Show more
                  </button>
                </div>
                <div v-else-if="showAllBrands">
                  <button class="btn btn-link" @click="showAllBrands = false">
                    Show less
                  </button>
                </div> -->
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-xxxl-4">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div
            class="mb-15 mb-md-30 d-sm-flex align-items-center justify-content-between" style="margin-top: 25px;"
          >
            <h6 class="card-title fw-bold mb-0">
              Tags
              <span class="badge bg-primary fs-20" v-if="openedBrand">{{
                openedBrand?.attributes?.name
              }}
            </span>
            </h6>
            <div
              class="card-select mt-10 mt-md-0 mb-10 mb-md-0 d-inline-block d-sm-flex align-items-center ps-10 pe-10 pt-5 pb-5  "
              v-if="openedBrand"
            >
              <span
                class="fw-medium text-muted me-8  "
                v-if="!isAdd"
                @click="addNewTags()"
                style="cursor: pointer"
                >+ Tag for {{ openedBrand.attributes?.name }}
              </span>
              <span
                class="fw-medium text-muted me-8      "
                v-if="isAdd"
                @click="cancelAddTags()"
                style="cursor: pointer"
                >Cancel
              </span>
            </div>
          </div>
          <div class="responsive">
            <div class="row" >
              <div v-if="isAdd"  style="display:flex ; justify-content: space-between; align-items: center; flex-direction: column; height: 100%; margin-top: 40%; ">
                <ChipsComponent
                   :previousTags="this.tags"
                  @newChipAdded="handleNewChipAdded"
                  @previousChipAdded="handlePreviousChipAdded"
                />
                <span
                  class="fw-medium text-muted me-8"
                  @click="submitTags"
                  style="cursor: pointer; display: flex; justify-content: end"
                  ><span
                    style="
                      border: 1px solid rgb(179, 171, 171);
                      padding: 5px;
                      border-radius: 5px;
                      align-self: self-end;
                    "
                    >Submit</span
                  >
                </span>
              </div>
              <div
                v-if="!isAdd && !openedBrand.attributes?.name"
                class="col-lg-12"
                 style="max-height: 400px; overflow-y: auto;"
              >
                <div v-for="tag in tags" :key="tag.id">
                  <div class="card mb-3" style="cursor: pointer">
                    <div
                      class="card-body hoverli"
                      style="
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <h6 class="card-title fw-bold mb-0">
                        {{ tag?.attributes?.name }}
                      </h6>
                      <div class="dropdown">
                        <button
                          class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="flaticon-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              @click.prevent="openEditTag(tag)"
                              >Edit</a
                            >
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              @click.prevent="deleteTag(tag.id)"
                              >Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div v-if="!showAllBrands && brands.length > pageSize">
                  <button class="btn btn-link" @click="showAllBrands = true">
                    Show more
                  </button>
                </div>
                <div v-else-if="showAllBrands">
                  <button class="btn btn-link" @click="showAllBrands = false">
                    Show less
                  </button>
                </div> -->
              </div>
              <div
                v-if="!isAdd && openedBrand.attributes?.name"
                class="col-lg-12"
              >
                <div v-for="tag in tags" :key="tag.id">
                  <div class="card mb-3" style="cursor: pointer">
                    <div
                      class="card-body hoverli"
                      style="
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <h6 class="card-title fw-bold mb-0">
                        {{ tag?.attributes?.name }}
                      </h6>
                      <div class="dropdown">
                        <button
                          class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="flaticon-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <!-- <li>
                            <a class="dropdown-item" @click.prevent="openEditTag(tag)">Edit</a>
                          </li> -->
                          <li>
                            <a
                              class="dropdown-item"
                              @click.prevent="deleteTag(tag.id)"
                              >Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div v-if="!showAllBrands && brands.length > pageSize">
                  <button class="btn btn-link" @click="showAllBrands = true">
                    Show more
                  </button>
                </div>
                <div v-else-if="showAllBrands">
                  <button class="btn btn-link" @click="showAllBrands = false">
                    Show less
                  </button>
                </div> -->
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchMakes,
  fetchBrands,
  editMake,
  postMake,
  editBrand,
  deleteMake,
  deleteBrand,
  fetchTags,
  postBrand,
  deleteTags,
  fetchBrandMyMake,
  addTags,
  updateTags,
  search,
} from "@/services/apiService";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import UpdateModal from "@/components/VehicleCategories/EditCategory/EditCategory.vue";
import EditMake from "@/components/VehicleCategories/EditMake/EditMake.vue";
import AddBrand from "../AddNewBrand/AddNewBrand.vue";
import EditBrand from "../EditBrand/EditBrand.vue";
import ChipsComponent from "../../Common/ChipsComponent.vue";
export default {
  name: "CategoryList",
  components: {
    UpdateModal,
    ChipsComponent,
    EditMake,
    EditBrand,
    AddBrand,
    Loading,
  },
  data() {
    return {
      categories: [],
      ModalVisible: false,
      showAllItems: false,
      isLoading: false,
      categoryEdit: "",
      showAllBrands: false,

      EditMakeModal: false,
      makes: [],
      makeToEdit: "",
      brands: [],
      openedMake: null,
      openedMakeFull: null,
      openedBrand: "",
      showAddBrand: false,
      editBrandModal: false,
      brandToEdit: "",
      currentPage: 1,
      isAdd: false,
      pageSize: 3,
      searchInput: "",
      tags: [],
      perviousTagsAdded: [],
      newTagsAdded: [],
      brandsTags: [],
    };
  },
  computed: {
    totalItemsMake() {
      return this.makes.length;
    },
    totalPagesMake() {
      if (this.showAllItems) {
        return 1;
      } else {
        return Math.ceil(this.totalItemsMake / this.pageSize);
      }
    },
    paginatedMakes() {
      if (this.showAllItems) {
        return this.makes;
      } else {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.makes.slice(startIndex, endIndex);
      }
    },

    totalItems() {
      return this.brands.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    paginatedBrands() {
      if (this.showAllBrands) {
        return this.brands;
      } else {
        const startIndex = 0;
        const endIndex = this.pageSize;
        return this.brands.slice(startIndex, endIndex);
      }
    },
  },
  methods: {
    async deleteTag(tagId) {
      try {
        await deleteTags(tagId);
        this.tags = await this.tags.filter((tag) => tag.id !== tagId);
        this.brandsTags = await this.brandsTags.filter(
          (tag) => tag.id !== tagId
        );
      } catch (error) {
        console.error(`Error deleting tag with ID ${tagId}:`, error);
      }
    },
    submitTags() {
      if (this.perviousTagsAdded.length >= 0) {
        this.perviousTagsAdded.forEach(async (item) => {
          const dataTags = {
            data: {
              brand: this.openedBrand.id,
            },
          };
          const upd = await updateTags(item.id, dataTags);
          this.brandsTags.push(upd.data);
        });
      }
      if (this.newTagsAdded.length >= 0) {
        this.newTagsAdded.forEach(async (item) => {
          const dataTags = {
            data: {
              name: item,
              brand: this.openedBrand.id,
            },
          };
          const res = await addTags(dataTags);
          this.brandsTags.push(res.data);
        });
        this.isAdd = false;
      }
      this.newTagsAdded = [];
      this.perviousTagsAdded = [];
    },
    cancelAddTags() {
      this.isAdd = false;
      this.perviousTagsAdded = [];
      this.newTagsAdded = [];
    },
    handleNewChipAdded(event) {
      this.newTagsAdded.push(event);
    },
    handlePreviousChipAdded(event) {
      this.perviousTagsAdded.push(event);
    },
    addedTags() {
      this.isAdd = false;
    },
    addNewTags() {
      this.isAdd = true;
    },
    handleBrandClick(brand) {
      this.brands.forEach((b) => {
        if (b.id !== brand.id) {
          b.selected = false;
        }
      });
      brand.selected = !brand.selected;
      this.tags = [];
      this.openedBrand = brand;
      this.brandsTags = [];
      if (
        brand &&
        brand.attributes &&
        brand.attributes.tags &&
        brand.attributes.tags.data
      ) {
        this.tags = brand.attributes.tags.data;
        this.brandsTags = this.openedBrand.attributes.tags.data;
      }
    },

    async searchMake() {
      this.makes = [];
      this.currentPage = 1;
      try {
        const { data } = await search(
          "makes",
          "name",
          "$contains",
          this.searchInput
        );
        this.makes = data.data;
        this.currentPage = Math.min(this.currentPage, this.totalPages);
      } catch (error) {
        console.error("Error searching makes:", error);
      }
    },

    async searchBrand() {
      const { data } = await search(
        "brands",
        "name",
        "$contains",
        this.searchInput
      );
      this.brands = data.data;
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    closeAddBrand() {
      this.showAddBrand = false;
    },
    async deleteBrandMethode(id) {
      const res = await deleteBrand(id);
      if (res) {
        this.brands = this.brands.filter((item) => item.id !== id);
      }
    },

    async editBrandMethod(event) {
      if ((event.name, event.id)) {
        const updateBr = await editBrand(event.id, {
          data: { name: event.name },
        });
        if (updateBr) {
          this.editBrandModal = false;
          this.brands.forEach((item) => {
            if (
              item.id === event.id &&
              item.attributes &&
              item.attributes.name
            ) {
              item.attributes.name = event.name;
            }
          });
        }
      }
    },
    addNewBrand() {
      this.showAddBrand = true;
    },
    openEditBrand(brand) {
      this.editBrandModal = true;
      this.brandToEdit = brand;
    },

    closeEditBrand() {
      this.editBrandModal = false;
    },
    async CreateANewBrand(event) {
      if (event.name && event.make) {
        const res = await postBrand({
          data: { name: event.name, make: event.make },
        });
        console.log(res);
        (this.showAddBrand = false), this.brands.push(res.data);
        this.getMakes();
      }
    },
    closeMake() {
      this.EditMakeModal = false;
    },
    async getMakes(page = 1, pageSize = 4) {
      let query = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      const { data } = await fetchMakes(query);
      this.makes = data;
      const allItemsDisplayed = this.makes.length <= pageSize;
      if (allItemsDisplayed) {
        query = "";
        const { data: allData } = await fetchMakes(query);
        this.makes = allData;
      }

      this.showAllItems = allItemsDisplayed;
    },

    async openBrandsFormMake(make) {
      this.makes.forEach((m) => (m.selected = false));
      make.selected = true;

      if (
        make &&
        make.attributes &&
        make.attributes.brands &&
        make.attributes.brands.data
      ) {
        this.brands = make.attributes.brands.data;
        this.openedMake = make.attributes.name;
        this.openedMakeFull = make;
      }
    },

    async getAllMakes() {
      const { data } = await fetchBrands();
      this.brands = data;
    },
    async deleteMakeMeth(makeId) {
      try {
        await deleteMake(makeId);
        await this.getMakes();
      } catch (error) {
        console.error(`Error deleting make with ID ${makeId}:`, error);
      }
    },
    async editMake(event) {
      try {
        if (event.id && event.name) {
          this.EditMakeModal = false;
          const updatedData = await editMake(event.id, {
            data: { name: event.name },
          });
          await this.getMakes();
        }
      } catch (error) {
        console.error("Error editing make:", error);
      }
    },
    async deleteMake(makeId) {
      try {
        await deleteMake(makeId);
        await this.getMakes();
      } catch (error) {
        console.error(`Error deleting make with ID ${makeId}:`, error);
      }
    },
    async addAMake(event) {
      if (event.name) {
        const addM = await postMake({ data: { name: event.name } });
        if (addM) {
          await this.getMakes();
        }
      }
    },

    openEditMake(make) {
      this.EditMakeModal = true;
      console.log(make);
      this.makeToEdit = make;
    },
    openAdd() {
      this.ModalVisible = !this.ModalVisible;
    },

    closeModal() {
      this.ModalVisible = !this.ModalVisible;
    },
    async updated() {
      await this.fetchCategories();
      this.ModalVisible = !this.ModalVisible;
    },
    async change() {
      try {
        console.log("searchinput", this.searchInput);
        const data = await search(
          "category-vehicles",
          "name",
          "$contains",
          this.searchInput
        );
        console.log(data.data.data, "+ change ", this.categories);
        this.categories = data.data.data;
      } catch (error) {
        console.error("Error searching for vehicles:", error);
      }
    },
    async getTags() {
      const { data } = await fetchTags();
      console.log(data);
      this.tags = data;
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.getTags(), await this.getMakes();
    await this.getAllMakes();
    this.isLoading = false;
  },
};
</script>

<style scoped lang="scss">
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
 }

/* Handle */
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: grey;
}
.hoverli:hover {
  color: white !important;
  background-color: #6560f0;
  padding-left: 5px;
  & .card-title {
    color: white;
  }
}

.selected {
  background-color: #6560f0;
  color: white !important;
}

.selected .card-title {
  color: white;
  padding: 5px;
}
.chips-container {
  position: relative;
  height: 50px;
}

.add-tag-text {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}

</style>
