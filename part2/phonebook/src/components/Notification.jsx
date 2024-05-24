const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    // <div className='success'>
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification