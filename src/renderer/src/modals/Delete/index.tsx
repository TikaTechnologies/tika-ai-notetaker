import _ from 'lodash'
import React from 'react'
import { BaseModalProps } from '..'
import { Button } from '@mui/material'
import Flex from '@renderer/components/ui/Flex'

export interface DeleteModalProps {
  message?: string
}

export class DeleteModal extends React.Component<BaseModalProps<DeleteModalProps>> {
  componentDidMount(): void {
    console.log(this.props)
  }
  handleConfirm = () => {
    _.isFunction(this.props.onModalConfirm) && this.props.onModalConfirm()
    _.isFunction(this.props.close) && this.props.close()
  }
  public render() {
    return (
      <Flex col>
        <Flex justify="space-between" gap={8}>
          {this.props.payload?.message || 'Delete item?'}
        </Flex>
        <Flex justify="flex-end" gap={8} mT={18}>
          <Button variant="outlined" color="primary" onClick={this.props.close}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={this.handleConfirm}>
            Delete
          </Button>
        </Flex>
      </Flex>
    )
  }
}
