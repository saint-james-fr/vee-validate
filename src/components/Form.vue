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
    <button role="submit" :disabled="read || !meta.valid">Submit</button>
    <button @click="state.show = false">Cancel</button>
    <button v-if="state.selected" @click="destroy(state.selected.id)">
      Delete
    </button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { formSchema } from "../utils/zod";
import { useUser } from "../composables/useUser";
import { scrollToError } from "../utils/form";

type Props = {
  read?: boolean;
};
defineProps<Props>();

const { upsert, state, destroy } = useUser();
const emit = defineEmits(["onCreate"]);

// handleSubmit is our safe way to submit the form
// errors to show the errors in the form
// meta to check if the form is valid
// setvalues to set the values of the form if we want to edit
const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema: formSchema,
});

// This is where the binding happens
const { value: email } = useField<User["email"]>("email");
const { value: password } = useField<User["password"]>("password");

// Method to trigger a save in the db
const sendForm = handleSubmit(
  (values) => {
    upsert({ ...values });
    state.show = false;
  },
  ({ errors }) => scrollToError(errors)
);

// At load, charg values selected if exists
onMounted(() => {
  if (state.selected) {
    setValues(state.selected);
  }
});

onBeforeUnmount(() => {
  state.selected = undefined;
});

// Watch for changes in the selected user
watch(
  () => state.selected,
  (selected) => {
    if (!selected) return;
    setValues(selected);
  }
);
</script>
