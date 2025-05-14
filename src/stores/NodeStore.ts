import { parseMimXml } from "../utils/xmlParser";
import { makeAutoObservable, runInAction } from "mobx";
import type { Node } from "../types";

class NodeStore {
    nodes: Node[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async loadNodes(url: string, limit?: number) {
        runInAction(() => {
            this.isLoading = true;
            this.error = null;
        });
        try {
            const response = await fetch(url);
            const xml = await response.text();

            let parsedNodes = await parseMimXml(xml);
            if (limit !== undefined) {
                parsedNodes = parsedNodes.slice(0, limit);
            }
            runInAction(() => {
                this.nodes = parsedNodes;
                this.error = null;
            });
        } catch (err) {
            runInAction(() => {
                this.error = "Ошибка загрузки данных";
                console.error("Error loading nodes:", err);
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
}

export default new NodeStore();