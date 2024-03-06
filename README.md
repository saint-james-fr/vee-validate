# POC : Form Validation / Reactivity / Composability

## How to?

Start by checking UserForm, then BookForm which an even better implementation.
Have a look at the composables holding state - here with a reactive.

As we don't have a DB, i hold the reactive state as the db itself for the sake of simplicity.
But this is just another layer.

## VeeValidate with Zod

Main points:

- best UX for forms : scrollTo, Error Message, Disabled + Native HTML Errors, native Form, label and input binding
- schema validation externalized, errormessages at the same place
- state

## reactive "contextual" state

Seems a good idea that State should be linked to a model in a reactive state scoped to a context - a page.

## Crud

Crud operations belong to utils/db and should not be tied to reactive values. They're independent ATOMIC asynchronous operations.

- create a new one from scratch
- read aka show in table
- update by selecting an item in a row
- delete from list or modal

## Conclusion

- State can be contextual and does not have to be global.
- Validation does not belong to their representation in form but to models.
- Composables do not haveto deal with DB operations.
