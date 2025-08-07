import { useQuery } from '@tanstack/react-query';
import { getStaticProgramExerciseList } from '@/apis/standardProgram';

export const useStandardProgramStaticExercise = () => {
  return useQuery({
    queryKey: ['standardProgramStaticExercise'],
    queryFn: getStaticProgramExerciseList,
  });
};
