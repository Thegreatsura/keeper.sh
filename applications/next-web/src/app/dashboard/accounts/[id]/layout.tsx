import type { FC, PropsWithChildren } from "react";

export const generateStaticParams = () => [{ id: "1" }];

const AccountDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default AccountDetailLayout;
