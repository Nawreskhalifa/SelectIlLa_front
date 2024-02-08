<template>
  <div class="row">
    <div class="col-xxxl-8">
      <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing project-card">
        <div class="card-body p-20 p-md-25 p-lg-30">
          <div class="mb-12 mb-md-15 mb-lg-20 d-flex justify-content-between align-items-center">
            <div class="title d-flex align-items-center">
              <div class="ms-15">
                <h5 class="mb-0 fs-14 fs-md-16 fs-lg-18 fw-bold mt-8 mt-md-10 text-black">
                  {{ getCategoryEvent?.name }}
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
                    @click="navigateToEditCategoryPage(getCategoryEvent.id)"><i
                      class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                    Edit</a>
                </li>
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                    @click="deleteCategory(getCategoryEvent?.id)"><i
                      class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                    Delete</a>
                </li>
              </ul>
            </div>
          </div>
          <span class="d-block fs-md-15 fs-md-16 text-black fw-medium mb-8 mb-md-10">
            Description:
          </span>
          <p class="text-muted lh-base fs-md-15 fs-lg-16">
            {{ getCategoryEvent?.description }}
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script >
import swal from "sweetalert";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CategoryEventDetails",
  methods: {
    ...mapActions(["fetchOneCategoryEvent", "deleteCategoryEvent"]),
    navigateToEditCategoryPage(idCategoryEvent) {
      if (idCategoryEvent !== null && idCategoryEvent !== undefined) {
        this.$router.push({
          name: 'EditCategoryEventPage',
          params: { idCategoryEvent: idCategoryEvent },
        });
      }
    },
    navigateToCategoryDetailPage(idCategoryEvent) {
      this.$router.push({
        name: 'CategoryEventDetailsPage',
        params: { idCategoryEvent: idCategoryEvent },
      });
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
          this.$router.push({ name: 'CategoriesEventPage' });
          // Afficher un message de succès
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
    ...mapGetters(["getCategoriesError", "getCategoriesLoading", "getCategoryEvent"]),
  },
  async mounted() {
    if (this.$route.params && this.$route.params.idCategoryEvent) {
      await this.fetchOneCategoryEvent(this.$route.params.idCategoryEvent);
      console.log(this.getCategoryEvent.id)
    }

  },
};
</script>