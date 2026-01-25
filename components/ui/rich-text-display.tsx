import { cn } from "@/lib/utils";

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

const RichTextDisplay = ({ content, className }: RichTextDisplayProps) => {
  return (
    <div
      className={cn(
        "prose prose-stone dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary hover:prose-a:underline",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichTextDisplay;
