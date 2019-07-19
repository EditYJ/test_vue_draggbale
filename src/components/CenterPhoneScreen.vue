<template>
  <div class="center-phone-screen">
    <draggable
      element="ul"
      :list="basicComponents"
      :options="{group:{ name:'people', pull:'clone',put:true},sort:true, ghostClass: 'ghost'}"
      @end="handleMoveEnd"
      @start="handleMoveStart"
      @add="handleAddEvent"
      :move="handleMove"
    >
      <li v-for="(item, index) in basicComponents" :key="index">
        <a>
          <img width="450px" :src="item.src" alt="展位图" srcset />
        </a>
      </li>
    </draggable>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  components: {
    Draggable
  },
  props: ["data", "select"],
  data() {
    return {
      selectWidget: this.select
    };
  },
  methods:{
    handleMoveEnd(evt) {
      console.log("end", evt);
    },
    handleMoveStart({ oldIndex }) {
      console.log("start", oldIndex, this.basicComponents);
    },
    handleAddEvent(evt){
      console.log("end", evt);
    },
    handleMove() {
      return true;
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true
    }
  }
};
</script>

<style>
@import "../style/cover_el.scss";
@import "../style/index.scss";
</style>
