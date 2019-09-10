import React from 'react'
import Head from 'next/head'

const HtmlHead = ({ title = 'DnD Generator' }) => (
  <Head>
    <title>{title}</title>
    <link
      href="https://fonts.googleapis.com/css?family=Muli:200,200i,300,300i,400,400i&display=swap"
      rel="stylesheet"
    />
  </Head>
)

export default HtmlHead
