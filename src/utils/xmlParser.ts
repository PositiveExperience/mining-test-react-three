export interface ParsedNode {
    id: string;
    x: number;
    y: number;
    z: number;
}

export const parseMimXml = async (xmlData: string): Promise<ParsedNode[]> => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
        console.error("XML parsing error:", parserError.textContent);
        throw new Error("Failed to parse XML data");
    }

    const nodes: ParsedNode[] = [];
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

    return nodes;
};