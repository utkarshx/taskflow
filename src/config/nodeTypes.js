import TaskNode from '../components/nodes/TaskNode';
import ParallelTasksGroup from '../components/nodes/ParallelTasksGroup';
import SequentialTasksGroup from '../components/nodes/SequentialTasksGroup';
import IndependentTasksGroup from '../components/nodes/IndependentTasksGroup';
import AggregatorNode from '../components/nodes/AggregatorNode';
import TodoListNode from '../components/nodes/TodoListNode';
import MessageBusNode from '../components/nodes/MessageBusNode';
import TaskExecutionNode from '../components/nodes/TaskExecutionNode';
import IfConditionNode from '../components/nodes/IfConditionNode';

// Define node types mapping
export const nodeTypes = {
  task: TaskNode,
  parallel: ParallelTasksGroup,
  sequential: SequentialTasksGroup,
  independent: IndependentTasksGroup,
  merge: AggregatorNode,
  todolist: TodoListNode,
  messagebus: MessageBusNode,
  loop: TaskExecutionNode,
  ifcondition: IfConditionNode,
};

// Function to get label for node type
export const getLabelForType = (type) => {
  switch (type) {
    case 'task':
      return 'Task';
    case 'parallel':
      return 'Parallel Task';
    case 'sequential':
      return 'Sequential Tasks';
    case 'independent':
      return 'Independent Tasks';
    case 'merge':
      return 'Aggregator';
    case 'todolist':
      return 'Todo List';
    case 'messagebus':
      return 'Message Bus';
    case 'loop':
      return 'Loop';
    case 'ifcondition':
      return 'If Condition';
    default:
      return `${type} node`;
  }
};