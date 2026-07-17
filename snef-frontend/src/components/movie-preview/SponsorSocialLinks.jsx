const socialIconLabels = {
  facebook: {
    label: 'Facebook',
    shortLabel: 'f',
  },
  x: {
    label: 'X',
    shortLabel: 'X',
  },
  linkedin: {
    label: 'LinkedIn',
    shortLabel: 'in',
  },
};

export default function SponsorSocialLinks({ socialLinks = {} }) {
  const entries = Object.entries(socialLinks).filter(([, href]) => Boolean(href));

  if (entries.length === 0) {
    return null;
  }

  return (
    <div
      className="sponsor-social-links flex items-center gap-2"
      aria-label="Redes sociales del sponsor"
    >
      {entries.map(([network, href]) => {
        const icon = socialIconLabels[network] ?? {
          label: network,
          shortLabel: network.slice(0, 2),
        };

        return (
          <a
            key={network}
            href={href}
            aria-label={icon.label}
            className="
              inline-flex h-8 w-8 items-center justify-center rounded-[6px]
              border border-white/10 bg-[#111111]/90 text-xs font-semibold
              text-white no-underline backdrop-blur-sm
              transition-all duration-300 ease-out
              hover:-translate-y-0.5 hover:border-[#22ADE4]/60 hover:bg-white/10
              hover:text-white hover:no-underline
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-[#22ADE4]
            "
            onClick={href === '#' ? (event) => event.preventDefault() : undefined}
          >
            {icon.shortLabel}
          </a>
        );
      })}
    </div>
  );
}
