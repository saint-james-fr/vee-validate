export const scrollToError = (errors: any) => {
  const firstError = Object.keys(errors)[0];
  const el: HTMLElement | null = document.querySelector(
    `[name="${firstError}"]`
  );
  if (!el) return;
  el.scrollIntoView({
    behavior: "smooth",
  });
  el.focus();
};
