<template>
  <form @submit.prevent="sendForm">
    <InputField name="author" type="text" label="Auteur" />
    <InputField name="title" type="text" label="Titre" />
    <InputField name="year" type="date" label="Date de publication" />
    <SelectField name="genre" label="Genre" :options="genres" />
    <SelectField
      name="user_email"
      label="User"
      :options="userState.users.map((user) => user.email)"
    />

    <button role="submit">Submit</button>
    <button @click="bookState.show = false">Cancel</button>
    <button v-if="bookState.selected" @click="destroy(bookState.selected.id)">
      Delete
    </button>
  </form>
</template>

<script setup lang="ts">
import InputField from "./InputField.vue";
import SelectField from "./SelectField.vue";
import { onBeforeUnmount, onMounted, watch } from "vue";
import { useForm } from "vee-validate";
import { bookFormSchema } from "../utils/zod";
import { scrollToError } from "../utils/form";
import { useBook } from "../composables/useBook";
import { useUser } from "../composables/useUser";
import { genres } from "../values";

const { upsert, bookState, destroy } = useBook();
const { userState } = useUser();

// handleSubmit is our safe way to submit the form
// errors to show the errors in the form
// meta to check if the form is valid
// setvalues to set the values of the form if we want to edit
const { handleSubmit, setValues } = useForm({
  validationSchema: bookFormSchema,
});

// This is where the binding happens

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
