import TaskNode from '../components/nodes/TaskNode';
import ParallelTasksGroup from '../components/nodes/ParallelTasksGroup';
import SequentialTasksGroup from '../components/nodes/SequentialTasksGroup';
import IndependentTasksGroup from '../components/nodes/IndependentTasksGroup';
import AggregatorNode from '../components/nodes/AggregatorNode';

// Define node types mapping
export const nodeTypes = {
  task: TaskNode,
  parallel: ParallelTasksGroup,
  sequential: SequentialTasksGroup,
  independent: IndependentTasksGroup,
  merge: AggregatorNode,
};

// Function to get label for node type
export const getLabelForType = (type) => {
  switch (type) {
    case 'task':
      return 'Task';
    case 'parallel':
      return 'Parallel Tasks';
    case 'sequential':
      return 'Sequential Tasks';
    case 'independent':
      return 'Independent Tasks';
    case 'merge':
      return 'Aggregator';
    default:
      return `${type} node`;
  }
};