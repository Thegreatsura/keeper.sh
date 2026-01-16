"use client"

import type { FC, FormEvent } from "react"
import { LayoutGroup, motion } from "motion/react";
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { Button, LinkButton } from "@/components/button"
import { Input } from "@/components/input"
import { FlexRowGroup } from "@/components/flex-row-group"

type EmailFormProps = {
  loading: boolean
  onSubmit: (event: FormEvent) => void
}

export const EmailForm: FC<EmailFormProps> = ({ loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="contents">
      <Input type="email" placeholder="johndoe+keeper@example.com" />
      <FlexRowGroup className="items-stretch">
        <LayoutGroup>
          <AnimatePresence>
            {!loading && (
              <motion.div transition={{ width: { duration: 0.24 }, opacity: { duration: 0.12 } }} exit={{ width: 0, opacity: 0, filter: 'blur(0.125rem)' }}>
                <LinkButton href="/playground" className="h-full px-3.5 mr-2" variant="border">
                  <ArrowLeft size={17} />
                </LinkButton>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div className="grow">
            <Button disabled={loading} type="submit" className="relative w-full" variant="primary" size="normal">
              <motion.span className="origin-top" transition={{ duration: 0.16 }} animate={{ opacity: loading ? 0 : 1, filter: loading ? 'blur(0.125rem)' : 'none', y: loading ? -2 : 0, scale: loading ? 0.75 : 1 }}>
                Sign in
              </motion.span>
              <motion.span transition={{ delay: 0.08, duration: 0.16 }} className="absolute inset-0 m-auto size-fit origin-bottom" initial={{ opacity: 0 }} animate={{ opacity: loading ? 1 : 0, filter: loading ? 'none' : 'blur(0.125rem)', y: loading ? 0 : 2, scale: loading ? 1 : 0.75 }}>
                <LoaderCircle className="animate-spin" size={17} />
              </motion.span>
            </Button>
          </motion.div>
        </LayoutGroup>
      </FlexRowGroup>
    </form>
  )
}
