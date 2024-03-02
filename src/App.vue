<template>
  <Form />
</template>

<script setup lang="ts">
import Form from "./Form.vue";
import { useLogin } from "./composables/useLogin";
import { onMounted, ref } from "vue";

const { select } = useLogin();
const id = "1";
const fetched = ref<LoginData>();

onMounted(async () => {
  const result = await select(id);
  fetched.value = result;
});
</script>
