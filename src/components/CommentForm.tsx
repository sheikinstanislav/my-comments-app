import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../features/comments/commentsSlice';
import { Comment } from '../features/comments/types';

const CommentForm: React.FC = () => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const savedComment = localStorage.getItem('commentText');
    if (savedComment) {
      setCommentText(savedComment);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('commentText', commentText);
  }, [commentText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      id: Date.now(),
      body: commentText,
      user: { id: 1, username: 'User', fullName: 'User Name' },
    };
    dispatch(addComment(newComment));
    setCommentText('');
    localStorage.removeItem('commentText');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <textarea
        className="p-2 mb-2 rounded-md"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Ваш коментар"
        required
      />
      <button type="submit">Додати коментар</button>
    </form>
  );
};

export default CommentForm;
