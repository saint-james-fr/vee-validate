<template>
  <label>
    <span>{{ label }}</span>
    <input v-model="value" v-bin="$attrs" />
    <div class="error">{{ errorMessage }}</div>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
  label: string;
}>();

const { value, errorMessage } = useField(() => props.name);
</script>
