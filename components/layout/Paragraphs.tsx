// Content modules separate paragraphs with a blank line ("\n\n"); this
// renders each as its own <p> instead of collapsing them into one block.
export function Paragraphs({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split("\n\n").map((paragraph, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={i} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
