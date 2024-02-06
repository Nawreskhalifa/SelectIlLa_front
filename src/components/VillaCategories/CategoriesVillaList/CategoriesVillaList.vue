<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="search-box position-relative">
        <input
          @input="change"
          type="text"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Search Villa"
          v-model="searchInput"
        />
      </div>
      <div class="d-sm-flex align-items-center">
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
        >
          Export
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Category Name
              </th>

              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Created At
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Updated At
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ category.attributes.Name }}
              </td>

              <td class="shadow-none lh-1 fw-medium text-paragraph">
                <span v-date="category.attributes.updatedAt"></span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                <span v-date="category.attributes.updatedAt"></span>
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-paragraph text-end pe-0"
              >
                <div class="dropdown">
                  <button
                    class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
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
                        @click.prevent="openEdit(category)"
                        ><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click.prevent="deleteVehicle(category.id)"
                        ><i
                          class="flaticon-delete lh-1 me-8 position-relative top-1"
                        ></i>
                        Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">10</span> out of
          <span class="fw-bold">134</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link active" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div v-if="categoryEdit">
    <UpdateModal
      :show="ModalVisible"
      :category="categoryEdit"
      @close="closeModal"
      @updated="updated"
    />
  </div>
</template>

<script>
import {
  fetchVillaCategories,
  deleteVillaCategory,
  search,
} from "@/services/apiService";
import UpdateModal from "../EditVillaCategory/EditVillaCategory.vue";
export default {
  name: "CategoryList",
  components: {
    UpdateModal,
  },
  data() {
    return {
      categories: [],
      ModalVisible: false,
      categoryEdit: "",
      searchInput: "",
    };
  },
  methods: {
    async fetchCategories() {
      const data = await fetchVillaCategories();
      console.log(data);
      this.categories = data.data;
    },
    async deleteVehicle(id) {
      this.categories = this.categories.filter((item) => {
        return item.id !== id;
      });
      const response = await deleteVillaCategory(id);
    },
    openEdit(category) {
      this.ModalVisible = !this.ModalVisible;
      this.categoryEdit = category;
      console.log(this.categoryEdit);
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
          "category-villas",
          "Name",
          "$contains",
          this.searchInput
        );
        console.log(data.data.data, "+ change ", this.categories);
        this.categories = data.data.data;
      } catch (error) {
        console.error("Error searching for vehicles:", error);
      }
    },
  },
  directives: {
    date: {
      mounted(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
      updated(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
