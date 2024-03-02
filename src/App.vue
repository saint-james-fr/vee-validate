<template>
  <UsersList />
  <Modal v-if="state.show">
    <Form @on-create="state.show = false" />
  </Modal>
  <button @click="state.show = true">Create New</button>
</template>

<script setup lang="ts">
import Form from "./Form.vue";
import Modal from "./Modal.vue";
import UsersList from "./UsersList.vue";
import { useLogin } from "./composables/useLogin";

const { state } = useLogin();
</script>
