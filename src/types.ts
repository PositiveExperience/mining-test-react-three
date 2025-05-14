export interface Node {
    id: string;
    x: number;
    y: number;
    z: number;
}

export interface Horizon {
    zLevel: number;
    nodes: Node[];
    isVisible: boolean;
}

export interface Section {
    id: string;
    startNodeId: string;
    endNodeId: string;
    isHighlighted: boolean;
}

import nodeStore from './stores/NodeStore';
import horizonStore from './stores/HorizonStore';
import uiStore from './stores/UIStore';

export interface RootStoreType {
    nodeStore: typeof nodeStore;
    horizonStore: typeof horizonStore;
    uiStore: typeof uiStore;
}