import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { postComment } from '../services/CallerAPI'
const CommentComponent = () => {
    const conferenceId = useParams();
    const [comments, setComments] = useState({
        comment: '',
        title: ''
    })
    const { comment, title } = comments

    const inputComment = name => e => {
        setComments({ ...comments, [name]: e.target.value })
    }
    const fetchComment = (e) => {
        e.preventDefault();
        postComment(conferenceId, comment, title)
    }
    return (
        <form onSubmit={fetchComment}>
            <div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">ชื่อเรื่อง</label>
                    <input type="text" className="form-control" onChange={inputComment('title')} value={title} id="title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="textarea1" className="form-label">ปัญหา / ความคิดเห็น</label>
                    <textarea className="form-control" id="textarea1" rows="13" onChange={inputComment('comment')} value={comment} required></textarea>
                </div>
                <button type='submit' className='btn btn-success m-1' id="joinBtn">บันทึกความคิดเห็น</button>
            </div>
        </form>
    )
}

export default CommentComponent