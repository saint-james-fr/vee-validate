<template>
  <div>
    <h1>Books</h1>
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Year</th>
          <th>Title</th>
          <th>Genre</th>
          <th>User</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="book in bookState.books"
          :key="book.id"
          @click="
            bookState.selected = book;
            bookState.show = true;
          "
        >
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.genre }}</td>
          <td>
            {{ book.user_id }}
          </td>
          <td>
            <button @click.stop="destroy(book.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useBook } from "../composables/useBook";
import { useUser } from "../composables/useUser";

const { bookState, destroy } = useBook();
const { userState } = useUser();
</script>
