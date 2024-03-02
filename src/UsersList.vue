<template>
  <div>
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
        <span>{{ user.email }}</span> ••••
        <span>{{ user.password }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from "./composables/useLogin";

const { state } = useLogin();
</script>
