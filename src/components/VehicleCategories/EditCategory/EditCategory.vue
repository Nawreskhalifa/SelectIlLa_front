<template>
  <transition name="modal-animation">
    <div v-show="show" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal-inner">
          <div class="card product-details-box">
            <p class="confirmation-text mb-10 fw-semibold fs-16 fs-lg-18">
              Edit Category
            </p>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <!-- <label class="d-block text-black fw-semibold mb-10">
                  {{ category.attributes.name }}
                </label> -->
                <input
                  v-model="name"
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  :placeholder="category.attributes.name"
                />
              </div>
            </div>
            <div class="buttons">
              <button class="confirm-button" @click="confirmUpdate">
                Confirm
              </button>
              <button class="cancel-button" @click="closeModal">No</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { updateVehicleCategory } from "@/services/apiService";
export default {
  props: {
    show: Boolean,
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async confirmUpdate() {
      const updatedData = {
        data: {
          name: this.name,
        },
      };
      const res = await updateVehicleCategory(this.category.id, updatedData);
      if (res) {
        this.$emit("updated");
      }
    },
  },
  created() {
    console.log(this.category);
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

.modal-inner {
  position: relative;
  max-width: 400px;
  width: 80%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 32px;
  text-align: center;

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
    right: 5px;
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }
}
</style>
