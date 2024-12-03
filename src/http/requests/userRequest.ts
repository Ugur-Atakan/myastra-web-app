import {axiosInstance} from '..';
import { BirthChartUpdateRequest } from '../../types/birthChart';
import {UserInterface} from '../../types/user';

const getUserData = async (): Promise<UserInterface> => {
  try {
    const repsonse = await axiosInstance.post('/user/me');
    return repsonse.data;
  } catch (error: any) {
    throw error;
  }
};



const updateUserAstrologicalData = async (data: BirthChartUpdateRequest) => {
  try {
    const response = await axiosInstance.put('/user/astrological-data', data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export {getUserData,updateUserAstrologicalData};