import { useState, useEffect } from 'react';
import avator from '../assets/avator.png';
import formatDate from '../utils/formatDate';

const Comment = ({ comment, commentObject }) => {
    const [datePosted, setDatePosted] = useState({value: '', unit: ''});

    useEffect(() => {
        formatDate(commentObject, setDatePosted);
    }, [])

    return (
        <div className="w-full py-4 m-2 flex flex-col items-start">
            <div className='flex items-center'>
                <img src={avator} alt="avator" className='max-w-10 rounded-full m-2' />
                <span>• {datePosted.value} {datePosted.unit} •</span>
            </div>

            <span className='m-2'>- {comment}</span>
        </div>
    )
}

export default Comment;