import { Node, Section, Working, Horizon, MineData } from '../types';

export const parseMimXml = async (xmlData: string): Promise<MineData> => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
        console.error("XML parsing error:", parserError.textContent);
        throw new Error("Failed to parse XML data");
    }

    const nodes: Node[] = [];
    const nodeElements = xmlDoc.querySelectorAll("Graph > Nodes > Node");
    nodeElements.forEach(nodeEl => {
        const idEl = nodeEl.querySelector("Id");
        const xEl = nodeEl.querySelector("X");
        const yEl = nodeEl.querySelector("Y");
        const zEl = nodeEl.querySelector("Z");

        if (idEl && xEl && yEl && zEl) {
            nodes.push({
                id: idEl.textContent || "",
                x: parseFloat(xEl.textContent || "0"),
                y: parseFloat(yEl.textContent || "0"),
                z: parseFloat(zEl.textContent || "0"),
            });
        }
    });

    const sections: Section[] = [];
    const sectionElements = xmlDoc.querySelectorAll("Sections > Section");

    sectionElements.forEach((sectionEl, index) => {
        const idEl = sectionEl.querySelector("Id");
        const nameEl = sectionEl.querySelector("Name");
        const startNodeEl = sectionEl.querySelector("StartNodeId");
        const endNodeEl = sectionEl.querySelector("EndNodeId");

        if (!idEl || !startNodeEl || !endNodeEl) {
            return;
        }

        sections.push({
            id: idEl.textContent || "",
            name: nameEl?.textContent || "",
            startNodeId: startNodeEl.textContent || "",
            endNodeId: endNodeEl.textContent || "",
            isHighlighted: false,
        });
    });

    const workings: Working[] = [];
    const workingElements = xmlDoc.querySelectorAll("Graph > Workings > Working");
    workingElements.forEach(workingEl => {
        const idEl = workingEl.querySelector("Id");
        const nameEl = workingEl.querySelector("Name");
        const sectionElements = workingEl.querySelectorAll("Sections > Section");

        if (idEl) {
            const sectionIds: string[] = [];
            sectionElements.forEach(sectionEl => {
                const sectionId = sectionEl.textContent;
                if (sectionId) sectionIds.push(sectionId);
            });

            workings.push({
                id: idEl.textContent || "",
                name: nameEl?.textContent || "",
                sectionIds,
                isVisible: true,
            });
        }
    });

    const horizons: Horizon[] = [];
    const horizonElements = xmlDoc.querySelectorAll("Graph > Horizons > Horizon");
    horizonElements.forEach(horizonEl => {
        const idEl = horizonEl.querySelector("Id");
        const nameEl = horizonEl.querySelector("Name");
        const altitudeEl = horizonEl.querySelector("Altitude");

        if (idEl && altitudeEl) {
            const zLevel = parseFloat(altitudeEl.textContent || "0");
            const tolerance = 1.0;

            const horizonNodes = nodes.filter(node =>
                Math.abs(node.z - zLevel) <= tolerance
            );

            const horizonSections = sections.filter(section => {
                const startNode = nodes.find(n => n.id === section.startNodeId);
                const endNode = nodes.find(n => n.id === section.endNodeId);
                return startNode && endNode &&
                    Math.abs(startNode.z - zLevel) <= tolerance &&
                    Math.abs(endNode.z - zLevel) <= tolerance;
            });

            const sectionIds = new Set(horizonSections.map(s => s.id));

            const horizonWorkings = workings
                .filter(working =>
                    working.sectionIds.some(sId => sectionIds.has(sId))
                )
                .map(working => ({
                    ...working,
                    sectionIds: working.sectionIds.filter(sId => sectionIds.has(sId))
                }));

            horizons.push({
                id: idEl.textContent || "",
                name: nameEl?.textContent || `Горизонт ${zLevel}`,
                zLevel: zLevel,
                workings: horizonWorkings,
                nodes: horizonNodes,
                isVisible: true,
            });
        }
    });

    return {
        nodes,
        sections,
        workings,
        horizons,
    };
};