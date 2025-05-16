import { parseMimXml } from "../utils/xmlParser";
import { makeAutoObservable, runInAction } from "mobx";
import type { Node, Section, Working, Horizon } from "../types";

class NodeStore {
    nodes: Node[] = [];
    sections: Section[] = [];
    workings: Working[] = [];
    horizons: Horizon[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async loadMineData(url: string) {
        runInAction(() => {
            this.isLoading = true;
            this.error = null;
        });
        try {
            const response = await fetch(url);
            const xml = await response.text();

            const mineData = await parseMimXml(xml);

            runInAction(() => {

                this.nodes = mineData.nodes;
                this.sections = mineData.sections;
                this.workings = mineData.workings;
                this.horizons = mineData.horizons;

                this.error = null;
            });
        } catch (err) {
            runInAction(() => {
                this.error = "Ошибка загрузки данных";
                console.error("Error loading mine data:", err);
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    getNodeById(id: string): Node | undefined {
        return this.nodes.find(node => node.id === id);
    }

    getSectionById(id: string): Section | undefined {
        return this.sections.find(section => section.id === id);
    }

    getWorkingById(id: string): Working | undefined {
        return this.workings.find(working => working.id === id);
    }

    getHorizonById(id: string): Horizon | undefined {
        return this.horizons.find(horizon => horizon.id === id);
    }
}

export default new NodeStore();