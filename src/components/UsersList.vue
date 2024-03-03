<template>
  <div class="">
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in userState.users"
          :key="user.id"
          @click="
            userState.selected = user;
            userState.show = true;
          "
        >
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>
            <button @click.stop="destroy(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "../composables/useUser";

const { userState, destroy } = useUser();
</script>
