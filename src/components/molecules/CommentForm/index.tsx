import React, { useState } from "react";
import styles from "./styles.module.css";
import { DefaultPageProps } from "@interfaces/page";

type CommentFormMoleculeProp = DefaultPageProps & {
  title?: string;
  handleAddComment?: () => void;
};

function CommentForm(props: CommentFormMoleculeProp): JSX.Element {
  const {
    title,
    handleComment,
    IdComment,
    IdCommentParen,
    handleCancel,
    InitContentComment,
    isCancel,
  } = props;

  const [text, setText] = useState(InitContentComment);
  const isTexttareaDisabled = text === "";
  const onSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn submit form mặc định
    handleComment(text, IdComment, IdCommentParen);
    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            cols="100"
            rows="2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="submit" disabled={isTexttareaDisabled}>
            {title}
          </button>
          {!isCancel && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CommentForm;
