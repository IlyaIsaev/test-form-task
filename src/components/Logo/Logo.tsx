import { memo, FC } from "react";
import Image from "next/image";

export interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => (
  <div className={className}>
    <Image
      className={className}
      src="/logo.png"
      alt="logo"
      width={151}
      height={68}
    />
  </div>
);

export default memo(Logo);
