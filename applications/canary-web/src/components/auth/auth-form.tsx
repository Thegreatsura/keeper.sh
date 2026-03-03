import { useEffect, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { Provider } from "jotai/react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { authFormStatusAtom, authFormErrorAtom, type AuthFormStatus } from "../../state/auth-form";
import { Button, LinkButton, ExternalLinkButton, ButtonText, ButtonIcon } from "../ui/button";
import { Divider } from "../ui/divider";
import { Heading2 } from "../ui/heading";
import { Input } from "../ui/input";
import { Text } from "../ui/text";

export type AuthScreenCopy = {
  heading: string;
  subtitle: string;
  oauthActionLabel: string;
  submitLabel: string;
  switchPrompt: string;
  switchCta: string;
  switchTo: "/login" | "/register";
};

type SocialAuthProvider = {
  id: string;
  label: string;
  href: "/auth/google" | "/auth/outlook";
  iconSrc: string;
};

const AUTH_ERROR_MESSAGE = "Invalid email or password. Please try again.";

const SOCIAL_AUTH_PROVIDERS: readonly SocialAuthProvider[] = [
  { id: "google", label: "Google", href: "/auth/google", iconSrc: "/integrations/icon-google.svg" },
  { id: "outlook", label: "Outlook", href: "/auth/outlook", iconSrc: "/integrations/icon-outlook.svg" },
];

const submitTextVariants: Record<AuthFormStatus, Variants[string]> = {
  idle: { opacity: 1, filter: "none", y: 0, scale: 1 },
  loading: { opacity: 0, filter: "blur(2px)", y: -2, scale: 0.75 },
};

const backButtonVariants: Variants = {
  hidden: { width: 0, opacity: 0, filter: "blur(2px)" },
  visible: { width: "auto", opacity: 1, filter: "blur(0px)" },
};

export function AuthForm({ copy }: { copy: AuthScreenCopy }) {
  return (
    <Provider>
      <div className="flex flex-col py-2">
        <Heading2 as="span" className="text-center">{copy.heading}</Heading2>
        <Text size="sm" tone="muted" align="center">{copy.subtitle}</Text>
      </div>
      <SocialAuthButtons oauthActionLabel={copy.oauthActionLabel} />
      <Divider>or</Divider>
      <EmailForm submitLabel={copy.submitLabel} />
      <Text size="sm" tone="muted" align="center">
        {copy.switchPrompt}{" "}
        <Link to={copy.switchTo} className="text-foreground underline underline-offset-2 hover:text-foreground-muted transition-colors">
          {copy.switchCta}
        </Link>
      </Text>
    </Provider>
  );
}

function SocialAuthButtons({ oauthActionLabel }: { oauthActionLabel: string }) {
  return (
    <>
      {SOCIAL_AUTH_PROVIDERS.map((provider) => (
        <ExternalLinkButton key={provider.id} href={provider.href} className="w-full justify-center" variant="border">
          <ButtonIcon>
            <img src={provider.iconSrc} alt="" width={16} height={16} />
          </ButtonIcon>
          <ButtonText>{`${oauthActionLabel} with ${provider.label}`}</ButtonText>
        </ExternalLinkButton>
      ))}
    </>
  );
}

function EmailForm({ submitLabel }: { submitLabel: string }) {
  const setStatus = useSetAtom(authFormStatusAtom);
  const setError = useSetAtom(authFormErrorAtom);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("idle");
      setError({ message: AUTH_ERROR_MESSAGE, active: true });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <AuthErrorToast />
      <EmailInput />
      <div className="flex items-stretch">
        <BackButton />
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}

function AuthErrorToast() {
  const error = useAtomValue(authFormErrorAtom);
  const setError = useSetAtom(authFormErrorAtom);

  useEffect(() => {
    if (!error?.active) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setError({ ...error, active: false });
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [error, setError]);

  return (
    <AnimatePresence initial={false}>
      {error?.active && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
        >
          <div
            aria-live="polite"
            className="pointer-events-auto w-fit max-w-sm rounded-xl border border-red-500/40 bg-background px-4 py-2.5 shadow-xs"
            role="status"
          >
            <Text size="sm" tone="default" align="center" className="text-red-500 dark:text-red-400">
              {error.message}
            </Text>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmailInput() {
  const status = useAtomValue(authFormStatusAtom);
  const error = useAtomValue(authFormErrorAtom);
  const setError = useSetAtom(authFormErrorAtom);

  const handleChange = () => {
    if (error?.active) {
      setError({ ...error, active: false });
    }
  };

  return (
    <Input
      id="email"
      name="email"
      disabled={status === "loading"}
      type="email"
      placeholder="johndoe+keeper@example.com"
      tone={error?.active ? "error" : "neutral"}
      onChange={handleChange}
    />
  );
}

function BackButton() {
  const status = useAtomValue(authFormStatusAtom);

  return (
    <AnimatePresence initial={false}>
      {status !== "loading" && (
        <motion.div
          className="flex items-stretch"
          variants={backButtonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ width: { duration: 0.24 }, opacity: { duration: 0.12 } }}
        >
          <LinkButton to="/" variant="border" className="self-stretch justify-center mr-2">
            <ButtonIcon>
              <ArrowLeft size={16} />
            </ButtonIcon>
          </LinkButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SubmitButton({ children }: { children: string }) {
  const status = useAtomValue(authFormStatusAtom);

  return (
    <motion.div className="grow" layout>
      <Button disabled={status === "loading"} type="submit" className="relative w-full justify-center">
        <motion.span
          className="origin-top font-medium"
          variants={submitTextVariants}
          animate={status}
          transition={{ duration: 0.16 }}
        >
          {children}
        </motion.span>
        <AnimatePresence>
          {status === "loading" && (
            <motion.span
              className="absolute inset-0 m-auto size-fit origin-bottom"
              initial={{ opacity: 0, filter: "blur(2px)", y: 2, scale: 0.25 }}
              animate={{ opacity: 1, filter: "none", y: 0, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(2px)", y: 2, scale: 0.25 }}
              transition={{ duration: 0.16 }}
            >
              <LoaderCircle className="animate-spin" size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
