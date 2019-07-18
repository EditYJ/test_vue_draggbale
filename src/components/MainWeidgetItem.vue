<template>
  <el-form-item
    class="widget-view"
    v-if="element && element.key"
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
    :label="element.name"
    @click.native="handleSelectWidget(index)"
  >
    <template v-if="element.type == 'input'">
      <el-input v-model="element.options.defaultValue" :style="{width: element.options.width}"></el-input>
    </template>

    <template v-if="element.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
      ></el-input>
    </template>
    <el-button
      title="删除"
      @click.stop="handleWidgetDelete(index)"
      class="widget-action-delete"
      v-if="selectWidget.key == element.key"
      circle
      plain
      type="danger"
    >
      <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
    </el-button>
    <el-button
      title="复制"
      @click.stop="handleWidgetClone(index)"
      class="widget-action-clone"
      v-if="selectWidget.key == element.key"
      circle
      plain
      type="primary"
    >
      <icon name="regular/clone" style="width: 12px;height: 12px;"></icon>
    </el-button>
  </el-form-item>
</template>

<script>
export default {
  props: ["element", "select", "index", "data"],
  data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleSelectWidget(index) {
      console.log(index, "#####");
      this.selectWidget = this.data.list[index];
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }
      this.$nextTick(() => {
        this.data.list.splice(index, 1);
      });
    },
    handleWidgetClone(index) {
      let cloneData = {
        ...this.data.list[index],
        options: { ...this.data.list[index].options },
        key: Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999)
      };
      this.data.list.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1];
      });
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
</style>
