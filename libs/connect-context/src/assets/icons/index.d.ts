// Module declarations for icon asset imports local to connect-context
// Ensures TypeScript understands imported SVG/PNG modules in this lib.
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}
