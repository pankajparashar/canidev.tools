import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Can I DevTools'
export const size = {
	width: 1200,
	height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }) {
	return new ImageResponse(
		<div
			style={{
  			fontSize: 48,
  			background: 'white',
  			width: '100%',
  			height: '100%',
  			display: 'flex',
  			alignItems: 'center',
  			justifyContent: 'center',
			}}
		>
			{params.slug}
		</div>, {
		...size,
		}
	)
}