<template>
  <div class="wrapper">
    <div class="chips_input" :data-limit="limit">
      <label for="myinput">
        <span class="limit">{{ currentChips }}/{{ limit }}</span>
      </label>
      <div class="inner" @click="focusInput">
        <span class="chip" v-for="(chip, index) in chips" :key="index">{{ chip }}<button aria-label="remove this chip" @click="removeChip(index)"><i class="fa-solid fa-xmark"></i></button></span>
        <input type="text" id="myinput" name="myinput" ref="input" v-model="inputValue" @keydown="handleKeyDown">
      </div>
    </div>
    <div class="additional-chips">
      <a class="text-black text-decoration-none">Available Tags : </a>
      <span class="chip" v-for="(chip, index) in previousTags" :key="'additional_' + index" @click="addChip(chip)">{{ chip.attributes.name }} + </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previousTags: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chips: [],
      inputValue: '',
      limit: 15
    };
  },
  computed: {
    currentChips() {
      return this.chips.length;
    }
  },
  methods: {
    focusInput() {
      this.$refs.input.focus();
    },
    handleKeyDown(event) {
      if (event.keyCode === 13 || event.keyCode === 9 || event.keyCode === 188) {
        event.preventDefault();
        if (event.keyCode === 188) {
          this.inputValue = this.inputValue.substring(0, this.inputValue.length - 1);
        }
        if (this.inputValue.trim() && !this.chips.includes(this.inputValue.trim()) && this.chips.length < this.limit) {
          this.chips.push(this.inputValue.trim());
          this.$emit('newChipAdded', this.inputValue.trim());
        }
        this.inputValue = '';
      } else if (event.keyCode === 8 && !this.inputValue) {
        this.removeLastChip();
      }
    },
    removeChip(index) {
      this.chips.splice(index, 1);
      this.$emit('chipRemoved', index);
    },
    removeLastChip() {
      if (this.chips.length > 0) {
        this.chips.pop();
        this.$emit('chipRemoved', this.chips.length);
      }
    },
    addChip(chip) {
      if (!this.chips.includes(chip.attributes.name) && this.chips.length < this.limit) {
        this.chips.push(chip.attributes.name);
        this.$emit('previousChipAdded', chip);
      }
    }
  }
};
</script>

<style scoped>

.wrapper {
  position: relative;
  top: 50%;
  width: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.chips_input {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  --primary: #fff;
  --secondary: #111;
  --invalid: #f00;
  color: var(--secondary);
}
.chips_input > label {
  opacity: 0.8;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  color: inherit;
}
.chips_input > p {
  font-size: 0.8rem;
  opacity: 0.75;
  margin: 0 0.25rem;
  color: inherit;
}
.chips_input > div.inner {
  width: 100%;
  min-height: 2rem;
  background-color: var(--primary);
  border: 1px solid #7036cc33;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.5rem;
  box-sizing: border-box;
  max-width: 20rem;
  position: relative;
}
.chips_input > div.inner > input {
  border: none;
  outline: none;
  font-size: 1rem;
  position: relative;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  color: var(--secondary);
}
span.chip {
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  background:#6560F0 ;
  border-radius: 0.5rem;
  color: white;
  font-size: 0.8rem;
  padding-right: 1.5rem;
  position: relative;
}
span.chip > button {
  border: none;
  background: transparent;
  color: transparent;
  position: absolute;
  top: 50%;
  right: 0.15rem;
  transform: translateY(-50%);
}
span.chip > button > i {
  font-family: fontawesome;
  cursor: pointer;
  color: var(--primary);
}
span.limit {
  float: right;
}
.additional-chips {
  margin-top: 1rem;
}
.additional-chips .chip {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #6560F0;
  border-radius: 0.5rem;
  color: white;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>
