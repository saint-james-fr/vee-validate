<template>
  <UsersList />
  <Modal v-if="userState.show">
    <Form />
  </Modal>
  <button @click="userState.show = true">Create New</button>
</template>

<script setup lang="ts">
import Form from "./components/Form.vue";
import Modal from "./components/Modal.vue";
import UsersList from "./components/UsersList.vue";
import { useUser } from "./composables/useUser";

const { userState } = useUser();
</script>
