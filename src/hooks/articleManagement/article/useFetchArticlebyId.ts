import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setLoading } from '../../../context/features/appSlice';
import { getArticlebyId } from '../../../api/articleManagement';
import { ArticleData } from '../../../types/articleManagement.type';

const useFetchArticlebyId = (id:string | undefined) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<ArticleData | null>(null);
  
  useEffect(() => {
    const fetchArticlebyId = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getArticlebyId(id) 
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchArticlebyId();
  }, [dispatch, id]);

  return userData;
};

export default useFetchArticlebyId;
