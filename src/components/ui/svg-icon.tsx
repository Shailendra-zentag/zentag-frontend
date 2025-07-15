import React, { useMemo } from "react";
import { cn } from "../lib/utils";
import { getAssetPath } from "@/utils/assets";
import { SVGPath } from "@/utils/assets";

interface SVGIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: SVGPath;
  alt?: string;
  small?: boolean;
  className?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  className,
  src,
  alt = "",
  small = false,
  ...rest
}) => {
  const imageSrc = useMemo(() => getAssetPath(src), [src]);

  return (
    <img
      {...rest}
      className={cn(small ? "w-4 h-4" : "w-6 h-6", "object-contain", className)}
      src={imageSrc}
      loading="lazy"
      alt={alt || imageSrc}
    />
  );
};

export default SVGIcon;