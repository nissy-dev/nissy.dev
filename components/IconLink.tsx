import { JSX } from "preact";

type Props = {
  href: string;
  name: string;
  icon: JSX.Element;
};

export function IconLink(props: Props) {
  return (
    <a class="py-4 px-8 text-orange-500" href={props.href} title={props.name}>
      {props.icon}
      <span class="inline-block w-full py-2 text-center">{props.name}</span>
    </a>
  );
}
