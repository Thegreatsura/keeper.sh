"use client"

import type { FC, FormEvent, PropsWithChildren } from "react"
import { useState } from "react"
import { AnimationPlaybackControlsWithThen, LayoutGroup, motion, MotionConfigContext, MotionConfigProps, Variants } from "motion/react";
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { Button, LinkButton } from "@/components/button"
import { Input } from "@/components/input"
import { FlexRowGroup } from "@/components/flex-row-group"
import { formStateAtom, FormStateAtomValue } from "../atoms/form-state";
import { useAtomValue, useSetAtom } from "jotai";

const backButtonVariants: Record<'exit', Variants[string]> = {
  exit: {
    width: 0,
    opacity: 0,
    filter: 'blur(0.125rem)'
  }
}

const submitTextVariants: Record<FormStateAtomValue, Variants[string]> = {
  idle: {
    opacity: 1,
    filter: 'none',
    y: 0,
    scale: 1
  },
  loading: {
    opacity: 0,
    filter: 'blur(0.125rem)',
    y: -2,
    scale: 0.75
  }
}

const loaderVariants: Record<FormStateAtomValue, Variants[string]> = {
  idle: {
    opacity: 0,
    filter: 'blur(0.125rem)',
    y: 2,
    scale: 0.75
  },
  loading: {
    opacity: 1,
    filter: 'none',
    y: 0,
    scale: 1
  }
}

type EmailFormProps = {
  submitButtonText: string
}

const EmailFormBackButton = () => {
  const formState = useAtomValue(formStateAtom);

  return (
    <AnimatePresence>
      {formState === 'idle' && (
        <motion.div
          className="flex flex-col items-end"
          variants={backButtonVariants}
          exit="exit"
          transition={{ width: { duration: 0.24 }, opacity: { duration: 0.12 } }}
        >
          <LinkButton href="/playground" className="h-full px-3.5 mr-2" variant="border">
            <ArrowLeft size={17} />
          </LinkButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const EmailFormSubmitButton: FC<PropsWithChildren> = ({ children }) => {
  const formState = useAtomValue(formStateAtom);

  return (
    <motion.div className="grow">
      <Button disabled={formState === 'loading'} type="submit" className="relative w-full" variant="primary" size="normal">
        <motion.span
          className="origin-top"
          variants={submitTextVariants}
          animate={formState}
          transition={{ duration: 0.16 }}
        >
          {children}
        </motion.span>
        <motion.span
          className="absolute inset-0 m-auto size-fit origin-bottom"
          variants={loaderVariants}
          initial="idle"
          animate={formState}
          transition={{ delay: 0.08, duration: 0.16 }}
        >
          <LoaderCircle className="animate-spin" size={17} />
        </motion.span>
      </Button>
    </motion.div>
  )
}

const EmailFormInput = () => {
  const formState = useAtomValue(formStateAtom);

  return (
    <Input disabled={formState === 'loading'} type="email" placeholder="johndoe+keeper@example.com" />
  )
}

export const EmailForm: FC<EmailFormProps> = ({ submitButtonText }) => {
  const setFormState = useSetAtom(formStateAtom)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setFormState("loading");
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <EmailFormInput />
      <FlexRowGroup className="items-stretch">
        <LayoutGroup>
          <EmailFormBackButton />
          <EmailFormSubmitButton>{submitButtonText}</EmailFormSubmitButton>
        </LayoutGroup>
      </FlexRowGroup>
    </form>
  )
}
