import Dialogs from './Dialogs'
import { dialogsActions } from '../../redux/dialogs-reducer'
import { connect } from 'react-redux'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
  dialogsPage: {
    messagesData: Array<{ id: number; message: string }>
    dialogsData: Array<{ id: number; name: string }>
  }
}
type MapDispatchPropsType = {
  sendMessage: (newMessageBody: string) => void
}
type OwnPropsType = {}
// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  }
}
const mapDispatchToProps: MapDispatchPropsType = {
  sendMessage: dialogsActions.sendMessageCreator,
}

const DialogsContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthRedirect,
)(Dialogs)

export default DialogsContainer
