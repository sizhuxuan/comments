// 导入react
import React from 'react'

//创建评论子组件
function CommentItem({ id, name, content, delComment }) {
  const delItem = () => {
    delComment(id)
  }
  const liStyle = {
    h3: {
      backgroundColor: 'pink'
    },
    p: {
      color: '#daa520'
    }
  }
  return (
    <li>
      <h3 style={liStyle.h3}>评论人:{name}</h3>
      <p style={liStyle.p}>评论内容:{content}</p>
      <button onClick={delItem}>删除</button>
    </li>
  )
}

// 导出评论列表子组件
export default CommentItem
