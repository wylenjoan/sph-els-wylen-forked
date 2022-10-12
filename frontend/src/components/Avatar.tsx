interface Props {
  avatarUrl?: string,
  className?: string,
}

function Avatar(props: Props) {
  const { avatarUrl, className } = props;

  return (
    <div className={`${className} avatar-container`}>
      {
        avatarUrl
          ? (<img src={avatarUrl} alt="avatar" className={className} />)
          : 'Add Avatar URL'
      }
    </div>
  )
}

export default Avatar
