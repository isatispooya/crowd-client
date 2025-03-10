import { useMutation } from '@tanstack/react-query';
import MembersInfo from '../services/membersInfo.services';

const useMembers = () => {
  return useMutation({
    mutationKey: ['membersInfo'],
    mutationFn: MembersInfo,
  });
};

export default useMembers;
