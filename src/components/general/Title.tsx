const Title = ({ title, icon }: { title: string; icon: any }) => {
  return (
    <h2 className="title">
      {icon}
      <span>{title}</span>
    </h2>
  );
};

export default Title;
