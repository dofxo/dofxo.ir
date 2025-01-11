import { Helmet } from "react-helmet-async";

const TitleAdder = (WrappedComponent: any, title: string) => {
  return (props: any) => {
    return (
      <>
        <Helmet>
          <title>{title} | 76015233</title>
        </Helmet>
        <WrappedComponent {...props} />{" "}
      </>
    );
  };
};

export default TitleAdder;
