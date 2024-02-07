<template>
  <div class="card mb-25 border-0 rounded-0 bg-white create-new-project-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="createNewCategory">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Category Name
              </label>
              <input
                v-model="name"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning"
                required
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Category Description
              </label>
              <div class="mb-0">
                <textarea
                  v-model="description"
                  class="form-control shadow-none rounded-0 text-black"
                  rows="4"
                  placeholder="Write your meta description"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
              type="submit"
              :disabled="getCategoriesLoading"
            >
              <span v-if="!getCategoriesLoading">Create Category</span>
              <div
                v-if="getCategoriesLoading"
                class="spinner-border"
                role="status"
              ></div>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { makeApiRequest } from "../../services/apiService";
import { endPoints } from "../../utils/endPoints";
import { methodsHttpNames } from "../../utils/methods";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert";

export default defineComponent({
  name: "CreateNewCategoryEvent",
  data() {
    return {
      name: "",
      description: "",
    };
  },
  watch: {
    categoryDescription(newValue) {
      console.log("categoryDescription updated:", newValue);
    },
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
      const newCategory = {
        data: {
          Name: this.name,
          description: this.description,
        },
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
            icon: "error",
            closeOnClickOutside: false,
          });
        } else {
          await this.addCategory(newCategory);
          this.$router.push({ name: "CategoriesEventPage" });
          // Afficher un message de succès
          swal({
            text: "Category Added Successfully!",
            icon: "success",
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
