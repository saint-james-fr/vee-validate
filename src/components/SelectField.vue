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
import { defineProps } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
  label: string;
  options: string[];
}>();

const { value, errorMessage } = useField(() => props.name);
</script>
