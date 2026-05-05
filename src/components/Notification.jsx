const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, type } = notification
  const className = type === 'error' ? 'error' : 'success'

  return <div className={className}>{message}</div>
}

export default Notification
