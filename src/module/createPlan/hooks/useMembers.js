import { useMutation } from '@tanstack/react-query';
import MembersInfo from '../services/membersInfo.services';

const useMembers = () => {
  return useMutation({
    mutationKey: ['membersInfo'],
    mutationFn: ({ data, memberId }) => MembersInfo(data, memberId),
  });
};

export default useMembers;
