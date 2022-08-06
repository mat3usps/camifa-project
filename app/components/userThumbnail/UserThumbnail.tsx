interface IUserThumbnailProps {
  name?: string;
  email: string;
}

const UserThumbnail = ({ name, email }: IUserThumbnailProps) => {
  return (
    <div tabIndex={0} className="avatar btn btn-ghost btn-circle bg-base-100">
      <div className="w-10 rounded-full">
        <div className="flex h-full items-center justify-center">
          {name ? getNameInitials(name) : getEmailInitials()}
        </div>
      </div>
    </div>
  );

  function getNameInitials(name: string) {
    const initials = name.split(" ").map((str) => str.charAt(0));
    return initials.slice(0, 2).join("").toUpperCase();
  }

  function getEmailInitials() {
    return email.slice(0, 3);
  }
};

export default UserThumbnail;
