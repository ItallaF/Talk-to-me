import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMessage = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="#FFFFFF"
    viewBox="0 0 458 458"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M428 41.534H30c-16.569 0-30 13.431-30 30v252c0 16.568 13.432 30 30 30h132.1l43.942 52.243a30 30 0 0 0 45.918 0l43.942-52.243H428c16.568 0 30-13.432 30-30v-252c0-16.569-13.432-30-30-30m-104.084 240H82.854c-8.284 0-15-6.716-15-15s6.716-15 15-15h241.062c8.284 0 15 6.716 15 15s-6.716 15-15 15M67.854 198.755c0-8.284 6.716-15 15-15h185.103c8.284 0 15 6.716 15 15s-6.716 15-15 15H82.854c-8.284 0-15-6.716-15-15m307.292-52.781H82.854c-8.284 0-15-6.716-15-15s6.716-15 15-15h292.291c8.284 0 15 6.716 15 15 .001 8.284-6.715 15-14.999 15" />
  </svg>
);
export default SvgMessage;
