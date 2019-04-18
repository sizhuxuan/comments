// 导入react
import React from 'react'
// 导入评论表单子组件
import CommentForm from './commentForm'
// 导入评论列表子组件
import CommentItem from './commentItem'

// 创建评论父组件
class Comment extends React.Component {
  // 典型地, 在 React 中构造函数只用于两个目的：
  //   1.初始化局部状态，通过赋值一个对象到this.state。
  //   2.绑定事件处理器方法到一个实例。
  // 如果你不初始化状态，也不绑定方法，那么你就不需要为React组件实现构造函数。
  // 在 constructor()中，你不能调用 setState() 。
  // 正确做法是，如果你的组件需要使用局部状态， 直接在构造函数中将初始状态赋值给this.state：
  // 构造函数是你唯一可以直接赋值this.state的地方。在其他所有方法中，你需要使用this.setState()来代替。
  constructor(props) {
    super(props)
    // 初始化数据
    this.state = {
      list: []
    }
    // 绑定事件处理程序中的this指向
    this.delHandle = this.delHandle.bind(this)
    this.addHandle = this.addHandle.bind(this)
  }
  //页面一加载就从本地获取数据
  componentDidMount() {
    console.warn('父组件', 'componentDidMount')
    //模拟Ajax获取数据
    setTimeout(() => {
      const list = JSON.parse(localStorage.getItem('comments')) || []
      this.setState({
        list
      })
    }, 3000)
  }

  //更新数据
  componentDidUpdate(prevState) {
    console.log('父组件', 'componentDidUpdate', this.state, prevState)
    localStorage.setItem('comments', JSON.stringify(this.state.list))
  }
  // 创建删除事件处理程序
  delHandle(id) {
    // console.log(e, id)
    const list = this.state.list.filter(item => item.id !== id)
    this.setState({
      list
    })
  }

  //创建添加事件处理程序
  addHandle(txtUser, txtContent) {
    // const id = this.state.list.length === 0 ? 1 : this.state.list[this.state.list.length-1].id + 1
    // 第一次使用上面写法导致后增的id总是为固定的,原来是我新加的放在了第一项,
    //导致取到的最后一项都是同一个数组id(找了好久, 气死)
    const id = this.state.list.length === 0 ? 1 : this.state.list[0].id + 1
    const list = [
      { id: id, name: txtUser, content: txtContent },
      ...this.state.list
    ]
    console.log(list)
    this.setState({
      list
    })
  }
  render() {
    const lis = this.state.list.map(item => {
      return <CommentItem key={item.id} {...item} delComment={this.delHandle} />
    })
    return (
      <div>
        <CommentForm addComment={this.addHandle} />
        <ul>{lis}</ul>
      </div>
    )
  }
}

export default Comment
