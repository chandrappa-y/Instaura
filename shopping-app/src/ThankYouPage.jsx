import React, { useState } from 'react';
import { sendReview } from './services';
import errors from './errors';

const ThankYouPage = ({ username }) => {
    const [comment, setComment] = useState();
    const [error, setError] = useState({ isSet: false });
    const [displayFeedBackForm, setDisplayFeedBackForm] = useState(true);

    const submitReview = (rating) => {
        if (!rating) {
            setError({
                isSet: true,
                message: errors['select_option']
            });
            return;
        }
        sendReview({ username, rating, comment })
            .then(() => {
                setError({
                    isSet: false,
                    message: ''
                });
                setDisplayFeedBackForm(false);
            })
            .catch((error) => setError({ isSet: true, message: errors[error.code || 'DEFAULT'] }));
    }

    return (
        <div className="page">
            <span className="errors">{error.message}</span>
            {displayFeedBackForm ? <h2> Thank you for shopping with us! </h2> : ''}
            {!displayFeedBackForm ? '' :
                <div>
                    <div className="feedback">
                        <h4>Tell us how you really feel.. We'll make it worth your while ;)</h4>
                    </div>
                    <div className="feedback-options">
                        <div>
                            <textarea className="text" onChange={(e) => setComment(e.target.value)} cols="35" rows="5" placeholder="Leave your comments"></textarea>
                        </div>
                        <button className="feedback-option" onClick={(e) => submitReview("okay")}>Works fine !</button>

                        <button className="feedback-option" onClick={(e) => submitReview("good")}>Loved It ♥ </button>

                        <button className="feedback-option" onClick={(e) => submitReview("bad")}>Nah! girl, you can do better</button>
                    </div>
                </div>
            }
            {!displayFeedBackForm ? <h2> Thank you for your valuable feedback. Have a great day! ♥</h2> : ''}
        </div>
    )
}

export default ThankYouPage;