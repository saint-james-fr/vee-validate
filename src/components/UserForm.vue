<template>
  <form @submit.prevent="sendForm">
    <label>
      <span>Email</span>
      <input name="email" v-model="email" type="email" :disabled="read" />
      <div class="error">{{ errors.email }}</div>
    </label>
    <label>
      Password
      <input
        name="password"
        v-model="password"
        type="password"
        :disabled="read"
      />
      <div class="error">{{ errors.password }}</div>
    </label>
    <button role="submit">Submit</button>
    <button v-if="userState.selected" @click="destroy(userState.selected.id)">
      Delete
    </button>
    <button @click="userState.show = false">Cancel</button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { userFormSchema } from "../utils/zod";
import { useUser } from "../composables/useUser";
import { scrollToError } from "../utils/form";

type Props = {
  read?: boolean;
};
defineProps<Props>();

const { upsert, userState, destroy } = useUser();

// handleSubmit is our safe way to submit the form
// errors to show the errors in the form
// meta to check if the form is valid
// setvalues to set the values of the form if we want to edit
const { handleSubmit, errors, setValues } = useForm({
  validationSchema: userFormSchema,
});

// This is where the binding happens
const { value: email } = useField<User["email"]>("email");
const { value: password } = useField<User["password"]>("password");

// Method to trigger a save in the db
const sendForm = handleSubmit(
  (values) => {
    upsert({ ...values });
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
