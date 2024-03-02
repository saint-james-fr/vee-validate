<template>
  <div class="">
    <h1>Users</h1>
    <ul>
      <li
        v-for="user in state.users"
        :key="user.id"
        @click="
          state.selected = user;
          state.show = true;
        "
      >
        <div class="flex">
          <div>{{ user.email }}</div>
          <div>{{ user.password }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "../composables/useUser";

const { state } = useUser();
</script>

