import Dialogs from './Dialogs';
import {sendMessageCreator} from '../../redux/dialogs-reducer'; 
import {connect} from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}
let mapDispatchToProps =  {
  sendMessage: sendMessageCreator
}

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);


export default DialogsContainer;