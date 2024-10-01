import React from 'react';
import PropTypes from 'prop-types';
import { RxAvatar } from 'react-icons/rx';

const CommentItem = ({ firstName, lastName, comment, known }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <div>
            <RxAvatar className='text-4xl' />{' '}
          </div>
        </div>
      </div>
      <div className="chat-bubble bg-gray-100">
        {known ? (
          <>
            <span className="font-bold text-blue-600">
              {firstName} {lastName}
            </span>
            : <span className='text-black'>{comment}</span>
          </>
        ) : (
          <>
            <span className="font-bold text-red-600">ناشناس</span>: <span className='text-black'>{comment}</span>
          </>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  firstName: PropTypes.isRequired,
  lastName: PropTypes.isRequired,
  comment: PropTypes.isRequired,
  known: PropTypes.isRequired,
};
export default CommentItem;
