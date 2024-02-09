<template>
  <transition name="modal-animation">
    <div v-show="show" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal-inner">
          <button class="close_icon" @click="closeModal">×</button>

          <div class="card product-details-box">
            <div class="card-body p-15 p-sm-20 p-md-25">
              <div class="table-responsive">
                <div class="table-responsive">
                  <!-- Vehicle Table -->
                  <table class="table text-nowrap align-middle mb-0" v-if="dataAtt && dataAtt.attributes && dataAtt.attributes.vehicles && dataAtt.attributes.vehicles.data.length > 0">
                    <thead>
                      <tr>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Make</th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Daily</th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Style</th>
                         <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in  dataAtt.attributes.vehicles.data" :key="item.id">
                        <td class="shadow-none lh-1 fw-medium text-paragraph">{{ item.attributes.make }}</td>
                        <td class="shadow-none lh-1 fw-medium text-paragraph">{{ item.attributes.daily }} $</td>
                        <td class="shadow-none lh-1 fw-medium text-paragraph">{{ item.attributes.brand }} {{ item.attributes.style }}</td>
                         <td class="shadow-none lh-1 fw-medium text-paragraph">{{ item.attributes.available }}</td>
                        <td class="shadow-none lh-1 fw-medium text-paragraph" style="display: flex; flex-direction: row ; gap: 5px;">
                          <button @click="acceptItem(item)" style="background-color: darkorchid !important; color :white !important ; border: none !important; padding:2px !important">Accept</button>
                          <button @click="refuseItem(item)">Refuse</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="table-responsive">
                  <!-- Villa Table -->
                  <table class="table text-nowrap align-middle mb-0" v-if="dataAtt && dataAtt.attributes && dataAtt.attributes.villas && dataAtt.attributes.villas.data.length > 0">
                    <thead>
                      <tr>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Name</th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Daily</th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">City</th>
                         <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Deposit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="villa in  dataAtt.attributes.villas.data" :key="villa.id">
                        <td class="shadow-none lh-1 fw-medium text-paragraph">{{ villa.attributes.name }}</td>
                        <td class="shadow-none lh-1 fw-medium text-paragraph">{{ villa.attributes.daily }} $</td>
                        <td class="shadow-none lh-1 fw-medium text-paragraph">{{ villa.attributes.city }}</td>
                         <td class="shadow-none lh-1 fw-medium text-paragraph">{{ villa.attributes.deposit }}</td>
                        <td class="shadow-none lh-1 fw-medium text-paragraph">
                          <button   style="background-color: darkorchid !important; color :white !important ; border: none !important; padding:2px !important" @click="acceptVilla(villa)">Accept</button>
                          <button @click="refuseVilla(villa)">Refuse</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />
    <div class="table-responsive">
      <table class="table text-nowrap align-middle mb-0" v-if="dataAtt && dataAtt.attributes && dataAtt.attributes.villas && dataAtt.attributes.villas.data.length > 0">
        <thead>
          <tr>

            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Name</th>
            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Daily</th>
            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">start_date</th>
             <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">end_date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in  dataAtt.attributes.events.data" :key="event.id">
            <td class="shadow-none lh-1 fw-medium text-paragraph">{{ event.attributes.name }}</td>
            <td class="shadow-none lh-1 fw-medium text-paragraph">{{ event.attributes.price }} $</td>
            <td class="shadow-none lh-1 fw-medium text-paragraph">{{ event.attributes.start_date }}</td>
             <td class="shadow-none lh-1 fw-medium text-paragraph">{{ event.attributes.end_date }}</td>
            <td class="shadow-none lh-1 fw-medium text-paragraph">
              <button   style="background-color: darkorchid !important; color :white !important ; border: none !important; padding:2px !important" @click="acceptVilla(villa)">Accept</button>
              <button @click="refuseVilla(villa)">Refuse</button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>

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
  methods: {
   async  acceptVilla(villa){
       const  postedData= {
        data : {
          reservation_demand : this.dataAtt.id,
          villa: villa.id,
          Price:villa.attributes.daily,
          customer:this.dataAtt.attributes.customer.data.id
        }
       }
 const res =  await  acceptReservation(postedData)
 console.log(res,"res")
    } ,
       async  refuseVilla(villa) {
  try {

      this.dataAtt.attributes.villas.data = this.dataAtt.attributes.villas.data.filter(item => item.id !== villa.id);

      // Update the reservation with the modified list of villas
      const updatedReservationData = {
        data: {
          villas: this.dataAtt.attributes.villas.data.map(item => item.id)
        }
      };

       const updateReservationResponse = await updateInReservation(this.dataAtt.id, updatedReservationData);

      if (updateReservationResponse.success) {
        console.log('Reservation updated successfully.');
      } else {
        console.error('Failed to update reservation:', updateReservationResponse.error);
      }

  } catch (error) {
    console.error('Error handling refused villa:', error);
  }
}
,
    closeModal() {
      this.$emit("close");
    },
    async confirmUpdate() {
      const updatedData = {
        data: {
          Name: this.name,
        },
      };
      const res = await updateVillaCategory(this.category.id, updatedData);
      console.log(res);
      if (res) {
        this.$emit("updated");
      }
    },
  },
  mounted() {
    console.log(this.dataAtt)
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

</style>
