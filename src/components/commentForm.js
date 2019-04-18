//导入react
import React from 'react'

//创建评论表单组件
class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    //初始化状态(数据)
    this.state = {
      txtUser: '',
      txtContent: ''
    }
    //绑定sendComment的this指向
    this.sendComment = this.sendComment.bind(this)
  }
  //创建发送评论方法
  sendComment() {
    //由于进行了双向绑定(受控组件),所以可以直接获取表单的数据
    const { txtUser, txtContent } = this.state

    // 添加数据前,进行非空校验:
    if (txtUser.trim() === '' || txtContent.trim() === '') return

    // 在此处调用父组件中添加评论方法
    this.props.addComment(txtUser, txtContent)

    // 添加数据之后,清空文本框
    this.setState({
      txtUser: '',
      txtContent: ''
    })
  }
  render() {
    return (
      <div style={{ marginLeft: '30px' }}>
        <input
          type="text"
          value={this.state.txtUser}
          placeholder="请输入评论人"
          onChange={e => this.setState({ txtUser: e.target.value })}
        />
        <br />
        <br />
        <textarea
          cols="40"
          rows="10"
          value={this.state.txtContent}
          placeholder="请输入评论内容"
          onChange={e => this.setState({ txtContent: e.target.value })}
        />
        <br />
        <button onClick={this.sendComment}>发表评论</button>
      </div>
    )
  }
}

// 导出评论表单子组件
export default CommentForm
