import HackRPILink from "./hackrpi-link";

export default function RegistrationLink({ className }: { className?: string }) {
  return (
    <HackRPILink
      href="https://events.mlh.io/events/12668-hackrpi-2025"
      className={`${className} inline-block px-4 py-2`}
      target="_blank"
    >
      <span className="shift:hidden block">Register Here!</span>
      <span className="shift:block hidden">Register!</span>
    </HackRPILink>
  );
}
