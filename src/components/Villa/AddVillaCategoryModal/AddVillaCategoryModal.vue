<template>
  <transition name="modal-animation">
    <div v-show="show" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal-inner">
          <button class="close_icon" @click="closeModal"><i class="flaticon-close" style="width: 2px;"></i></button>

          <div class="card   mb-25 border-0 rounded-0 bg-white add-product-box">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <form @submit.prevent="createCategory">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">Name</label>
                      <input
                        v-model="name"
                        type="text"
                        class="form-control shadow-none rounded-0 text-black"
                        placeholder="e.g.Smart house"
                      />
                                                               <p v-if=" tabed & !isFormValid" class="text-danger">Name field  is required</p>

                    </div>

                  </div>

                  <div class="col-md-12">
                    <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">Description</label>
                      <div class="mb-0">
                        <textarea
                          v-model="description"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="Write your  meta description "
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
<div class="col-md-12">
                  </div>



                    <button
                      class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                      type="submit"
                    >
                       Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { postVillaCategory } from "@/services/apiService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
import { ref } from 'vue';

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      name: "",
      description: "",
      router: useRouter(),
      tabed:false
    };
  },
  computed: {
    isFormValid() {
      return this.name.trim() !== "";
    }
  },
  methods: {
    showToatSuccess() {
      toast.success("Vehicle Category Created 🚗 👍", {
        autoClose: 1000,
      });
    },
    async createCategory() {
    this.tabed = this.isFormValid === false
      if (this.isFormValid) {
        const category = {
          data: {
            Name: this.name,
            description: this.description,
          },
        };
        try {
          const response = await postVillaCategory(category);
          if (response.success) {
            this.name =""
            this.description =""
            this.showToatSuccess();
            this.$emit('addedCat', response.data.data);
            this.$emit('close');
            // this.router.push("/VehicleListCategory");
          } else {
            console.error("API request failed:", response.error);
            // Handle failed API response
          }
        } catch (error) {
          console.error("API request failed:", error);
        }
      } else {
        console.error("Name and description are required.");
      }
    },
    async closeModal() {
      this.$emit('close')
    }
  },
};
</script>
<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(110, 110, 110, 0.7);
}
.card {
  display: flex;
  flex-direction: column; /* Changed to column layout */
}

.modal-inner {
  position: relative;
  max-width: 400px;
  width: 80%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding:  15px;
  text-align: start;

  .confirmation-text {
    font-size: 18px;
    margin-bottom: 24px;
  }

  .buttons {
    display: flex;
    justify-content: center;

    button {
      padding: 10px 20px;
      margin: 0 8px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;

      &.confirm-button {
        background-color: #6560f0;
        color: #fff;
      }

      &.cancel-button {
        background-color: #fff;
        color: #6560f0;
      }

      &:hover {
        background-color: #34495e;
      }
    }
  }

  .close_icon {
    position: absolute;
    top: 0;
    right: 2px;
    font-size: 20px;
     font-style: bold;
    color: #333;
    background-color: #fff;
    border:none ;
    cursor: pointer;
    z-index: 9;
  }
}

</style>
