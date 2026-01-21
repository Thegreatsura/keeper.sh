import type { FC } from "react"
import { FlexColumnGroup } from "@/components/flex-column-group"
import { Heading1 } from "@/components/heading"
import { Copy } from "@/components/copy"
import { AuthFormSignUp } from "@/compositions/auth-form/auth-form-sign-up"

const RegisterPage: FC = () => {
  return (
    <main className="flex size-full items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <FlexColumnGroup className="gap-2">
          <FlexColumnGroup className="py-2 items-center text-center">
            <Heading1>Create your account</Heading1>
            <Copy>Get started, and sync your calendars within minutes</Copy>
          </FlexColumnGroup>
          <AuthFormSignUp />
        </FlexColumnGroup>
      </div>
    </main>
  )
}

export default RegisterPage;
