import type { SVGProps } from "react";

export function DuckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18.33,10.67a4,4,0,0,0-4.66-4.33,4,4,0,0,0-3.34,2A4,4,0,0,0,5,10.67a4.2,4.2,0,0,0,1,2.66,4,4,0,0,0,4.33,1,4,4,0,0,0,3.67-2.67,4.12,4.12,0,0,0,4.33-.66" />
      <path d="M7,14.33H5a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-2a2,2,0,0,0-2-2H17" />
      <path d="M12,6.33a1.33,1.33,0,1,0-1.33-1.33A1.33,1.33,0,0,0,12,6.33Z" />
    </svg>
  );
}
