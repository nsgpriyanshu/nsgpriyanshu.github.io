import React from 'react'

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mt-8 flex w-11/12 flex-col items-center justify-center pb-16 lg:mx-auto lg:max-w-screen-md lg:items-start">
      {children}
    </section>
  )
}

export default SectionContainer
