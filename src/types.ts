export interface Node {
    id: string;
    x: number;
    y: number;
    z: number;
}

export interface Section {
    id: string;
    name: string;
    startNodeId: string;
    endNodeId: string;
    isHighlighted: boolean;
}

export interface Working {
    id: string;
    name: string;
    sectionIds: string[];
    isVisible: boolean;
}

export interface Horizon {
    id: string;
    name: string;
    zLevel: number;
    workings: Working[];
    nodes: Node[];
    isVisible: boolean;
}

export interface MineData {
    nodes: Node[];
    sections: Section[];
    workings: Working[];
    horizons: Horizon[];
}

import nodeStore from './stores/NodeStore';
import horizonStore from './stores/HorizonStore';
import uiStore from './stores/UIStore';

export interface RootStoreType {
    nodeStore: typeof nodeStore;
    horizonStore: typeof horizonStore;
    uiStore: typeof uiStore;
}