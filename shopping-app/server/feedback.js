const feedback = {};

const addToFeedback = ({username,rating,comment}) => {
  feedback[username] = feedback[username] || {};
  feedback[username] = {rating,comment};
  return;
};

module.exports = {
    addToFeedback
};