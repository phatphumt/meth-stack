export default function Link({
  href,
  children,
}: {
  children: Html.PropsWithChildren | Element | string;
  href: string;
}) {
  return (
    <a href={href} hx-target="body">
      {children}
    </a>
  );
}
