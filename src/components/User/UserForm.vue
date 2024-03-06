<template>
  <form @submit.prevent="sendForm">
    <label>
      <span>Email*</span>
      <input name="email" v-model="email" type="email" :disabled="read" />
      <div class="error">{{ errors.email }}</div>
    </label>
    <label>
      Password*
      <input
        name="password"
        v-model="password"
        type="password"
        :disabled="read"
      />
      <div class="error">{{ errors.password }}</div>
    </label>
    <button role="submit">Submit</button>
    <button
      v-if="userState.selected"
      @click="destroy(userState.selected, userState, 'users')"
    >
      Delete
    </button>
    <button @click="userState.show = false">Cancel</button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { userFormSchema } from "../../utils/schema";
import { useUser } from "../../composables/useUser";
import { scrollToError } from "../../utils/form";
import { upsert, destroy } from "../../utils/db";

// OK what's going on here?
// We use Vee-validate to validate the form
// We use Zod to validate the schema
// We use the useUser composable to handle the state and the crud operations
// We don't use input components, you'lls see that in the next snippet: BooksForm.vue

type Props = {
  read?: boolean;
};
defineProps<Props>();

const { userState } = useUser();

// 1. handleSubmit is our safe way to submit the form and validate it

// errors to show the errors in the form
// meta to get the status of the form in many ways: like if it's dirty, touched, valid...
// setvalues help us to set default or fetched Values in case it's an update
const { handleSubmit, errors, setValues } = useForm({
  validationSchema: userFormSchema,
});

// 2. This is where the binding happens
// This is the code we'll avoid in the BooksForm using input components
const { value: email } = useField<User["email"]>("email");
const { value: password } = useField<User["password"]>("password");

// Cla ssic, our try catch stuff to sentd the forms
const sendForm = handleSubmit(
  (values) => {
    upsert(values, userState, "users");
    userState.show = false;
  },
  ({ errors }) => {
    console.error(errors);
    scrollToError(errors);
  }
);

// At load, charge existings values if exists
onMounted(() => {
  if (userState.selected) {
    setValues(userState.selected);
  }
});

// When the component is unmounted, we clean the selected user
onBeforeUnmount(() => {
  userState.selected = undefined;
});

// Watch for changes in the selected user
watch(
  () => userState.selected,
  (selected) => {
    if (!selected) return;
    setValues(selected);
  }
);
</script>
