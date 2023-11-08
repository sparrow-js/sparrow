import { FlowType, NodeType } from '../../types/flow';
import _, { set } from 'lodash';

export function serialNode(flow: FlowType) {
    console.log('*****0', flow);
    const curFlow = _.cloneDeep(flow);
    const { nodes, edges } = curFlow.data;
    const start = nodes.find((node) => node.data.type === 'PageChain');
    let currentId = start?.data.id;
    let chain: Array<{
      id: string;
      link?: any;
    }> = [{
      id: currentId,
    }];
    while (currentId) {
      const temp: any = {};
      // eslint-disable-next-line no-loop-func
      const edgeList = edges.filter((edge) => edge.target === currentId);
      // eslint-disable-next-line no-loop-func
      const node = nodes.find((node) => node.id === currentId);
      if (edgeList.length === 0) {
        currentId = 0;
      } else {
        const template = node?.data.node.template;
        // eslint-disable-next-line no-loop-func
        Object.keys(template).forEach((key) => {
          edgeList.forEach((edge) => {
            const { sourceHandle } = edge;
            if (sourceHandle?.includes(template[key].type)) {
              if (template[key].auxiliary) {
                const prevTemp = chain[chain.length - 1];
                if (!prevTemp.link) prevTemp.link = [];
                prevTemp.link.push({
                  id: edge.source,
                });
                if (edgeList.length === prevTemp.link.length) {
                  currentId = 0;
                }
              } else {
                currentId = edge.source;
                temp.id = edge.source;
              }
            }
          });
        });
        if (temp.id) chain.push(temp);
      }
    }
    return chain.reduce((prevValue, cur) => {
      const node = nodes.find((node) => node.id === cur.id);
      if (cur.link && node) {
        node.data.link = cur.link.reduce((prev, item) => {
          const curNode = nodes.find((node) => node.id === item.id);
          prev.push(curNode);
          return prev;
        }, []);
      }
      prevValue.push(node);
      return prevValue;
    }, []);
}