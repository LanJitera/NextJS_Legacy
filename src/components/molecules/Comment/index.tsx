import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import styles from "./styles.module.css";
import { DefaultPageProps } from "@interfaces/page";
type ComponentMoleculeProp = DefaultPageProps & {
  comment?: string;
};
function CommentCommon(props: ComponentMoleculeProp): JSX.Element {
  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Space>
      </div>
      <div className={styles.comment_body}>
        <div className={styles.User}>
          <div>ten</div>
          <div>thoi gian tao</div>
        </div>
        <div className={styles.ContentComment}>noi dung hien thi</div>
      </div>
    </div>
  );
}

export default CommentCommon;
