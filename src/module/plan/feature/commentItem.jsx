import React from 'react';
import PropTypes from 'prop-types';

const CommentItem = ({ firstName, lastName, comment }) => {
  return (
    <div className="flex flex-col p-4 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-700">{firstName} {lastName}</span>

      </div>
      <p className="text-gray-800 mt-2">Comment: {comment}</p>

    </div>
  );
};

CommentItem.propTypes = {
    firstName: PropTypes.isRequired,
    lastName  : PropTypes.isRequired,
     comment : PropTypes.isRequired,


  };
export default CommentItem;
