<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing"></div>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-20 p-md-25 p-lg-30"
    >
      <div class="d-flex align-items-center">
        <form
          class="search-box position-relative"
          @submit.prevent="handleSearch"
        >
          <input
            type="text"
            class="form-control shadow-none rounded-0 border-0 pr-40"
            placeholder="Search here"
            style="width: calc(100% - 40px)"
            v-model="searchText"
            @input="handleSearch"
          />
          <button
            class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-3 pe-md-3 rounded-1 fs-md-15 fs-lg-16 bg-primary"
            type="submit"
            style="
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            "
            :disabled="getCategoriesLoading"
          >
            Search

            <i
              class="flaticon-search-interface-symbol position-relative ms-5 top-1"
            ></i>
          </button>
        </form>
      </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <router-link
          to="/create-new-category-event"
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-primary fs-md-15 fs-lg-16 d-inline-block d-inline-block text-decoration-none"
        >
          Add New Category
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </router-link>
      </div>
      <div class="dropdown mt-10 mt-sm-0 ms-sm-10">
        <button
          class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
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
              href="javascript:void(0);"
              @click="selectAllCategories"
            >
              <i class="fas fa-check lh-1 me-8 position-relative top-1"></i>
              {{ selectAllChecked ? "Deselect All" : "Select All" }}
            </a>
          </li>
          <li>
            <a
              class="dropdown-item d-flex align-items-center"
              href="javascript:void(0);"
              @click="deleteSelectedCategories"
            >
              <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
              Delete Selected
            </a>
          </li>
        </ul>
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
                @click="toggleSortDirection"
              >
                Category Name
                <span v-if="sortDirection === 'asc'" class="arrow-up"></span>
                <span v-if="sortDirection === 'desc'" class="arrow-down"></span>
              </th>

              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Description
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
            <tr v-for="category in getCategoriesEvent" :key="category.id">
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                <div class="d-flex align-items-center">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                    />
                  </div>
                  {{ category.name }}
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ truncateDescription(category.description) }}
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
                        @click.prevent="
                          navigateToCategoryDetailPage(category.id)
                        "
                        ><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        View</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click.prevent="navigateToEditCategoryPage(category.id)"
                        ><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click="deleteCategory(category.id)"
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
          Showing
          <span class="fw-bold">{{ getCategoriesEvent.length }}</span> out of
          <span class="fw-bold">{{ getTotalItems }}</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click="currentPage !== 1 && onPageChange(currentPage - 1)"
              >
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li
              class="page-item"
              v-for="page in getTotalPages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click="onPageChange(page)">{{
                page
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === getTotalPages }"
            >
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click="
                  currentPage !== getTotalPages && onPageChange(currentPage + 1)
                "
              >
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <loading
      v-model:active="getCategoriesLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
    <CustomModal
      :show="showModal"
      :msg="modalMessage"
      :messageType="messageType"
      @action="handleModalAction"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import swal from "sweetalert";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import CustomModal from "../Common/CustomModal.vue";
export default defineComponent({
  name: "CategoriesEventList",
  components: {
    Loading,
    CustomModal,
  },
  data() {
    return {
      currentPage: 1,
      searchText: "",
      selectAllChecked: false,
      sortDirection: "asc",
      showModal: false,
      modalMessage: "",
      categoryIdToDelete: null, // Ajoutez la propriété pour stocker l'ID de la catégorie à supprimer
      messageType: "delete",
    };
  },
  methods: {
    ...mapActions([
      "fetchAllCategoriesEvent",
      "deleteCategoryEvent",
      "getCategoriesLoading",
    ]),
    async toggleSortDirection() {
      // Basculer entre ascendant et descendant
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      // Appeler handleFilterChange pour appliquer le nouveau tri
      await this.fetchAllCategoriesEvent({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
        sortDirectionName: this.sortDirection,
      });
    },
    deleteSelectedCategories() {
      const selectedCategories = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedCategories.push(this.getCustomers[index].id);
        }
      });

      if (selectedCategories.length === 0) {
        swal("Please select at least one category to delete.");
        return;
      }

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these categories!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deleteCustomer action or API endpoint to delete the selected customers
          await Promise.all(
            selectedCategories.map((id) => this.deleteCategoryEvent(id))
          );
          // After deletion, fetch customers again to update the list
          await this.fetchAllCategoriesEvent({
            page: this.currentPage,
            perPage: 4,
          });
          swal("Selected categories have been deleted!", {
            icon: "success",
          });
        } else {
          swal("Selected categories are safe!");
        }
      });
    },
    selectAllCategories() {
      this.selectAllChecked = !this.selectAllChecked;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.selectAllChecked;
      });
    },
    async handleSearch() {
      await this.fetchAllCategoriesEvent({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
      });
    },
    async onPageChange(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchAllCategoriesEvent({ page: pageNumber, perPage: 4 });
    },
    truncateDescription(description) {
      const maxLength = 80;
      if (description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + "...";
      }
    },
    navigateToEditCategoryPage(idCategoryEvent) {
      if (idCategoryEvent !== null && idCategoryEvent !== undefined) {
        this.$router.push({
          name: "EditCategoryEventPage",
          params: { idCategoryEvent: idCategoryEvent },
        });
      }
    },
    navigateToCategoryDetailPage(idCategoryEvent) {
      if (idCategoryEvent !== null && idCategoryEvent !== undefined) {
        this.$router.push({
          name: "CategoryEventDetails",
          params: { idCategoryEvent: idCategoryEvent },
        });
      }
    },
    async deleteCategory(id) {
      this.showModal = true;
      this.modalMessage = "Are you sure you want to delete this category?";
      this.categoryIdToDelete = id;
    },
    async handleModalAction(confirmed) {
      // Fermer la modal
      this.showModal = false;
      // Vérifier si l'utilisateur a confirmé
      if (confirmed) {
        // Appeler la méthode de suppression de la catégorie ici
        // Utilisez this.categoryIdToDelete pour obtenir l'ID de la catégorie à supprimer
        await this.deleteCategoryEvent(this.categoryIdToDelete);
        // Suppression confirmée, afficher un message de succès
        this.$emit("categoryDeleted");
      }
    },
  },
  computed: {
    ...mapGetters([
      "getCategoriesError",
      "getCategoriesLoading",
      "getCategoriesEvent",
      "getTotalPages",
      "getTotalItems",
    ]),
  },
  async mounted() {
    await this.fetchAllCategoriesEvent({ page: this.currentPage, perPage: 4 });
  },
});
</script>
<style scoped>
.event-card {
  /* Default box shadow */
  transition: box-shadow 0.4s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.arrow-up::before {
  content: "\25B2"; /* Code Unicode pour la flèche vers le haut */
}

.arrow-down::before {
  content: "\25BC"; /* Code Unicode pour la flèche vers le bas */
}
.event-card:hover {
  /* Box shadow on hover */
  box-shadow: 0 8px 12px #7d6ff0;
}
</style>
