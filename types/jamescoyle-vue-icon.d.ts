declare module '@jamescoyle/vue-icon' {
    import { DefineComponent } from 'vue';
    interface IconProps {
        path: string
        name?: string;
        size?: number | string;
        color?: string;
    }
    const component: DefineComponent<IconProps, {}, any>;
    export default component;
}