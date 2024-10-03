import React from 'react';
import PropTypes from 'prop-types';
import { RxAvatar } from 'react-icons/rx';

const CommentItem = ({ firstName, lastName, comment, known, answer }) => {
  return (
    <div className="chat chat-start gap-8">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <div>
            <RxAvatar className="text-4xl" />{' '}
          </div>
        </div>
      </div>
      <div className="chat-bubble bg-gray-100">
        {known ? (
          <>
            <span className="font-bold text-blue-600">
              {firstName} {lastName}
            </span>
            : <span className="text-black">{comment}</span>
          </>
        ) : (
          <>
            <span className="font-bold text-blue-600">ناشناس</span>:{' '}
            <span className="text-black">{comment}</span>
          </>
        )}
      </div>
      <div className="chat-bubble bg-red-50 border-l-4  p-4 shadow-md">
        {known ? (
          <>
            <span className="font-bold text-red-600">پاسخ ادمین</span>:{' '}
            <span className="text-gray-800 font-medium italic">{answer}</span>
          </>
        ) : (
          <>
            <span className="font-bold text-red-600">پاسخ ادمین</span>:{' '}
            <span className="text-gray-800 font-medium italic">{answer}</span>
          </>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  known: PropTypes.bool.isRequired,
  answer: PropTypes.string.isRequired,
};

export default CommentItem;
