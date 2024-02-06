<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-product-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="createCategory">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"> Name</label>
              <input
                v-model="name"
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. Sensung Smart Watch"
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
                  placeholder="Write your product description"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Create Category
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { postVillaCategory } from "@/services/apiService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      name: "",
      description: "",
      router: useRouter(),
    };
  },
  methods: {
    showToatSuccess() {
      toast.success("Villa Category Created  🚗 👍 ", {
        autoClose: 1000,
      });
    },
    async createCategory() {
      if (this.name.trim !== "" && this.description.trim !== "") {
        const category = {
          data: {
            Name: this.name,
            description: this.description,
          },
        };
        const response = await postVillaCategory(category);
        if (response.success) {
          this.showToatSuccess();
          this.router.push("/VillaListCategory");
        }
      }
    },
  },
};
</script>
