import { makeAutoObservable } from "mobx";
import nodeStore from "./NodeStore";
import type { Horizon } from "../types";

class HorizonStore {
    activeHorizonZ: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get horizons(): Horizon[] {
        return nodeStore.horizons;
    }

    setActiveHorizon(z: number | null) {
        this.activeHorizonZ = z;
    }

    get activeHorizonNodes() {
        if (!this.activeHorizonZ) return [];
        const activeHorizon = this.horizons.find(h => h.zLevel === this.activeHorizonZ);
        return activeHorizon?.nodes || [];
    }
}

export default new HorizonStore();