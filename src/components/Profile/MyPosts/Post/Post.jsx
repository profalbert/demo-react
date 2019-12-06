import React from 'react';
import s from './Post.module.css';
import postImg from '../../../../assets/postImg.webp';


const Post = (props) => {
  return (
   <div className={s.item}>
    <img src={postImg} alt="img"/>
     <div className={s.itemMessage}>{props.message}</div>
     <div>
       <span className={s.itemLikes}>likes:</span> {props.likesCount}
     </div>
   </div>       
  );
}


export default Post;