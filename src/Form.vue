<template>
  <form @submit.prevent="sendForm">
    <label>
      <span>Email</span>
      <input name="email" v-model="email" type="email" :disabled="read" />
      <div>{{ errors.email }}</div>
    </label>
    <label>
      Password
      <input
        name="password"
        v-model="password"
        type="password"
        :disabled="read"
      />
      <div>{{ errors.password }}</div>
    </label>
    <button role="submit" :disabled="read || !meta.valid">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useField, useForm } from "vee-validate";
import { formSchema } from "./utils/zod";
import { useLogin } from "./composables/useLogin";
import { scrollToError } from "./utils/form";

type Props = {
  data?: LoginData;
  read?: boolean;
};
const props = defineProps<Props>();

const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema: formSchema,
});
const { insert } = useLogin();

// this is where the magic happens
const { value: email } = useField<LoginData["email"]>("email");
const { value: password } = useField<LoginData["password"]>("password");

// If the form is in read mode, we assign the data to the form fields
if (props.data && props.read) {
  setValues(props.data);
}

// Methods
const sendForm = handleSubmit(
  (values) => {
    insert(values);
  },
  ({ errors }) => scrollToError(errors)
);
</script>
