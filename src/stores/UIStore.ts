import { makeAutoObservable } from "mobx";

class UIStore {
    selectedNodeId: string | null = null;
    displaySettings = {
        nodeSize: 10,
        sectionColor: "#00bfff",
        highlightColor: "#ff0000"
    };

    constructor() {
        makeAutoObservable(this);
    }

    selectNode(nodeId: string | null) {
        this.selectedNodeId = nodeId;
    }

    setDisplaySettings(settings: Partial<typeof this.displaySettings>) {
        this.displaySettings = { ...this.displaySettings, ...settings };
    }
}

export default new UIStore();