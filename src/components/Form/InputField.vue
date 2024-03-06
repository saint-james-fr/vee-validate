<template>
  <label>
    <span>{{ label }}</span>
    <input v-model="value" v-bind="$attrs" />
    <div class="error">{{ errorMessage }}</div>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField(() => props.name);
</script>
