<template>
  <div class="grid">
    <div>
      <button @click="userState.show = true">Create New User</button>
      <UsersList />
      <Modal v-if="userState.show">
        <UserForm />
      </Modal>
    </div>
    <div>
      <button @click="bookState.show = true">Create New Book</button>
      <BooksList />
      <Modal v-if="bookState.show">
        <BookForm />
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserForm from "./components/User/UserForm.vue";
import UsersList from "./components/User/UsersList.vue";
import Modal from "./components/Modal.vue";
import BookForm from "./components/Book/BookForm.vue";
import BooksList from "./components/Book/BooksList.vue";

import { useUser } from "./composables/useUser";
import { useBook } from "./composables/useBook";

const { userState } = useUser();
const { bookState } = useBook();
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding-inline: 4rem;
}
</style>
./components/Book/BookForm.vue./components/Book/BooksList.vue./components/User/UserForm.vue./components/User/UsersList.vue
