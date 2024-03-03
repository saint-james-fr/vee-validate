<template>
  <form @submit.prevent="sendForm">
    <label>
      <span>Author</span>
      <input name="author" v-model="author" type="text" :disabled="read" />
      <div class="error">{{ errors.author }}</div>
    </label>
    <label>
      <span>Title</span>
      <input name="title" v-model="title" type="text" :disabled="read" />
      <div class="error">{{ errors.title }}</div>
    </label>
    <label>
      <label>
        <span>Year</span>
        <input name="year" v-model="year" type="date" :disabled="read" />
        <div class="error">{{ errors.year }}</div>
      </label>
      <span>Genre</span>
      <select v-model="genre">
        <option
          v-for="genre in genres"
          :key="genre"
          :value="genre"
        >
          {{ genre }}
        </option>
      </select>
      {{ genre }}

      <div class="error">{{ errors.author }}</div>
    </label>
    <label>
      <span>User</span>
      <select v-model="user_id">
        <option v-for="user in userState.users" :key="user.id" :value="user.id">
          {{ user.email }}
        </option>
      </select>
    </label>

    <button role="submit" :disabled="read">Submit</button>
    <button @click="bookState.show = false">Cancel</button>
    <button v-if="bookState.selected" @click="destroy(bookState.selected.id)">
      Delete
    </button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { bookFormSchema } from "../utils/zod";
import { useBook } from "../composables/useBook";
import { useUser } from "../composables/useUser";
import { scrollToError } from "../utils/form";
import { genres } from "../values";

type Props = {
  read?: boolean;
};
defineProps<Props>();

const { upsert, bookState, destroy } = useBook();
const { userState } = useUser();

// handleSubmit is our safe way to submit the form
// errors to show the errors in the form
// meta to check if the form is valid
// setvalues to set the values of the form if we want to edit
const { handleSubmit, errors, setValues } = useForm({
  validationSchema: bookFormSchema,
});

// This is where the binding happens
const { value: author } = useField<Book["author"]>("author");
const { value: year } = useField<Book["year"]>("year");
const { value: title } = useField<Book["title"]>("title");
const { value: genre } = useField<Book["genre"]>("genre");
const { value: user_id } = useField<Book["user_id"]>("user_id");

// Method to trigger a save in the db
const sendForm = handleSubmit(
  (values) => {
    const validYear = values.year.slice(0, 4);
    upsert({ ...values, year: validYear });
    bookState.show = false;
  },
  ({ errors }) => {
    console.log(errors);
    scrollToError(errors);
  }
);

// At load, charge existings values if exists
onMounted(() => {
  if (bookState.selected) {
    setValues(bookState.selected);
  }
});

// When the component is unmounted, we clean the selected user
onBeforeUnmount(() => {
  bookState.selected = undefined;
});

// Watch for changes in the selected user
watch(
  () => bookState.selected,
  (selected) => {
    if (!selected) return;
    setValues(selected);
  }
);
</script>
