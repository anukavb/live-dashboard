import "./Comments.css";

import useStore from "../store/useStore";

export default function Comments() {

    const comments = useStore(s => s.comments);

    return (

        <div className="comments">

            <h3>

                Recent Comments

            </h3>

            {

                comments.map(comment => (

                    <div

                        className="comment"

                        key={comment.id}

                    >

                        <div

                            className="avatar"

                            style={{

                                background: comment.color

                            }}

                        >

                            {comment.author[0]}

                        </div>

                        <div>

                            <strong>

                                {comment.author}

                            </strong>

                            <p>

                                {comment.text}

                            </p>

                            <small>

                                {comment.time}

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    )

}