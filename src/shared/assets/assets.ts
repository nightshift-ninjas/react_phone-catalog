export const assets = import.meta.glob('/src/shared/assets/**/*', {
  eager: true,
  import: 'default',
});
