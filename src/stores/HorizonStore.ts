import { makeAutoObservable } from "mobx";
import nodeStore from "./NodeStore";
import type { Horizon, Node } from "../types";

class HorizonStore {
    activeHorizonZ: number | null = null;
    private _groupStep = 10;

    constructor() {
        makeAutoObservable(this);
    }

    get horizons(): Horizon[] {
        const groups: { [zKey: string]: Horizon } = {};

        nodeStore.nodes.forEach(node => {
            const zKey = Math.round(node.z / this._groupStep) * this._groupStep;
            if (!groups[zKey]) {
                groups[zKey] = {
                    zLevel: zKey,
                    nodes: [],
                    isVisible: true
                };
            }
            groups[zKey].nodes.push(node);
        });

        return Object.values(groups);
    }

    setActiveHorizon(z: number | null) {
        this.activeHorizonZ = z;
    }

    get activeHorizonNodes(): Node[] {
        if (!this.activeHorizonZ) return [];
        return this.horizons.find(h => h.zLevel === this.activeHorizonZ)?.nodes || [];
    }
}

export default new HorizonStore();