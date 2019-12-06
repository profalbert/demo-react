import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm, reset} from 'redux-form';
import {Textarea} from '../../common/FormControls/FormControls';
import {required, maxLengthCreator, withoutSpace} from '../../../utils/validators/validators';


const maxLengthCreator10 = maxLengthCreator(10);

const AddPostNewForm = (props) => {
  return (
    <form className={s.formMyPosts} onSubmit={props.handleSubmit}>
      <div>
        <Field name={"newPostText"}
               className={s.formMyPostsField} 
               component={Textarea} 
               validate={[required, maxLengthCreator10, withoutSpace]}
               placeholder={"Post message"}
               individerror={"onSubmit"}
               cols="30" rows="2"/>
      </div> 
      <div>
        <button className={s.formMyPostsButton}>Add post</button>
      </div>        
    </form>
  );
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('ProfileAddPostNewForm'));
  
const MyPostsReduxForm = reduxForm({
  form: 'ProfileAddPostNewForm',
  onSubmitSuccess: afterSubmit,
})(AddPostNewForm);


const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map(p => 
    <Post key={p.id} message={p.message} likesCount={p.likesCount}/> 
  );

  let onAddPost = (values) => {
    (!!values.newPostText) && props.addPost(values.newPostText);
  }

  return (
     <div className={s.postsBlock}>
       <h3>My posts</h3>
       <MyPostsReduxForm onSubmit={onAddPost}/>

       <div className={s.posts}>
         { postsElements.reverse() }
       </div>
     </div>        
  );
});


// class MyPosts extends React.PureComponent {
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   return nextProps !== this.props || nextState !== this.state;
//   // }

//   // // let newPostElement = React.createRef();
//   // // let onAddPost = () => {
//   // //   props.addPost();
//   // // }

//   // // let onPostChange = () => {
//   // //   let text = newPostElement.current.value;
//   // //   props.updateNewPostText(text);
//   // // }

//   render() {
//     let postsElements = this.props.posts.map( p => 
//       <Post message={p.message} likesCount={p.likesCount}/> 
//     );
//     let onAddPost = (values) => {
//       this.props.addPost(values.newPostText);
//     }
  
//     return (
//        <div className={s.postsBlock}>
//          <h3>My posts</h3>
//          <MyPostsReduxForm onSubmit={onAddPost}/>
  
//          <div className={s.posts}>
//            { postsElements.reverse() }
//          </div>
//        </div>        
//     );
//   }
// }


export default MyPosts;


