<template>
  <form @submit.prevent="sendForm">
    <InputField name="author" type="text" label="Auteur*" />
    <InputField name="title" type="text" label="Titre*" />
    <InputField name="year" type="date" label="Date de publication*" />
    <SelectField name="genre" label="Genre*" :options="genres" />
    <SelectField
      name="user_email"
      label="User"
      :options="userState.users.map((user) => user.email)"
    />

    <button role="submit">Submit</button>
    <button @click="bookState.show = false">Cancel</button>
    <button
      v-if="bookState.selected"
      @click="destroy(bookState.selected, bookState, 'books')"
    >
      Delete
    </button>
  </form>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from "vue";
import { useForm } from "vee-validate";
import { bookFormSchema } from "../../utils/schema";
import { scrollToError } from "../../utils/form";
import { useBook } from "../../composables/useBook";
import { useUser } from "../../composables/useUser";
import { destroy, upsert } from "../../utils/db";
import { genres } from "../../values";
import InputField from "../Form/InputField.vue";
import SelectField from "../Form/SelectField.vue";

// How to organize the code in the setup function

// 1. import the composable functions, define the ref/state if needed + load state
const { bookState } = useBook();
const { userState } = useUser();

const { handleSubmit, setValues } = useForm({
  validationSchema: bookFormSchema,
});

// 2. continue with reactivy
watch(
  () => bookState.selected,
  (selected) => {
    if (!selected) return;
    setValues(selected);
  }
);

// 3. Lifecycle hooks
onMounted(() => {
  if (bookState.selected) {
    setValues(bookState.selected);
  }
});

onBeforeUnmount(() => {
  bookState.selected = undefined;
});

// 4. Methods
const getYear = (date: string) => {
  return date.slice(0, 4);
};

const sendForm = handleSubmit(
  (values) => {
    upsert({ ...values, year: getYear(values.year) }, bookState, "books");
    bookState.show = false;
  },
  ({ errors }) => {
    console.log(errors);
    scrollToError(errors);
  }
);
</script>