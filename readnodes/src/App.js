import './App.css';
import  { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

      this.state = {
        nodeIds: []
      }
    }

    componentDidMount() {

      // API call to get node ids
      fetch('https://nodes-on-nodes-challenge.herokuapp.com/nodes/089ef556-dfff-4ff2-9733-654645be56fe')
      .then((response) => response.json())
      .then((nodes) => {

        // Store API result in the local state
        const result = [];
        nodes.forEach((node) => {
          result.push(node.id);
          result.push(...node.child_node_ids);
        })
        this.setState({ nodeIds : result});
      });
    }

    getUniqueIdCount = () => {

      // Calculate count of each node to find out number of unique nodes
      let idCount = {};
      let totalUniqueNodes = 0;
      this.state.nodeIds.forEach((nodeId, index) => { 
        if (idCount[nodeId]) {
          // Count is +1 when we see the Id more than once
            idCount[nodeId] +=1
        } else {
          // Count is 1 when we see the Id for the first time
          idCount[nodeId] =1
        }
       });
       for (let id in idCount){
           // Id is unique when the count is 1
           if (idCount[id] === 1){
            totalUniqueNodes++;
           }
       }

       return totalUniqueNodes;
    }

    getMostCommonNodeId = () => {
      let idCount = {};
      this.state.nodeIds.forEach((nodeId) => { 
        if (idCount[nodeId]) {
            // Count is +1 when we see the Id more than once
            idCount[nodeId] +=1
        } else {
          // Id is unique when the count is 1
          idCount[nodeId] =1
        }
       });

       let max_count = 0;
       let result = '';
       for (let count in idCount){
           // We get the final result when the count > max_count
           if (idCount[count] > max_count) {
             result = count;
           }
          // update max_count to store the max_count
           max_count = Math.max(max_count, count);
       }

       return result;
    }

    render() {

      return (
        <div>
          <div className='display'> {'The total number of unique node IDs: ' + this.getUniqueIdCount()} </div>
          <div className='display'> {'The most common node ID: ' + this.getMostCommonNodeId()} </div>
        </div>
      );
    }
}

export default App;
