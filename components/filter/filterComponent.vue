<template >
  <div class="card shadow-sm mb-3">
    <div class="card-header">
      <slot></slot>
    </div>
    <div class="card-body">
      <input class="custom-input" type="range" min="0" :max="maxValue" :value="value"
        @input="$emit('input', $event.target.value)">
      <div class="text-center">{{ value + ' ' + metric }}</div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    value: {
      default: 0
    },
    type: {
      type: String,
      required: true
    },
    metric: {
      type: String,
      required: true
    }
  },
  fetch() {
    const max = this.$store.getters.getProducts.reduce((max, product) => {
      return (product[this.type] > max[this.type]) ? product : max;
    });
    this.maxValue = max[this.type];
  },
  data() {
    return {
      maxValue: null,
    }
  },
}
</script>

<style scoped>
.custom-input {
  width: 100%;
}

.card-body {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

input[type="range"] {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(#343a40, #343a40);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #A5075C;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #A5075C;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #A5075C;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #A5075C;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #A5075C;
}

input[type="range"]::-ms-thumb:hover {
  background: #A5075C;
}

/* Input Track */
input[type=range]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type=range]::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
