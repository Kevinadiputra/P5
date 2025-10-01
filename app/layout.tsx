import React from 'react'
import './styles/globals.css'

export const metadata = {
    title: 'UNSRI Student Portal',
    description: 'Portal informasi mahasiswa UNSRI',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}