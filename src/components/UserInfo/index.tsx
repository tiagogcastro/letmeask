import './styles.scss';

type UserInfoProps = {
  avatar?: string;
  name?: string;
}

export function UserInfo(props: UserInfoProps) {
  return (
    <div className="user-info">
      {props.avatar ? (
        <img src={props.avatar} alt={props.name ?? ''} />
      ) : (
        <span className="avatar-fallback" aria-hidden="true">
          {props.name?.charAt(0).toUpperCase() ?? '?'}
        </span>
      )}
      <span>{props.name}</span>
    </div>
  )
}
