import { useState, type SubmitEvent } from "react";
import { Upload } from "lucide-react";
import { BackButton } from "../ui/back-button";
import { Button, ButtonText } from "../ui/button";
import { Divider } from "../ui/divider";
import { Input } from "../ui/input";

export function ICSFeedForm() {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        id="feed-url"
        name="feed-url"
        type="url"
        placeholder="Calendar Feed URL"
      />
      <Divider />
      <div className="flex items-stretch gap-2">
        <BackButton variant="border" size="standard" className="self-stretch justify-center px-3.5" />
        <Button type="submit" className="grow justify-center">
          <ButtonText>Subscribe</ButtonText>
        </Button>
      </div>
    </form>
  );
}

export function ICSFileForm() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label
        htmlFor="ics-file"
        className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-interactive-border p-8 hover:cursor-pointer hover:bg-background-hover"
      >
        <Upload size={20} className="text-foreground-muted" />
        <p className="text-sm tracking-tight text-foreground-muted">
          {fileName ?? "Upload an ICS File"}
        </p>
        <input
          id="ics-file"
          name="ics-file"
          type="file"
          accept=".ics,.ical"
          className="sr-only"
          onChange={handleFileChange}
        />
      </label>
      <Divider />
      <div className="flex items-stretch gap-2">
        <BackButton variant="border" size="standard" className="self-stretch justify-center px-3.5" />
        <Button type="submit" className="grow justify-center">
          <ButtonText>Upload</ButtonText>
        </Button>
      </div>
    </form>
  );
}
