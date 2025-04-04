import _ from 'lodash'
import React from 'react'
import { BaseModalProps } from '..'
import { Button } from '@mui/material'
import Flex from '@renderer/components/ui/Flex'

export interface ConfirmModalProps {
  message: string
}

export class ConfirmModal extends React.Component<BaseModalProps<ConfirmModalProps>> {
  componentDidMount(): void {
    console.log(this.props)
  }
  componentWillUnmount(): void {
    _.isFunction(this.props.onModalClose) && this.props.onModalClose(this.state)
  }
  handleConfirm = () => {
    _.isFunction(this.props.onModalConfirm) && this.props.onModalConfirm()
    _.isFunction(this.props.close) && this.props.close()
  }
  private getContent = () => {
    return (
      <Flex col gap={8}>
        <span>{this.props.payload?.message || 'Confirm?'}</span>
      </Flex>
    )
  }
  public render() {
    return (
      <Flex col>
        {this.getContent()}
        <Flex justify="flex-end" gap={8} mT={28}>
          <Button variant="outlined" color="secondary" onClick={this.props.close}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleConfirm}>
            Confirm
          </Button>
        </Flex>
      </Flex>
    )
  }
}
