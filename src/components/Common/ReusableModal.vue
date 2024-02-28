<template>
  <transition name="modal-animation">
    <div   class="modal">
      <transition name="modal-animation-inner">
        <div   class="modal-inner">
          <div class="modal-backdrop">
            <div
              class="modal-content"
              role="dialog"
              aria-labelledby="modalTitle"
              aria-describedby="modalDescription"
            >
              <header class="modal-header" id="modalTitle">
                <slot name="header">Default Header</slot>
                <button
                  type="button"
                  class="close-btn"
                  @click="close"
                  aria-label="Close Modal"
                >
                  x
                </button>
              </header>

              <main class="modal-body" id="modalDescription">
                <slot name="body">Default body content</slot>
              </main>

              <footer class="modal-footer">
                <!-- <slot name="footer">Default Footer!</slot> -->
                <button
                  type="button"
                  class="btn-close-modal"
                  @click="close"
                  aria-label="Close Modal"
                >
                  Close
                </button>
              </footer>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalReus",
  props: {
    // show: {
    //   type: Boolean,
    //   required: true
    // }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-inner {
  position: relative;
  max-width: 200px;
  width: 50%;
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
}

.modal-backdrop {
  background-color: rgba(51, 51, 51, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.modal-content {
  position: absolute;
  width: 40%;
  top: 50%;
  left: 50%;
   transform: translate(-50%, -50%);
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  align-items: center;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #ccc;
  color: #333;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #ccc;
}

.modal-body {
  position: relative;
  padding: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
  color: #666;
  background: #ffffff ;
}

.btn-close-modal {
  color: #fff;
  background: #6560f0 ;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 20px auto;
  cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
