import { Suspense } from "react"
import dynamic from "next/dynamic"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import LayoutMain from "@/layouts/Main"

import type { NextPageWithLayout } from "@/pages/_app"
import type { GetStaticProps } from "next"

const ViewLogin = dynamic(() => import("@/views/components/Login"), {
  suspense: true,
  ssr: false,
})

const Login: NextPageWithLayout = () => {
  return (
    <Suspense fallback="...">
      <ViewLogin />
    </Suspense>
  )
}

Login.getLayout = page => {
  return (
      <div>
        {page}
      </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "")),
    },
  }
}

export default Login
