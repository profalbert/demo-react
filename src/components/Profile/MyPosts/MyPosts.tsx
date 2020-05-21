import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {reduxForm, reset, InjectedFormProps} from 'redux-form';
import {Textarea, createField} from '../../common/FormControls/FormControls';
import {required, maxLengthCreator, withoutSpace} from '../../../utils/validators/validators';
import { PostType, DispatchType } from '../../../types/types';


type PropsType = {
  posts: PostType[],
  addPost: (newPostText: string) => void
}


const MyPosts = React.memo<PropsType>((props) => {
  let postsElements = props.posts.map((p: PostType) => 
    <Post key={p.id} message={p.message} likesCount={p.likesCount}/> 
  );

  let onAddPost = (values: AddPostNewFormValuesType) => {
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



type AddPostNewFormValuesType = {
  newPostText: string
}
type AddPostNewFormValuesKeysType = Extract<keyof AddPostNewFormValuesType, string>
const maxLengthCreator10 = maxLengthCreator(10);

const AddPostNewForm: React.FC<InjectedFormProps<AddPostNewFormValuesType>> = ({handleSubmit}) => {
  return (
    <form className={s.formMyPosts} onSubmit={handleSubmit}>
      <div>
      {createField<AddPostNewFormValuesKeysType>("Post message", "newPostText", [required, maxLengthCreator10, withoutSpace], 
        Textarea, "text", {individerror: "onSubmit", className: s.formMyPostsField, cols: "30", rows: "2"})}
      </div> 
      <div>
        <button className={s.formMyPostsButton}>Add post</button>
      </div>        
    </form>
  );
}

const afterSubmit = (result: object, dispatch: DispatchType) =>
  dispatch(reset('ProfileAddPostNewForm'));
  
const MyPostsReduxForm = reduxForm<AddPostNewFormValuesType>({
  form: 'ProfileAddPostNewForm',
  onSubmitSuccess: afterSubmit,
})(AddPostNewForm);


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
//   // // }

//   render() {...}
// }


export default MyPosts;


