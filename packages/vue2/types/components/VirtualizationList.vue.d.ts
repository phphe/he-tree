import { Vue } from "vue-property-decorator";
import { obj } from "../types";
export default class VirtualizationList extends Vue {
    readonly items: obj[];
    readonly enabled: boolean;
    readonly buffer: number;
    readonly minItemHeight: number;
    readonly prerender: number;
    readonly listTag: string;
    readonly itemClass: string;
    start: number;
    end: number;
    top: number;
    bottom: number;
    itemsHeight: number[];
    data(): {
        mountedPromise: Promise<unknown>;
    };
    mountedPromise: Promise<unknown>;
    private _mountedPromise_resolve;
    get visibleItems(): {
        item: obj;
        index: number;
    }[];
    update(): void;
    private _waitingUpdate?;
    created(): void;
    mounted(): void;
}
