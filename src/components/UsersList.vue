<template>
  <div class="">
    <h1>Users</h1>
    <ul>
      <li
        v-for="user in userState.users"
        :key="user.id"
        @click="
          userState.selected = user;
          userState.show = true;
        "
      >
        <div class="flex">
          <div>{{ user.email }}</div>
          <div>{{ user.password }}</div>
          <!-- delete -->
          <div @click.stop="destroy(user.id)">Delete</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "../composables/useUser";

const { userState, destroy } = useUser();
</script>
