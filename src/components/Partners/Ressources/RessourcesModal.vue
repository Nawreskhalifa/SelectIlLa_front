<template>
    <transition name="modal-animation">
      <div v-show="show" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="show" class="modal-inner">
            <i class="fas fa-times close-icon" @click="closeModal"></i>

            <div class="card product-details-box">
               <nav id="navbar-example2" class="navbar navbar-light bg-light">
                <a class="navbar-brand">Ressources</a>
                <ul class="nav nav-pills">
                   <li class="nav-item"  :class="{ active: villas }">
                    <a class="nav-link" @click="showVillas">Villas</a>
                  </li>
                  <li class="nav-item"  :class="{ active: vehicles }">
                    <a class="nav-link" @click="showVehicles">Vehicles</a>
                  </li>
                  <li class="nav-item"  :class="{ active: events }" >
                    <a class="nav-link" @click="showEvents">Events</a>
                  </li>
                </ul>
              </nav>

               <div class="row row-cols-1 row-cols-md-3" v-if="villas && ressources.villas ">
                <div class="col mb-4" v-for="villa in villas" :key="villa.id">
                  <div class="card h-100">
                    <img src="" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
                </div>
               </div>

               <div class="row row-cols-1 row-cols-md-3" v-if="vehicles">
                <div class="col mb-4">
                  <div class="card h-100">
                    <img src="" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">Card tsdfdsfsdfitle</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
                </div>
               </div>

               <div class="row row-cols-1 row-cols-md-3" v-if="events">
                <div class="col mb-4">
                  <div class="card h-100">
                    <img src="" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is adsfdsfdsfdsf longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
                </div>
               </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </template>

  <script>
  export default {
    props: {
      show: Boolean,
      ressources: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        name: "",
        villas: true,
        vehicles: false,
        events: false
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      showVillas() {
        this.villas = true;
        this.vehicles = false;
        this.events = false;
      },
      showVehicles() {
        this.villas = false;
        this.vehicles = true;
        this.events = false;
      },
      showEvents() {
        this.villas = false;
        this.vehicles = false;
        this.events = true;
      }
    },
    mounted(){
        console.log(this.ressources)

    }
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
   max-width: 1200px;
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

   .close-icon {
     position: absolute;
     top: 10px;
     right: 10px;
     font-size: 24px;
     color: #333;
     cursor: pointer;
   }

   /* Increase specificity for active nav item */
   .nav-item.active > .nav-link {
     background-color: #6560f0;
     color: white;
   }
 }
 </style>
