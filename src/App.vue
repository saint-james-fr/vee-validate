<template>
  <UsersList />
  <Modal v-if="state.show">
    <Form />
  </Modal>
  <button @click="state.show = true">Create New</button>
</template>

<script setup lang="ts">
import Form from "./components/Form.vue";
import Modal from "./components/Modal.vue";
import UsersList from "./components/UsersList.vue";
import { useUser } from "./composables/useUser";

const { state } = useUser();
</script>
