type SectionHeaderProps = {
  title: string;
  description: string;
};

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Trusted Circle</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
