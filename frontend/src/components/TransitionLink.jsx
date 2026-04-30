"use client";
import { usePageTransition } from "../context/TransitionContext";

export default function TransitionLink({
  href,
  children,
  className,
  style,
  ...rest
}) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e) => {
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </a>
  );
}
