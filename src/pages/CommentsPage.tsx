import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchComments } from '../features/comments/commentsSlice';
import CommentList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';

const CommentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Типізуйте dispatch
  const { comments, loading, error } = useSelector(
    (state: RootState) => state.comments
  );

  useEffect(() => {
    if (comments.length === 0) {
      dispatch(fetchComments());
    }
  }, [dispatch, comments.length]);

  return (
    <div className="mx-auto w-full flex justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Список коментарів</h1>
        {loading && <p>Завантаження...</p>}
        {error && <p>Помилка: {error}</p>}
        <CommentList comments={comments} />
        <CommentForm />
      </div>
    </div>
  );
};

export default CommentsPage;
