import React from 'react';
import { useParams } from 'react-router-dom';
import useGetComments from '../hooks/getComments'; 
import CommentItem from './commentItem'; 

const CommentList = () => {
    const {id} = useParams()
    const { isLoading, data, isError, error } = useGetComments(id);
  
  console.log('Data from API:', data); 
  console.log('Data.data.comments:', data?.data?.comments); 

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return <div>Error loading comments: {error.message}</div>;
  }


  const comments = data?.data?.comments || [];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
      <div className="bg-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
      </div>
      {comments.length > 0 ? (
        comments.map((commentData) => (
          <CommentItem
            key={commentData.id}
            firstName={commentData.firstName}
            lastName={commentData.lastName}
            comment={commentData.comment}

           
          />
        ))
      ) : (
        <div className="p-4 text-gray-600">No comments yet.</div>
      )}
    </div>
  );
};

export default CommentList;
