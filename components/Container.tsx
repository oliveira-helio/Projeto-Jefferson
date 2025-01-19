interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
  max-w-[1440px]
  mx-auto
  xl:px-14
  md:px-6
  w-full
  "
    >
      {children}
    </div>
  );
};

export default Container;
