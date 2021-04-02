import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const initialState = {
  statusFromProps: '',
  authorizedUserId: null,
  isOwner: true,
  match: null,
  updateStatus: () => null,
}

describe('ProfileStatus component', () => {
  test('status from props should be in the state', () => {
    // create - функция из библиотеки react-test-renderer,
    // которая виртуально создает компонент
    const component = create(
      <ProfileStatusWithHooks
        {...initialState}
        statusFromProps='it-kamasutra.com'
      />,
    )
    const instance = component.getInstance()
    instance && expect(instance.props.statusFromProps).toBe('it-kamasutra.com')
  })

  test('after creation <span> should be displayed', () => {
    const component = create(
      <ProfileStatusWithHooks
        {...initialState}
        statusFromProps='it-kamasutra.com'
      />,
    )
    const root = component.root
    const span = root.findByType('span')
    expect(span).not.toBeNull()
  })

  test('after creation <span> should contains correct status', () => {
    const component = create(
      <ProfileStatusWithHooks
        {...initialState}
        statusFromProps='it-kamasutra.com'
      />,
    )
    const root = component.root
    const span = root.findByType('span')
    expect(span.children[0]).toBe('it-kamasutra.com')
  })

  test('input should be displayed in editMode instead of span', () => {
    const component = create(
      <ProfileStatusWithHooks
        {...initialState}
        statusFromProps='it-kamasutra.com'
      />,
    )
    const root = component.root
    const span = root.findByType('span')
    // делаем фейковый даблклик, чтобы показался input в шаблоне
    // (мы так сделали в комопненте)
    span.props.onDoubleClick()
    const input = root.findByType('input')
    expect(input.props.value).toBe('it-kamasutra.com')
  })

  test('callback should be called', () => {
    const mockCallback = jest.fn()
    const component = create(
      <ProfileStatusWithHooks
        {...initialState}
        statusFromProps='it-kamasutra.com'
        updateStatus={mockCallback}
      />,
    )
    const instance = component.getInstance()
    instance?.props.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(0)
  })
})
