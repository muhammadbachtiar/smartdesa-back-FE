import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setLoading } from '../../context/features/appSlice';
import { getCategorybyId } from '../../api/articleManagement';
import { CategoryData } from '../../types/articleManagement.type';

const useFetchCategorybyId = (id:string | undefined) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<CategoryData | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getCategorybyId(id)
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, id]);

  return userData;
};

export default useFetchCategorybyId;
