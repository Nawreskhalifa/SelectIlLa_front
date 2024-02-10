<template>
  <transition name="modal-animation">
    <div v-show="show" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal-inner">
          <button class="close_icon" @click="closeModal">×</button>
          <div class="d-flex align-items-start">
            <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" :aria-controls="v-pills-home" :aria-selected="true">Home</button>
              <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" :aria-controls="v-pills-profile" :aria-selected="false">Profile</button>
              <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" :aria-controls="v-pills-messages" :aria-selected="false">Messages</button>
              <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" :aria-controls="v-pills-settings" :aria-selected="false">Settings</button>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" :aria-labelledby="v-pills-home-tab " style="display: flex; justify-content: flex-end; align-items: center;">
                <div class="user-card">
                  <span class="avatar-holder">
                    <img  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0Mzk4NjU1Mw&ixlib=rb-1.2.1&q=80&w=200" alt="Avatar">
                  </span>
                  <span class="user-info-holder">
                    <h2 class="name">David Grant</h2>
                    <span class="skill">3D artist</span>

                    <div class="evaluations">
                      <span class="stars evaluation">
                        <span class="star-icon evaluation-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </span>
                        <span class="star-text evaluation-text">4.7 Rating</span>
                      </span>

                      <span class="reviews evaluation">
                        <span class="reviews-icon evaluation-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                            <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                          </svg>
                        </span>
                        <span class="reviews-text evaluation-text">4,447 Reviews</span>
                      </span>

                      <span class="student evaluation">
                        <span class="student-icon evaluation-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                          </svg>
                        </span>
                        <span class="student-text evaluation-text">478 Students</span>
                      </span>
                    </div>

                    <span class="desc">
                      <p>David Grant has been making video games for a living for more than 14 years as a Designer, Producer, Creative Director, and Executive Producer, creating games for console, mobile, PC and Facebook.</p>
                    </span>

                    <span class="button">
                      <button class="show-more-btn">Show More</button>
                    </span>

                  </span>
                </div>

                <!-- Buy me a coffe script -->
               </div>
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" :aria-labelledby="v-pills-profile-tab">..qsdfsqdf.</div>
              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" :aria-labelledby="v-pills-messages-tab">...sqdfqsfd</div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" :aria-labelledby="v-pills-settings-tab">..sqdfsqdf.</div>
            </div>
          </div>
         </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { updateVillaCategory , acceptReservation ,deleteAcceptedReservation,updateInReservation} from "@/services/apiService";
export default {
  props: {
    show: Boolean,
    dataProp: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataAtt:this.dataProp,
      name: "",
    };
  },
  methods:{
    closeModal() {
      this.$emit("close");
    },
  }
//   methods: {
//    async  acceptVilla(villa){
//        const  postedData= {
//         data : {
//           reservation_demand : this.dataAtt.id,
//           villa: villa.id,
//           Price:villa.attributes.daily,
//           customer:this.dataAtt.attributes.customer.data.id
//         }
//        }
//  const res =  await  acceptReservation(postedData)
//  console.log(res,"res")
//     } ,
//        async  refuseVilla(villa) {
//   try {

//       this.dataAtt.attributes.villas.data = this.dataAtt.attributes.villas.data.filter(item => item.id !== villa.id);

//       // Update the reservation with the modified list of villas
//       const updatedReservationData = {
//         data: {
//           villas: this.dataAtt.attributes.villas.data.map(item => item.id)
//         }
//       };

//        const updateReservationResponse = await updateInReservation(this.dataAtt.id, updatedReservationData);

//       if (updateReservationResponse.success) {
//         console.log('Reservation updated successfully.');
//       } else {
//         console.error('Failed to update reservation:', updateReservationResponse.error);
//       }

//   } catch (error) {
//     console.error('Error handling refused villa:', error);
//   }
// }
// ,
//     closeModal() {
//       this.$emit("close");
//     },
//     async confirmUpdate() {
//       const updatedData = {
//         data: {
//           Name: this.name,
//         },
//       };
//       const res = await updateVillaCategory(this.category.id, updatedData);
//       console.log(res);
//       if (res) {
//         this.$emit("updated");
//       }
//     },
//   },
//   mounted() {
//     console.log(this.dataAtt)
//    },
};
</script>

<style lang="scss" scoped>
.active{
 }
 .nav-link:hover {
  background-color: #1c2b62 !important;
  color: white !important;
}


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
  max-width: 700px;
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
button{
  background-color: white !important;
  color: #34495e !important;
  border: none  !important;
padding : 3px !important;
}
.buttons{
  display: flex !important;
  flex-direction: row !important;
  gap:5px !important;
}
button :hover {
background-color:#333 !important ;
color: white !important;
border: none !important;
}
.confirm-button{
background-color:#fff ;
color: #34495e;
border: 1px solid #34495e;
}





.user-card {
  max-width:100%;
  height: auto;
  display: flex;
  justify-content: flex;
  padding: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  gap: 1rem;
 }

.avatar-holder img {
  width: 36rem;
  height: 12rem;
  border-radius: 50%;
  background: #e6effa;
  padding: 0.5rem;
  position: relative;
  display: block;
  object-fit: cover;
}

.user-info-holder {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  font-size: 1.625rem;
  color: #1c2b62;
  font-weight: bold;
  font-family: "Merriweather", sans-serif;
}

.skill {
  font-size: 1rem;
  color: #1c2b62;
}

.evaluations {
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  color: #1c2b62;
}

.evaluation-icon svg {
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
}

.desc {
  color: #1c2b62;
  font-weight: 300;
}

.show-more-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #1c2b62;
  font-size: 1rem;
  font-weight: 600;
  color: #1c2b62;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.25s ease 0s;
}

.show-more-btn:hover,
.show-more-btn:focus {
  background: #1c2b62;
  color: #fff;
}

</style>
