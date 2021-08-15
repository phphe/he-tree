import { Vue } from "vue-property-decorator";
import { obj } from "../types";
export default class VirtualizationList extends Vue {
    readonly items: obj[];
    readonly enabled: boolean;
    readonly buffer: number;
    readonly minItemHeight: number;
    readonly prerender: number;
    readonly listTag: string;
    readonly listClass: string;
    readonly itemClass: string;
    readonly gap: number;
    readonly afterCalcTop2: (top2: number) => number;
    start: number;
    end: number;
    top: number;
    bottom: number;
    totalHeight: number | null;
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
    onEnabledChange(): void;
    getItemElHeight(el: HTMLElement): number;
    update(): void;
    private _waitingUpdate?;
    created(): void;
    mounted(): void;
}
