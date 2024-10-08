"use client"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function TopLoadingBar({ children }) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        // color="#f8c617"
        color="#FF0000"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}