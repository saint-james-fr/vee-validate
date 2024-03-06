<template>
  <label>
    <span>{{ label }}</span>
    <select v-model="value" v-bind="$attrs">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <div class="error">{{ errorMessage }}</div>
  </label>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  options: string[];
  default?: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField(() => props.name);

onMounted(() => {
  if (props.default === undefined) return;
  value.value = props.default;
});
</script>
