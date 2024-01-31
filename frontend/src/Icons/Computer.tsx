import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgComputer = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 72 51"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect width={72} height={51} fill="#4E4E4E" rx={10} />
    <path
      fill="#fff"
      d="M50.29 11H21.844A2.845 2.845 0 0 0 19 13.845v18.963a2.845 2.845 0 0 0 2.845 2.844h11.377l-.948 2.845h-4.266c-.789 0-1.423.634-1.423 1.422s.634 1.422 1.423 1.422h16.118c.788 0 1.423-.634 1.423-1.422s-.635-1.422-1.423-1.422H39.86l-.949-2.845H50.29a2.845 2.845 0 0 0 2.845-2.844V13.845A2.845 2.845 0 0 0 50.289 11m-.949 20.86H22.793V14.793H49.34z"
    />
  </svg>
);
export default SvgComputer;
