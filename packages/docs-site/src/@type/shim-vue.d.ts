declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<defineComponent>;
  export default component;
}
