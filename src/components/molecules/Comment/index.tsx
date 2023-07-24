import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import styles from "./styles.module.css";
import { DefaultPageProps } from "@interfaces/page";
import dateFormat, { masks } from "dateformat";
import { boolean } from "yup";
import CommentForm from "../CommentForm";
type ComponentMoleculeProp = DefaultPageProps & {
  comment?: string;
  replies?: Comment[];
  handleDeleteComment?: () => void;
  id: number;
  id_cmtrep: number;
};

function CommentCommon(props: ComponentMoleculeProp): JSX.Element {
  const {
    comment,
    replies,
    dataComment,
    handleDeleteComment,
    UserID,
    setActiveComment,
    activeComment,
    handleReplyComment,
    handleEditComment,
    handleCancel,
  } = props;
  const now = new Date();
  const created_at = new Date(props.created_at);
  const diffInMinutes = Math.floor((now - created_at) / 60000);
  const diffInH = Math.floor(diffInMinutes / 60);
  const canEdit = props.user.id === UserID;
  const canDelete = props.user.id === UserID;
  const isReply =
    activeComment?.type === "Reply" && activeComment?.IdComment === props.id;
  const isEdit =
    activeComment?.type === "Edit" && activeComment?.IdComment === props.id;
  const getChildComments = (IdParent) => {
    return dataComment?.filter((item) => {
      return item.id_cmtrep === IdParent;
    });
    //  sort((a,b)=>  new Date(b.created_at).getTime() -new Date(a.created_at).getTime())
  };
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const UserList = ["U", "Lucy", "Tom", "Edward"];
  const GapList = [4, 3, 2, 1];
  const [color, setColor] = useState(ColorList[0]);
  const [user, setUser] = useState(UserList[0]);
  const [gap, setGap] = useState(GapList[0]);
  console.log(props.id);

  return (
    <div>
      <div className={styles.comment}>
        <div className={styles.avatar}>
          <>
            <Avatar
              style={{ backgroundColor: color, verticalAlign: "middle" }}
              size="large"
              gap={gap}
            >
              {user}
            </Avatar>
          </>
        </div>
        <div className={styles.comment_body}>
          <div className={styles.User}>
            <div className={styles.User_name}>{props.user.username}</div>
            <div className={styles.User_time}>
              {diffInMinutes < 60
                ? `${diffInMinutes} phút trước `
                : diffInH < 24
                ? `${diffInH} giờ trước`
                : dateFormat(props.created_at, "paddedShortDate")}
            </div>
          </div>
          {!isEdit && (
            <div>
              <div className={styles.ContentComment}>{props.comment}</div>
              <div className={styles.Comment_action}>
                <div
                  className={styles.Item_Comment_action}
                  onClick={() =>
                    activeComment
                      ? setActiveComment(null)
                      : setActiveComment({ type: "Reply", IdComment: props.id })
                  }
                >
                  Reply
                </div>
                {canEdit && (
                  <div
                    className={styles.Item_Comment_action}
                    onClick={() =>
                      activeComment
                        ? setActiveComment(null)
                        : setActiveComment({
                            type: "Edit",
                            IdComment: props.id,
                          })
                    }
                  >
                    edit
                  </div>
                )}
                {canDelete && (
                  <div
                    className={styles.Item_Comment_action}
                    onClick={() => handleDeleteComment(props.id)}
                  >
                    Delete
                  </div>
                )}
              </div>
            </div>
          )}
          {isEdit && (
            <CommentForm
              title="Edit"
              handleComment={handleEditComment}
              IdComment={activeComment.IdComment}
              IdCommentParen={props.id}
              InitContentComment={props.comment}
              handleCancel={handleCancel}
            />
          )}
          {replies?.length > 0 && (
            <div className={styles.ChildCommnet}>
              {replies
                ?.sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((item) => {
                  return (
                    <CommentCommon
                      key={item.id}
                      {...item}
                      dataComment={dataComment}
                      handleDeleteComment={handleDeleteComment}
                      replies={getChildComments(item.id)}
                      UserID={UserID}
                      setActiveComment={setActiveComment}
                      activeComment={activeComment}
                      handleReplyComment={handleReplyComment}
                      handleEditComment={handleEditComment}
                      handleCancel={handleCancel}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
      {isReply && (
        <CommentForm
          title="Reply"
          handleComment={handleReplyComment}
          IdComment={activeComment.IdComment}
        />
      )}
    </div>
  );
}

export default CommentCommon;
