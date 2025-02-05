import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setNextNodeId } from '../slices/Builder/Nodes/slice';

export const useNextNodeId = () => {
  const dispatch = useDispatch();
  const nextNodeId = useSelector((state: RootState) => state.builder.nodes.nextNodeId);

  const getNextId = () => {
    const currentId = nextNodeId;
    dispatch(setNextNodeId(nextNodeId + 1));
    return currentId;
  };

  return getNextId;
};
