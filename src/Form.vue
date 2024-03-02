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
import { useField, useForm } from "vee-validate";
import { formSchema } from "./utils/zod";
import { useLogin } from "./composables/useLogin";
import { scrollToError } from "./utils/form";
import { onMounted } from "vue";

type Props = {
  read?: boolean;
  id: string;
};
const props = defineProps<Props>();

const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema: formSchema,
});
const { select, insert } = useLogin();

// this is where the magic happens
const { value: email } = useField("email");
const { value: password } = useField("password");

// Get the composable to insert in the form

onMounted(async () => {
  if (props.read) {
    try {
      setValues(await select(props.id));
    } catch (error) {
      console.error(error);
    }
  }
});

const sendForm = handleSubmit(
  (values) => {
    insert(values);
  },
  ({ errors }) => scrollToError(errors)
);
</script>

<style scoped>
form {
  display: flex;
  align-items: space-between;
  flex-direction: column;
  gap: 40rem;
  width: min(100vw, 400px);
  margin: 0 auto;
}

label {
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 1rem;

  span {
    display: block;
  }

  div {
    position: absolute;
    bottom: -2rem;
    color: red;
  }

  input {
    width: 100%;
    flex-grow: 1;
    max-width: 300px;
  }
}
</style>
