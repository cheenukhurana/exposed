import { FindConnection } from '../covalent/AddrConnection'

class Graph {

    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }


    addVertex(v) {
        this.AdjList.set(v, []);
    }

    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }



    connectedComponents() {

        const V = this.noOfVertices
        let visited = new Map()

        for (const x of this.AdjList.keys()) {
            visited[x] = false
        }

        let arrayOfArrays = []
        let index = 0;

        for (const x of this.AdjList.keys()) {
            if (!visited[x]) {
                arrayOfArrays.push([])
                this.DFSUtil(x, visited, arrayOfArrays, index);
                index++
            }
        }

        return arrayOfArrays
    }

    DFSUtil(v, visited, arrayOfArrays, index) {

        visited[v] = true;
        arrayOfArrays[index].push(v)

        for (let x = 0; x < this.AdjList.get(v).length; x++) {
            if (!visited[this.AdjList.get(v)[x]])
                this.DFSUtil(this.AdjList.get(v)[x], visited, arrayOfArrays, index);
        }
    }
}

export const findConnectedComponents = async (addressArray) => {
    // Create Graph
    var g = new Graph(addressArray.length)
    for (let i = 0; i < addressArray.length; i++) {
        g.addVertex(addressArray[i])
    }

    for (let i = 0; i < addressArray.length - 1; i++) {
        for (let j = i + 1; j < addressArray.length; j++) {
            const connectionResponse = await FindConnection(addressArray[i], addressArray[j])
            if (connectionResponse.originIsConnected) {
                g.addEdge(addressArray[i], addressArray[j])
            }
        }
    }

    return g.connectedComponents()
}