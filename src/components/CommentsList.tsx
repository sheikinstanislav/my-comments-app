import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeComment } from '../features/comments/commentsSlice';
import { Comment } from '../features/comments/types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const dispatch = useDispatch();
  const commentListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition && commentListRef.current) {
      commentListRef.current.scrollTo(0, parseInt(savedScrollPosition));
    }

    const handleScroll = () => {
      if (commentListRef.current) {
        localStorage.setItem(
          'scrollPosition',
          commentListRef.current.scrollTop.toString()
        );
      }
    };

    commentListRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      commentListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRemoveComment = (id: number) => {
    dispatch(removeComment(id));
  };

  return (
    <ul ref={commentListRef} className="max-h-96 overflow-y-auto">
      {comments.map((comment) => (
        <li key={comment.id} className="mb-2 p-2 rounded">
          <p>{comment.body}</p>
          <p className="text-sm text-gray-500">
            Автор: {comment.user.username}
          </p>
          <button
            className="text-red-500 hover:underline mt-2"
            onClick={() => handleRemoveComment(comment.id)}
          >
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
