<template>
  <div class="card mb-25 border-0 rounded-0 bg-white create-new-project-box" id="createNewCategoryBox">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="createNewCategory" id="createNewCategoryForm">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10" for="categoryName">
                Category Name
              </label>
              <input
                v-model="name"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning"
                required
                id="categoryName"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10" for="categoryDescription">
                Category Description
              </label>
              <div class="mb-0">
                <textarea
                  v-model="description"
                  class="form-control shadow-none rounded-0 text-black"
                  rows="4"
                  placeholder="Write your meta description"
                  id="categoryDescription"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
              type="submit"
              :disabled="getCategoriesLoading"
              id="createCategoryBtn"
            >
              <span>Create Category</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <loading
    v-model:active="getCategoriesLoading"
    :can-cancel="true"
    :is-full-page="true"
  />
</template>
<script lang="ts">
import { makeApiRequest } from "../../services/apiService";
import { endPoints } from "../../utils/endPoints";
import { methodsHttpNames } from "../../utils/methods";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default defineComponent({
  name: "CreateNewCategoryEvent",
  components: {
    Loading,
  },
  data() {
    return {
      name: "",
      description: "",
    };
  },
  computed: {
    ...mapGetters([
      "getCategoriesError",
      "getCategoriesLoading",
      "getCategoryEvent",
    ]),
  },
  methods: {
    ...mapActions(["fetchOneCategoryEvent", "addCategory"]),

    async createNewCategory() {
      // Use this.categoryName and this.categoryDescription to create a new category
      const newCategory = {
        name: this.name,
        description: this.description,
      };
      try {
        const response = await makeApiRequest(
          methodsHttpNames.GET,
          `${endPoints.findCategoryEventByName}/${this.name}`,
          undefined,
          undefined
        );
        console.log(response);
        if (response.success) {
          swal({
            text: "Category already exists!",
            closeOnClickOutside: false,
          });
        } else {
          await this.addCategory(newCategory);
          this.$router.push({ name: "CategoriesEventPage" });
          // Afficher un message de succès
          swal({
            text: "Category Added Successfully!",
            closeOnClickOutside: false,
          });
          // Reset form fields after submission
          this.name = "";
          this.description = "";
        }
      } catch (error: any) {
        console.log(error);
      }
    },
  },
});
</script>
