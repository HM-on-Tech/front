class TreeNode {
    constructor(value) {
      this.children = [];
      Object.keys(value).forEach( (key) => {
        this[key] = value[key]
      })
    }
  }


export const makeHierarchy = (data, barcodes) => {
    const res = data.filter( (row) =>row.parentId == null).map((entity) => new TreeNode(entity));
    let stck = [...res]
    let len = stck.length

    let depth = 0
    while(len >0){
      depth += 1;
      len = stck.length;
      for(let i=0 ; i<len ; i += 1) {
        const element = stck.shift();
        const children =  data.filter((row) => row?.parentId === element?.id).map((entity) => new TreeNode(entity));
        element.children = [...children];
        element.depth = depth;
        element.active = false;
        element.barcode = barcodes.find((b) => b.id === element.barcode)?.string || 'N/A';
        stck = stck.concat( [...element.children]);
      }
    }
    const nodeHead = new TreeNode({head:'temp'});
    nodeHead.children = res;
    return nodeHead;
  }

/**
 * Since root need to be rendered in XGrid, root has to have active=true.
 * ( A node that has active=true value will be rendered in XGrid)
 * @param {motherTree} motherTree 
 */
export const parentNodeActivate = (motherTree) => {
    if (!motherTree) return {}

    const buildTree = motherTree
    buildTree.children = buildTree?.children?.map( (element) => {
      return {...element, active:true }
    })
    return {...buildTree}
  }

/** Helper function for TreeNodeToXGridData
   *
   * @param {motherTree} motherTree that is built when page is renderned
   * @param {activatedNodeList} activvate nodes are candidates that will be saved in the list
   * @param {depth} depth is is to express indent.
   */
 const TreeNodeToXGridDataHelper = (motherTree, activatedNodeList, depth) =>{
    for(let i =0; i <motherTree.children?.length; i += 1){
      if (motherTree.children[i].active){
        activatedNodeList.push({...motherTree.children[i], depth})
        TreeNodeToXGridDataHelper(motherTree.children[i], activatedNodeList, depth+1)
      }
    }
  }

/** By Iterating all tree node using Depth First Search
   *  find all activatedNode and save it. The Activated node will be
   *  saved as Object and will be rendered in XGrid table
   *
   * @param {motherTree} motherTree that is built when page is renderned
   *
   */
export const TreeNodeToXGridData = (motherTree) => {
    if(! motherTree) return [];
    const activatedNodeList = [];
    const depth = 1;

    for(let i = 0; i < motherTree.children?.length; i += 1){
      if(motherTree.children[i].active){
          activatedNodeList.push({...motherTree.children[i], depth})
        TreeNodeToXGridDataHelper(motherTree.children[i], activatedNodeList, depth + 1)
      }
    }

    return activatedNodeList
}
  //  From row information(row.id) => find node of the Tree's
  const findClickedNode = (id, motherTree) => {
    // element that has row's id 's children is activated.
    const treeHead = motherTree
    let stck = [...treeHead.children]
    let len = stck.length

    while (len >0){
      for (let i = 0; i < len; i += 1) {
        const element = stck.shift()
        if (element?.id === id){
          return element
        }
        stck = stck.concat([...element.children])
      }
      len = stck.length;
    }
    return null;
  }

/** Activat children's row
 *
 * @param {id} id : information that have an id
 * @param {motherTree} motherTree Tree structure that has all nodes info
 */
export const activateChildren = (id, motherTree) => {
    // Find the Clicked Node
    const findNode = findClickedNode(id, motherTree)
    findNode.children = findNode?.children?.map ((element) =>{
      return {...element, active:true}
    })
  }

/** Activate or Deactivavte children's row
   *
   * @param {row} row : information that have an id
   * @param {motherTree} motherTree Tree structure that has all nodes info
   */
export const counterActivateChildren = (id, motherTree) => {
    // Find the Clicked Node
    const findNode = findClickedNode(id, motherTree)
    findNode.children = findNode?.children?.map ((element) =>{
      const currentActiveStates = element.active
      return {...element, active: !currentActiveStates}
    })
  }