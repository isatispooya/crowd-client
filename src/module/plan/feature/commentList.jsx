import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import useGetComments from '../hooks/getComments';
import CommentItem from './commentItem';

const CommentList = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useGetComments(id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading comments: {error.message}</div>;
  }

  const comments = data?.data?.comments || [];

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="bg-gradient-to-r from-[#004ff9] to-[#000000] p-6">
        <h2 className="text-4xl font-semibold text-white">نظرات کاربران</h2>
      </div>
      <div className="p-8 space-y-6">
        {comments.length > 0 ? (
          comments.map((commentData) => (
            <CommentItem
              key={commentData.id}
              firstName={commentData.firstName}
              lastName={commentData.lastName}
              comment={commentData.comment}
              known={commentData.known}
            />
          ))
        ) : (
          <div className="p-4 text-xl text-gray-600">کامنتی موجود نیست</div>
        )}
      </div>
    </div>
  );
  
};

export default CommentList;
