# Proof of Concept: Form Validation, Reactivity, and Composability within Vue (Zod, VeeValidate, Reactive)

## How to Use

1. **UserForm:** Begin exploring with the `UserForm` component.
2. **BookForm:** Dive deeper into the `BookForm`, showcasing refined implementation techniques.
3. **Composables:** Examine the composables responsible for state management, leveraging reactive principles for seamless interaction.

While we don't utilize a traditional database, I've implemented reactive state as a simplified alternative. This choice prioritizes clarity and ease of understanding, but the system can be easily extended to integrate a database layer if needed.

## VeeValidate with Zod

### Key Features:

- Provides optimal User Experience (UX) for forms, including smooth scrolling, error message handling, disabled states, and native HTML error support.
- Externalizes schema validation, keeping error messages neatly organized.
- Harnesses the power of reactive state management.

## Reactive "Contextual" State

Introducing the concept of contextual state, where state is intricately linked to a specific model within a reactive state scoped to a defined context (e.g., a page). This approach enhances organization and simplifies state management.

## CRUD Operations

CRUD operations reside within the `utils/db` module, deliberately decoupled from reactive values for increased modularity and efficiency. These operations are atomic and asynchronous, ensuring reliability and scalability.

- **Create:** Generate new entries effortlessly.
- **Read:** Display entries within a table format for easy reference.
- **Update:** Seamlessly modify entries by selecting them from a row.
- **Delete:** Remove entries intuitively, either from a list or through a modal interface.

## Conclusion

- State management can be contextualized, eliminating the need for a global state and promoting cleaner architecture.
- Validation logic is properly abstracted from form representations and integrated with underlying models.
- Composables are designed to be agnostic of database operations, fostering greater flexibility and reusability.

## Inspirations

1. [Conceptual Model of State in Vue 3](https://itnext.io/a-conceptual-model-of-state-in-vue-3-4-9390c8e68aa5)
2. [Common Mistakes When Creating Composition Functions in Vue](https://www.telerik.com/blogs/common-mistakes-creating-composition-functions-vue)
