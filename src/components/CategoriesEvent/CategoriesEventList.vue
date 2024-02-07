<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-20 p-md-25 p-lg-30">
      <div class="d-sm-flex align-items-center">
        <form class="search-box position-relative">
          <input type="text" class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search Category" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <router-link to="/create-new-category-event"
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-primary fs-md-15 fs-lg-16 d-inline-block d-inline-block text-decoration-none">
          Add New Category
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </router-link>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-xxl-6 col-xxxl-4" v-for="categoryEvent in getCategoriesEvent" :key="categoryEvent.id">
      <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing project-card">
        <div class="card-body p-20 p-md-25 p-lg-30">
          <div class="mb-12 mb-md-15 mb-lg-20 d-flex justify-content-between align-items-center">
            <div class="title d-flex align-items-center">
              <div class="ms-15">
                <h5 class="mb-0 fs-14 fs-md-16 fs-lg-18 fw-bold mt-8 mt-md-10">
                  <router-link :to="'/category-event-details/' + categoryEvent.id"
                    class="text-decoration-none text-black">
                    {{ categoryEvent.name }}
                  </router-link>

                </h5>
              </div>
            </div>
            <div class="dropdown">
              <button
                class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="flaticon-dots"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                    @click="navigateToCategoryDetailPage(categoryEvent.id)">
                    <i class="flaticon-view lh-1 me-8 position-relative top-1"></i>
                    View
                  </a>
                </li>
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                    @click="navigateToEditCategoryPage(categoryEvent.id)"><i
                      class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                    Edit</a>
                </li>
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                    @click="deleteCategory(categoryEvent.id)"><i
                      class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                    Delete</a>
                </li>
              </ul>
            </div>
          </div>
          <p class="mb-12 mb-md-15 mb-lg-25 text-muted lh-base fs-md-15 fs-lg-16">
            {{ truncateDescription(categoryEvent.description) }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import swal from "sweetalert";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "CategoriesEventList",
  methods: {
    ...mapActions(["fetchAllCategoriesEvent", "deleteCategoryEvent"]),
    truncateDescription(description) {
      const maxLength = 65;
      if (description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + '...';
      }
    },
    navigateToEditCategoryPage(idCategoryEvent) {
      if (idCategoryEvent !== null && idCategoryEvent !== undefined) {
        this.$router.push({
          name: 'EditCategoryEventPage',
          params: { idCategoryEvent: idCategoryEvent },
        });
      }
    },
    navigateToCategoryDetailPage(idCategoryEvent) {
      if (idCategoryEvent !== null && idCategoryEvent !== undefined) {
        this.$router.push({
          name: 'CategoryEventDetails',
          params: { idCategoryEvent: idCategoryEvent },
        });
      }
    },
    async deleteCategory(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this category!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deleteCategoryEvent action or API endpoint to delete the category
          await this.deleteCategoryEvent(id);
          swal({
            text: 'Category deleted Successfully!',
            icon: 'success',
            closeOnClickOutside: false
          })
        } else {
          swal("Category is safe!");
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getCategoriesError", "getCategoriesLoading", "getCategoriesEvent"]),
  },
  async mounted() {
    await this.fetchAllCategoriesEvent();
  },
});
</script>