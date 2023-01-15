const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={(error ? "error" : "added") + " notification"}>
            {message}
        </div>
    )
}

export default Notification