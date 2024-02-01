import { reactive } from "vue";

interface StateStore {
  open: boolean;
  isAuthenticated: boolean;
  onChange: () => void;
}

const stateStore: StateStore = reactive({
  open: false,
  isAuthenticated: false,
  onChange ()  {
    stateStore.open = !stateStore.open
  },
})

export default stateStore